<template>
  <div>
    <h2 id="page-heading" data-cy="BankAccountHeading">
      <span id="bank-account-my-suffix">{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.title') }}</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info me-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.refreshListLabel') }}</span>
        </button>
        <router-link :to="{ name: 'BankAccountMySuffixCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-bank-account-my-suffix"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.createLabel') }}</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && bankAccounts?.length === 0">
      <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.notFound') }}</span>
    </div>
    <div class="table-responsive" v-if="bankAccounts?.length > 0">
      <table class="table table-striped" aria-describedby="bankAccounts">
        <thead>
          <tr>
            <th scope="col">
              <span>{{ t$('global.field.id') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.name') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.bankNumber') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.agencyNumber') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDuration') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.meanOperationDuration') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.balance') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.openingDay') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDate') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.active') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.accountType') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.attachment') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.description') }}</span>
            </th>
            <th scope="col">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.user') }}</span>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bankAccount in bankAccounts" :key="bankAccount.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'BankAccountMySuffixView', params: { bankAccountId: bankAccount.id } }">{{
                bankAccount.id
              }}</router-link>
            </td>
            <td>{{ bankAccount.name }}</td>
            <td>{{ bankAccount.bankNumber }}</td>
            <td>{{ bankAccount.agencyNumber }}</td>
            <td>{{ bankAccount.lastOperationDuration }}</td>
            <td>{{ bankAccount.meanOperationDuration }}</td>
            <td>{{ bankAccount.balance }}</td>
            <td>{{ bankAccount.openingDay }}</td>
            <td>{{ formatDateShort(bankAccount.lastOperationDate) || '' }}</td>
            <td>{{ bankAccount.active }}</td>
            <td>{{ t$('jhipsterSampleApplicationVueApp.BankAccountType.' + bankAccount.accountType) }}</td>
            <td>
              <a v-if="bankAccount.attachment" @click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)">{{
                t$('entity.action.open')
              }}</a>
              <span v-if="bankAccount.attachment">{{ bankAccount.attachmentContentType }}, {{ byteSize(bankAccount.attachment) }}</span>
            </td>
            <td>{{ bankAccount.description }}</td>
            <td>
              {{ bankAccount.user ? bankAccount.user.login : '' }}
            </td>
            <td class="text-end">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'BankAccountMySuffixView', params: { bankAccountId: bankAccount.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">{{ t$('entity.action.view') }}</span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'BankAccountMySuffixEdit', params: { bankAccountId: bankAccount.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">{{ t$('entity.action.edit') }}</span>
                  </button>
                </router-link>
                <b-button @click="prepareRemove(bankAccount)" variant="danger" class="btn btn-sm" data-cy="entityDeleteButton">
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">{{ t$('entity.action.delete') }}</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #title>
        <span id="jhipsterSampleApplicationVueApp.testRootBankAccount.delete.question" data-cy="bankAccountDeleteDialogHeading">{{
          t$('entity.delete.title')
        }}</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-bankAccount-heading">
          {{ t$('jhipsterSampleApplicationVueApp.testRootBankAccount.delete.question', { id: removeId }) }}
        </p>
      </div>
      <template #footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">{{ t$('entity.action.cancel') }}</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-bankAccount"
            data-cy="entityConfirmDeleteButton"
            @click="removeBankAccountMySuffix"
          >
            {{ t$('entity.action.delete') }}
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./bank-account-my-suffix.component.ts"></script>

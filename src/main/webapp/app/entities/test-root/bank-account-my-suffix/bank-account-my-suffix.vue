<template>
  <div>
    <h2 id="page-heading" data-cy="BankAccountHeading">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.title')" id="bank-account-my-suffix-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'BankAccountMySuffixCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-bank-account-my-suffix"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && bankAccounts && bankAccounts.length === 0">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="bankAccounts && bankAccounts.length > 0">
      <table class="table table-striped" aria-describedby="bankAccounts">
        <thead>
          <tr>
            <th scope="row"><span v-text="t$('global.field.id')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.name')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.bankNumber')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.agencyNumber')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDuration')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.meanOperationDuration')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.balance')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.openingDay')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDate')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.active')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.accountType')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.attachment')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.description')"></span></th>
            <th scope="row"><span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.user')"></span></th>
            <th scope="row"></th>
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
            <td v-text="t$('jhipsterSampleApplicationVueApp.BankAccountType.' + bankAccount.accountType)"></td>
            <td>
              <a
                v-if="bankAccount.attachment"
                v-on:click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)"
                v-text="t$('entity.action.open')"
              ></a>
              <span v-if="bankAccount.attachment">{{ bankAccount.attachmentContentType }}, {{ byteSize(bankAccount.attachment) }}</span>
            </td>
            <td>{{ bankAccount.description }}</td>
            <td>
              {{ bankAccount.user ? bankAccount.user.login : '' }}
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link
                  :to="{ name: 'BankAccountMySuffixView', params: { bankAccountId: bankAccount.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link
                  :to="{ name: 'BankAccountMySuffixEdit', params: { bankAccountId: bankAccount.id } }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(bankAccount)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="jhipsterSampleApplicationVueApp.testRootBankAccount.delete.question"
          data-cy="bankAccountDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p
          id="jhi-delete-bankAccount-heading"
          v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.delete.question', { id: removeId })"
        ></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" v-on:click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-bankAccount"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            v-on:click="removeBankAccountMySuffix()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./bank-account-my-suffix.component.ts"></script>

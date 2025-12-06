<template>
  <div>
    <h2 id="page-heading" data-cy="OperationHeading">
      <span id="operation">{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.home.title') }}</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info me-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.home.refreshListLabel') }}</span>
        </button>
        <router-link :to="{ name: 'OperationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-operation"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.home.createLabel') }}</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && operations?.length === 0">
      <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.home.notFound') }}</span>
    </div>
    <div class="table-responsive" v-if="operations?.length > 0">
      <table class="table table-striped" aria-describedby="operations">
        <thead>
          <tr>
            <th scope="col" @click="changeOrder('id')">
              <span>{{ t$('global.field.id') }}</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="col" @click="changeOrder('date')">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.date') }}</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="col" @click="changeOrder('description')">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.description') }}</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="col" @click="changeOrder('amount')">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.amount') }}</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="col" @click="changeOrder('bankAccount.name')">
              <span>{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.bankAccount') }}</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bankAccount.name'"></jhi-sort-indicator>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="operation in operations" :key="operation.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'OperationView', params: { operationId: operation.id } }">{{ operation.id }}</router-link>
            </td>
            <td>{{ formatDateShort(operation.date) || '' }}</td>
            <td>{{ operation.description }}</td>
            <td>{{ operation.amount }}</td>
            <td>
              <div v-if="operation.bankAccount">
                <router-link :to="{ name: 'BankAccountMySuffixView', params: { bankAccountId: operation.bankAccount.id } }">{{
                  operation.bankAccount.name
                }}</router-link>
              </div>
            </td>
            <td class="text-end">
              <div class="btn-group">
                <router-link :to="{ name: 'OperationView', params: { operationId: operation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">{{ t$('entity.action.view') }}</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'OperationEdit', params: { operationId: operation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">{{ t$('entity.action.edit') }}</span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(operation)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">{{ t$('entity.action.delete') }}</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <span ref="infiniteScrollEl"></span>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #title>
        <span id="jhipsterSampleApplicationVueApp.testRootOperation.delete.question" data-cy="operationDeleteDialogHeading">{{
          t$('entity.delete.title')
        }}</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-operation-heading">
          {{ t$('jhipsterSampleApplicationVueApp.testRootOperation.delete.question', { id: removeId }) }}
        </p>
      </div>
      <template #footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">{{ t$('entity.action.cancel') }}</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-operation"
            data-cy="entityConfirmDeleteButton"
            @click="removeOperation"
          >
            {{ t$('entity.action.delete') }}
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./operation.component.ts"></script>

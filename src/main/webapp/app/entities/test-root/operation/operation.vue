<template>
  <div>
    <h2 id="page-heading" data-cy="OperationHeading">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.home.title')" id="operation-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'OperationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-operation"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && operations && operations.length === 0">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="operations && operations.length > 0">
      <table class="table table-striped" aria-describedby="operations">
        <thead>
          <tr>
            <th scope="row" @click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('date')">
              <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.date')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('description')">
              <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.description')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('amount')">
              <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.amount')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('bankAccount.name')">
              <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.bankAccount')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'bankAccount.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
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
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'OperationView', params: { operationId: operation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'OperationEdit', params: { operationId: operation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
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
                  <span class="d-none d-md-inline" v-text="t$('entity.action.delete')"></span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <span ref="infiniteScrollEl"></span>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span
          id="jhipsterSampleApplicationVueApp.testRootOperation.delete.question"
          data-cy="operationDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p
          id="jhi-delete-operation-heading"
          v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.delete.question', { id: removeId })"
        ></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" @click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-operation"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            @click="removeOperation()"
          ></button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./operation.component.ts"></script>

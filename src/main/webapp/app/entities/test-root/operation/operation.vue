<template>
  <div>
    <h2 id="page-heading" data-cy="OperationHeading">
      <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.home.title')" id="operation-heading">Operations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link
          :to="{ name: 'OperationCreate' }"
          tag="button"
          id="jh-create-entity"
          data-cy="entityCreateButton"
          class="btn btn-primary jh-create-entity create-operation"
        >
          <font-awesome-icon icon="plus"></font-awesome-icon>
          <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.home.createLabel')"> Create a new Operation </span>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && operations && operations.length === 0">
      <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.home.notFound')">No operations found</span>
    </div>
    <div class="table-responsive" v-if="operations && operations.length > 0">
      <table class="table table-striped" aria-describedby="operations">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('date')">
              <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.date')">Date</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'date'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('description')">
              <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.description')">Description</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'description'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('amount')">
              <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.amount')">Amount</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'amount'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('bankAccount.name')">
              <span v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.bankAccount')">Bank Account</span>
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
            <td>{{ operation.date ? $d(Date.parse(operation.date), 'short') : '' }}</td>
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
                <router-link
                  :to="{ name: 'OperationView', params: { operationId: operation.id } }"
                  tag="button"
                  class="btn btn-info btn-sm details"
                  data-cy="entityDetailsButton"
                >
                  <font-awesome-icon icon="eye"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                </router-link>
                <router-link
                  :to="{ name: 'OperationEdit', params: { operationId: operation.id } }"
                  tag="button"
                  class="btn btn-primary btn-sm edit"
                  data-cy="entityEditButton"
                >
                  <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(operation)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
        <infinite-loading
          ref="infiniteLoading"
          v-if="totalItems > itemsPerPage"
          :identifier="infiniteId"
          slot="append"
          @infinite="loadMore"
          force-use-infinite-wrapper=".el-table__body-wrapper"
          :distance="20"
        >
        </infinite-loading>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="jhipsterSampleApplicationVueApp.testRootOperation.delete.question"
          data-cy="operationDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p
          id="jhi-delete-operation-heading"
          v-text="$t('jhipsterSampleApplicationVueApp.testRootOperation.delete.question', { id: removeId })"
        >
          Are you sure you want to delete this Operation?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-operation"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeOperation()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./operation.component.ts"></script>

<template>
  <div>
    <h2 id="page-heading" data-cy="LabelHeading">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.home.title')" id="label-heading"></span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.home.refreshListLabel')"></span>
        </button>
        <router-link :to="{ name: 'LabelCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-label"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.home.createLabel')"></span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && labels && labels.length === 0">
      <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.home.notFound')"></span>
    </div>
    <div class="table-responsive" v-if="labels && labels.length > 0">
      <table class="table table-striped" aria-describedby="labels">
        <thead>
          <tr>
            <th scope="row" @click="changeOrder('id')">
              <span v-text="t$('global.field.id')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" @click="changeOrder('labelName')">
              <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.labelName')"></span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'labelName'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in labels" :key="label.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LabelView', params: { labelId: label.id } }">{{ label.id }}</router-link>
            </td>
            <td>{{ label.labelName }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'LabelView', params: { labelId: label.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.view')"></span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'LabelEdit', params: { labelId: label.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="t$('entity.action.edit')"></span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(label)"
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
          id="jhipsterSampleApplicationVueApp.testRootLabel.delete.question"
          data-cy="labelDeleteDialogHeading"
          v-text="t$('entity.delete.title')"
        ></span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-label-heading" v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.delete.question', { id: removeId })"></p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" v-text="t$('entity.action.cancel')" @click="closeDialog()"></button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-label"
            data-cy="entityConfirmDeleteButton"
            v-text="t$('entity.action.delete')"
            @click="removeLabel()"
          ></button>
        </div>
      </template>
    </b-modal>
    <div v-show="labels && labels.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./label.component.ts"></script>

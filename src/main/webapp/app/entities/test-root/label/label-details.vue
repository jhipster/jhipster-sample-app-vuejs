<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="label">
        <h2 class="jh-entity-heading" data-cy="labelDetailsHeading">
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.detail.title')"></span> {{ label.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.labelName')"></span>
          </dt>
          <dd>
            <span>{{ label.labelName }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.operation')"></span>
          </dt>
          <dd>
            <span v-for="(operation, i) in label.operations" :key="operation.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'OperationView', params: { operationId: operation.id } }">{{ operation.id }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link v-if="label.id" :to="{ name: 'LabelEdit', params: { labelId: label.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./label-details.component.ts"></script>

<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="operation">
        <h2 class="jh-entity-heading" data-cy="operationDetailsHeading">
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.detail.title')"></span> {{ operation.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.date')"></span>
          </dt>
          <dd>
            <span v-if="operation.date">{{ formatDateLong(operation.date) }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.description')"></span>
          </dt>
          <dd>
            <span>{{ operation.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.amount')"></span>
          </dt>
          <dd>
            <span>{{ operation.amount }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.bankAccount')"></span>
          </dt>
          <dd>
            <div v-if="operation.bankAccount">
              <router-link :to="{ name: 'BankAccountMySuffixView', params: { bankAccountId: operation.bankAccount.id } }">{{
                operation.bankAccount.name
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootOperation.label')"></span>
          </dt>
          <dd>
            <span v-for="(label, i) in operation.labels" :key="label.id"
              >{{ i > 0 ? ', ' : '' }}
              <router-link :to="{ name: 'LabelView', params: { labelId: label.id } }">{{ label.labelName }}</router-link>
            </span>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="operation.id"
          :to="{ name: 'OperationEdit', params: { operationId: operation.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.edit')"></span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./operation-details.component.ts"></script>

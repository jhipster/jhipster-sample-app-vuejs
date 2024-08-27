<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bankAccount">
        <h2 class="jh-entity-heading" data-cy="bankAccountDetailsHeading">
          <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.detail.title')"></span> {{ bankAccount.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.name')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.name }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.bankNumber')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.bankNumber }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.agencyNumber')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.agencyNumber }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDuration')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.lastOperationDuration }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.meanOperationDuration')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.meanOperationDuration }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.balance')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.balance }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.openingDay')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.openingDay }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDate')"></span>
          </dt>
          <dd>
            <span v-if="bankAccount.lastOperationDate">{{ formatDateLong(bankAccount.lastOperationDate) }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.active')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.active }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.accountType')"></span>
          </dt>
          <dd>
            <span v-text="t$('jhipsterSampleApplicationVueApp.BankAccountType.' + bankAccount.accountType)"></span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.attachment')"></span>
          </dt>
          <dd>
            <div v-if="bankAccount.attachment">
              <a @click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)" v-text="t$('entity.action.open')"></a>
              {{ bankAccount.attachmentContentType }}, {{ byteSize(bankAccount.attachment) }}
            </div>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.description')"></span>
          </dt>
          <dd>
            <span>{{ bankAccount.description }}</span>
          </dd>
          <dt>
            <span v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.user')"></span>
          </dt>
          <dd>
            {{ bankAccount.user ? bankAccount.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.back')"></span>
        </button>
        <router-link
          v-if="bankAccount.id"
          :to="{ name: 'BankAccountMySuffixEdit', params: { bankAccountId: bankAccount.id } }"
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

<script lang="ts" src="./bank-account-my-suffix-details.component.ts"></script>

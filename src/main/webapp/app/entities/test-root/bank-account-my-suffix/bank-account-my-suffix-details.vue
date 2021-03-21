<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="bankAccount">
        <h2 class="jh-entity-heading" data-cy="bankAccountDetailsHeading">
          <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.detail.title')">BankAccountMySuffix</span>
          {{ bankAccount.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.name')">Name</span>
          </dt>
          <dd>
            <span>{{ bankAccount.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.bankNumber')">Bank Number</span>
          </dt>
          <dd>
            <span>{{ bankAccount.bankNumber }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.agencyNumber')">Agency Number</span>
          </dt>
          <dd>
            <span>{{ bankAccount.agencyNumber }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDuration')">Last Operation Duration</span>
          </dt>
          <dd>
            <span>{{ bankAccount.lastOperationDuration }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.meanOperationDuration')">Mean Operation Duration</span>
          </dt>
          <dd>
            <span>{{ bankAccount.meanOperationDuration }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.balance')">Balance</span>
          </dt>
          <dd>
            <span>{{ bankAccount.balance }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.openingDay')">Opening Day</span>
          </dt>
          <dd>
            <span>{{ bankAccount.openingDay }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDate')">Last Operation Date</span>
          </dt>
          <dd>
            <span v-if="bankAccount.lastOperationDate">{{ $d(Date.parse(bankAccount.lastOperationDate), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.active')">Active</span>
          </dt>
          <dd>
            <span>{{ bankAccount.active }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.accountType')">Account Type</span>
          </dt>
          <dd>
            <span v-text="$t('jhipsterSampleApplicationVueApp.BankAccountType.' + bankAccount.accountType)">{{
              bankAccount.accountType
            }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.attachment')">Attachment</span>
          </dt>
          <dd>
            <div v-if="bankAccount.attachment">
              <a v-on:click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)" v-text="$t('entity.action.open')">open</a>
              {{ bankAccount.attachmentContentType }}, {{ byteSize(bankAccount.attachment) }}
            </div>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.description')">Description</span>
          </dt>
          <dd>
            <span>{{ bankAccount.description }}</span>
          </dd>
          <dt>
            <span v-text="$t('jhipsterSampleApplicationVueApp.testRootBankAccount.user')">User</span>
          </dt>
          <dd>
            {{ bankAccount.user ? bankAccount.user.login : '' }}
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="bankAccount.id"
          :to="{ name: 'BankAccountMySuffixEdit', params: { bankAccountId: bankAccount.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./bank-account-my-suffix-details.component.ts"></script>

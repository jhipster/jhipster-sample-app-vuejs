<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jhipsterApp.testRootBankAccount.home.title')" id="bank-account-my-suffix-heading">Bank Accounts</span>
            <router-link :to="{name: 'BankAccountMySuffixCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-bank-account-my-suffix">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jhipsterApp.testRootBankAccount.home.createLabel')">
                    Create a new Bank Account
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && bankAccounts && bankAccounts.length === 0">
            <span v-text="$t('jhipsterApp.testRootBankAccount.home.notFound')">No bankAccounts found</span>
        </div>
        <div class="table-responsive" v-if="bankAccounts && bankAccounts.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.name')">Name</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.bankNumber')">Bank Number</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.agencyNumber')">Agency Number</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.lastOperationDuration')">Last Operation Duration</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.meanOperationDuration')">Mean Operation Duration</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.balance')">Balance</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.openingDay')">Opening Day</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.lastOperationDate')">Last Operation Date</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.active')">Active</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.accountType')">Account Type</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.attachment')">Attachment</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.description')">Description</span></th>
                    <th><span v-text="$t('jhipsterApp.testRootBankAccount.user')">User</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bankAccount in bankAccounts"
                    :key="bankAccount.id">
                    <td>
                        <router-link :to="{name: 'BankAccountMySuffixView', params: {bankAccountId: bankAccount.id}}">{{bankAccount.id}}</router-link>
                    </td>
                    <td>{{bankAccount.name}}</td>
                    <td>{{bankAccount.bankNumber}}</td>
                    <td>{{bankAccount.agencyNumber}}</td>
                    <td>{{bankAccount.lastOperationDuration}}</td>
                    <td>{{bankAccount.meanOperationDuration}}</td>
                    <td>{{bankAccount.balance}}</td>
                    <td>{{bankAccount.openingDay}}</td>
                    <td>{{bankAccount.lastOperationDate ? $d(Date.parse(bankAccount.lastOperationDate), 'short') : ''}}</td>
                    <td>{{bankAccount.active}}</td>
                    <td v-text="$t('jhipsterApp.BankAccountType.' + bankAccount.accountType)">{{bankAccount.accountType}}</td>
                    <td>
                        <a v-if="bankAccount.attachment" v-on:click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)" v-text="$t('entity.action.open')">open</a>
                        <span v-if="bankAccount.attachment">{{bankAccount.attachmentContentType}}, {{byteSize(bankAccount.attachment)}}</span>
                    </td>
                    <td>{{bankAccount.description}}</td>
                    <td>
                        {{bankAccount.userLogin}}
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'BankAccountMySuffixView', params: {bankAccountId: bankAccount.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'BankAccountMySuffixEdit', params: {bankAccountId: bankAccount.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(bankAccount)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jhipsterApp.testRootBankAccount.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-bankAccount-heading" v-text="$t('jhipsterApp.testRootBankAccount.delete.question', {'id': removeId})">Are you sure you want to delete this Bank Account?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-bankAccount" v-text="$t('entity.action.delete')" v-on:click="removeBankAccountMySuffix()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./bank-account-my-suffix.component.ts">
</script>

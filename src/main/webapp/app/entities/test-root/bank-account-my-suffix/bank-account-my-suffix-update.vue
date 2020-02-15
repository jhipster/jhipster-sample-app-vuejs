<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.testRootBankAccount.home.createOrEditLabel" v-text="$t('jhipsterApp.testRootBankAccount.home.createOrEditLabel')">Create or edit a BankAccountMySuffix</h2>
                <div>
                    <div class="form-group" v-if="bankAccount.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="bankAccount.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.name')" for="bank-account-my-suffix-name">Name</label>
                        <input type="text" class="form-control" name="name" id="bank-account-my-suffix-name"
                            :class="{'valid': !$v.bankAccount.name.$invalid, 'invalid': $v.bankAccount.name.$invalid }" v-model="$v.bankAccount.name.$model"  required/>
                        <div v-if="$v.bankAccount.name.$anyDirty && $v.bankAccount.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.bankAccount.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.bankNumber')" for="bank-account-my-suffix-bankNumber">Bank Number</label>
                        <input type="number" class="form-control" name="bankNumber" id="bank-account-my-suffix-bankNumber"
                            :class="{'valid': !$v.bankAccount.bankNumber.$invalid, 'invalid': $v.bankAccount.bankNumber.$invalid }" v-model.number="$v.bankAccount.bankNumber.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.agencyNumber')" for="bank-account-my-suffix-agencyNumber">Agency Number</label>
                        <input type="number" class="form-control" name="agencyNumber" id="bank-account-my-suffix-agencyNumber"
                            :class="{'valid': !$v.bankAccount.agencyNumber.$invalid, 'invalid': $v.bankAccount.agencyNumber.$invalid }" v-model.number="$v.bankAccount.agencyNumber.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.lastOperationDuration')" for="bank-account-my-suffix-lastOperationDuration">Last Operation Duration</label>
                        <input type="number" class="form-control" name="lastOperationDuration" id="bank-account-my-suffix-lastOperationDuration"
                            :class="{'valid': !$v.bankAccount.lastOperationDuration.$invalid, 'invalid': $v.bankAccount.lastOperationDuration.$invalid }" v-model.number="$v.bankAccount.lastOperationDuration.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.meanOperationDuration')" for="bank-account-my-suffix-meanOperationDuration">Mean Operation Duration</label>
                        <input type="number" class="form-control" name="meanOperationDuration" id="bank-account-my-suffix-meanOperationDuration"
                            :class="{'valid': !$v.bankAccount.meanOperationDuration.$invalid, 'invalid': $v.bankAccount.meanOperationDuration.$invalid }" v-model.number="$v.bankAccount.meanOperationDuration.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.balance')" for="bank-account-my-suffix-balance">Balance</label>
                        <input type="number" class="form-control" name="balance" id="bank-account-my-suffix-balance"
                            :class="{'valid': !$v.bankAccount.balance.$invalid, 'invalid': $v.bankAccount.balance.$invalid }" v-model.number="$v.bankAccount.balance.$model"  required/>
                        <div v-if="$v.bankAccount.balance.$anyDirty && $v.bankAccount.balance.$invalid">
                            <small class="form-text text-danger" v-if="!$v.bankAccount.balance.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.bankAccount.balance.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.openingDay')" for="bank-account-my-suffix-openingDay">Opening Day</label>
                        <div class="input-group">
                            <input id="bank-account-my-suffix-openingDay" type="date" class="form-control" name="openingDay"  :class="{'valid': !$v.bankAccount.openingDay.$invalid, 'invalid': $v.bankAccount.openingDay.$invalid }"
                            v-model="$v.bankAccount.openingDay.$model"  />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.lastOperationDate')" for="bank-account-my-suffix-lastOperationDate">Last Operation Date</label>
                        <div class="d-flex">
                            <input id="bank-account-my-suffix-lastOperationDate" type="datetime-local" class="form-control" name="lastOperationDate" :class="{'valid': !$v.bankAccount.lastOperationDate.$invalid, 'invalid': $v.bankAccount.lastOperationDate.$invalid }"
                            
                            :value="convertDateTimeFromServer($v.bankAccount.lastOperationDate.$model)"
                            @change="updateInstantField('lastOperationDate', $event)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.active')" for="bank-account-my-suffix-active">Active</label>
                        <input type="checkbox" class="form-check" name="active" id="bank-account-my-suffix-active"
                            :class="{'valid': !$v.bankAccount.active.$invalid, 'invalid': $v.bankAccount.active.$invalid }" v-model="$v.bankAccount.active.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.accountType')" for="bank-account-my-suffix-accountType">Account Type</label>
                        <select class="form-control" name="accountType" :class="{'valid': !$v.bankAccount.accountType.$invalid, 'invalid': $v.bankAccount.accountType.$invalid }" v-model="$v.bankAccount.accountType.$model" id="bank-account-my-suffix-accountType" >
                            <option value="CHECKING" v-bind:label="$t('jhipsterApp.BankAccountType.CHECKING')">CHECKING</option>
                            <option value="SAVINGS" v-bind:label="$t('jhipsterApp.BankAccountType.SAVINGS')">SAVINGS</option>
                            <option value="LOAN" v-bind:label="$t('jhipsterApp.BankAccountType.LOAN')">LOAN</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.attachment')" for="bank-account-my-suffix-attachment">Attachment</label>
                        <div>
                            <div v-if="bankAccount.attachment" class="form-text text-danger clearfix">
                                <a class="pull-left" v-on:click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)" v-text="$t('entity.action.open')">open</a><br>
                                <span class="pull-left">{{bankAccount.attachmentContentType}}, {{byteSize(bankAccount.attachment)}}</span>
                                <button type="button" v-on:click="bankAccount.attachment=null;bankAccount.attachmentContentType=null;"
                                        class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_attachment" id="file_attachment" v-on:change="setFileData($event, bankAccount, 'attachment', false)" v-text="$t('entity.action.addblob')"/>
                        </div>
                        <input type="hidden" class="form-control" name="attachment" id="bank-account-my-suffix-attachment"
                            :class="{'valid': !$v.bankAccount.attachment.$invalid, 'invalid': $v.bankAccount.attachment.$invalid }" v-model="$v.bankAccount.attachment.$model" />
                        <input type="hidden" class="form-control" name="attachmentContentType" id="bank-account-my-suffix-attachmentContentType"
                            v-model="bankAccount.attachmentContentType" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.description')" for="bank-account-my-suffix-description">Description</label>
                        <textarea class="form-control" name="description" id="bank-account-my-suffix-description"
                            :class="{'valid': !$v.bankAccount.description.$invalid, 'invalid': $v.bankAccount.description.$invalid }" v-model="$v.bankAccount.description.$model" ></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootBankAccount.user')" for="bank-account-my-suffix-user">User</label>
                        <select class="form-control" id="bank-account-my-suffix-user" name="user" v-model="bankAccount.userId">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="userOption.id" v-for="userOption in users" :key="userOption.id">{{userOption.login}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.bankAccount.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./bank-account-my-suffix-update.component.ts">
</script>

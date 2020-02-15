<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhipsterApp.testRootOperation.home.createOrEditLabel" v-text="$t('jhipsterApp.testRootOperation.home.createOrEditLabel')">Create or edit a Operation</h2>
                <div>
                    <div class="form-group" v-if="operation.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="operation.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootOperation.date')" for="operation-date">Date</label>
                        <div class="d-flex">
                            <input id="operation-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.operation.date.$invalid, 'invalid': $v.operation.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.operation.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.operation.date.$anyDirty && $v.operation.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.operation.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.operation.date.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootOperation.description')" for="operation-description">Description</label>
                        <input type="text" class="form-control" name="description" id="operation-description"
                            :class="{'valid': !$v.operation.description.$invalid, 'invalid': $v.operation.description.$invalid }" v-model="$v.operation.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootOperation.amount')" for="operation-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="operation-amount"
                            :class="{'valid': !$v.operation.amount.$invalid, 'invalid': $v.operation.amount.$invalid }" v-model.number="$v.operation.amount.$model"  required/>
                        <div v-if="$v.operation.amount.$anyDirty && $v.operation.amount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.operation.amount.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.operation.amount.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jhipsterApp.testRootOperation.bankAccount')" for="operation-bankAccount">Bank Account</label>
                        <select class="form-control" id="operation-bankAccount" name="bankAccount" v-model="operation.bankAccount">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="operation.bankAccount && bankAccountOption.id === operation.bankAccount.id ? operation.bankAccount : bankAccountOption" v-for="bankAccountOption in bankAccounts" :key="bankAccountOption.id">{{bankAccountOption.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label v-text="$t('jhipsterApp.testRootOperation.label')" for="operation-label">Label</label>
                        <select class="form-control" id="operation-label" multiple name="label" v-model="operation.labels">
                            <option v-bind:value="getSelected(operation.labels, labelOption)" v-for="labelOption in labels" :key="labelOption.id">{{labelOption.labelName}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.operation.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./operation-update.component.ts">
</script>

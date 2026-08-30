<template>
  <div class="d-flex justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="jhipsterSampleApplicationVueApp.testRootOperation.home.createOrEditLabel" data-cy="OperationCreateUpdateHeading">
          {{ t$('jhipsterSampleApplicationVueApp.testRootOperation.home.createOrEditLabel') }}
        </h2>
        <div>
          <div class="mb-3" v-if="operation.id">
            <label for="id">{{ t$('global.field.id') }}</label>
            <input type="text" class="form-control" id="id" name="id" v-model="operation.id" readonly />
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="operation-date">{{
              t$('jhipsterSampleApplicationVueApp.testRootOperation.date')
            }}</label>
            <div class="d-flex">
              <input
                id="operation-date"
                data-cy="date"
                type="datetime-local"
                class="form-control"
                name="date"
                :class="{ valid: !v$.date.$invalid, invalid: v$.date.$invalid }"
                required
                :value="convertDateTimeFromServer(v$.date.$model)"
                @change="updateInstantField('date', $event)"
              />
            </div>
            <div v-if="v$.date.$anyDirty && v$.date.$invalid">
              <small class="form-text text-danger" v-for="error of v$.date.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="operation-description">{{
              t$('jhipsterSampleApplicationVueApp.testRootOperation.description')
            }}</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="operation-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="operation-amount">{{
              t$('jhipsterSampleApplicationVueApp.testRootOperation.amount')
            }}</label>
            <input
              type="number"
              class="form-control"
              name="amount"
              id="operation-amount"
              data-cy="amount"
              :class="{ valid: !v$.amount.$invalid, invalid: v$.amount.$invalid }"
              v-model.number="v$.amount.$model"
              required
            />
            <div v-if="v$.amount.$anyDirty && v$.amount.$invalid">
              <small class="form-text text-danger" v-for="error of v$.amount.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-control-label" for="operation">{{
              t$('jhipsterSampleApplicationVueApp.testRootOperation.bankAccount')
            }}</label>
            <select
              class="form-control"
              id="operation-bankAccount"
              data-cy="bankAccount"
              name="bankAccount"
              v-model="operation.bankAccount"
            >
              <option :value="null"></option>
              <option
                :value="
                  operation.bankAccount && bankAccountOption.id === operation.bankAccount.id ? operation.bankAccount : bankAccountOption
                "
                v-for="bankAccountOption in bankAccounts"
                :key="bankAccountOption.id"
              >
                {{ bankAccountOption.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="operation">{{ t$('jhipsterSampleApplicationVueApp.testRootOperation.label') }}</label>
            <select
              class="form-control"
              id="operation-labels"
              data-cy="label"
              multiple
              name="label"
              v-if="operation.labels !== undefined"
              v-model="operation.labels"
            >
              <option :value="getSelected(operation.labels, labelOption, 'id')" v-for="labelOption in labels" :key="labelOption.id">
                {{ labelOption.labelName }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>{{ t$('entity.action.cancel') }}</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>{{ t$('entity.action.save') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./operation-update.component.ts"></script>

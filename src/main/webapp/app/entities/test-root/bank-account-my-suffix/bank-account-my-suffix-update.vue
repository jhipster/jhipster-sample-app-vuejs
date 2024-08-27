<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationVueApp.testRootBankAccount.home.createOrEditLabel"
          data-cy="BankAccountCreateUpdateHeading"
          v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="bankAccount.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="bankAccount.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.name')"
              for="bank-account-my-suffix-name"
            ></label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="bank-account-my-suffix-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
              required
            />
            <div v-if="v$.name.$anyDirty && v$.name.$invalid">
              <small class="form-text text-danger" v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.bankNumber')"
              for="bank-account-my-suffix-bankNumber"
            ></label>
            <input
              type="number"
              class="form-control"
              name="bankNumber"
              id="bank-account-my-suffix-bankNumber"
              data-cy="bankNumber"
              :class="{ valid: !v$.bankNumber.$invalid, invalid: v$.bankNumber.$invalid }"
              v-model.number="v$.bankNumber.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.agencyNumber')"
              for="bank-account-my-suffix-agencyNumber"
            ></label>
            <input
              type="number"
              class="form-control"
              name="agencyNumber"
              id="bank-account-my-suffix-agencyNumber"
              data-cy="agencyNumber"
              :class="{ valid: !v$.agencyNumber.$invalid, invalid: v$.agencyNumber.$invalid }"
              v-model.number="v$.agencyNumber.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDuration')"
              for="bank-account-my-suffix-lastOperationDuration"
            ></label>
            <input
              type="number"
              class="form-control"
              name="lastOperationDuration"
              id="bank-account-my-suffix-lastOperationDuration"
              data-cy="lastOperationDuration"
              :class="{ valid: !v$.lastOperationDuration.$invalid, invalid: v$.lastOperationDuration.$invalid }"
              v-model.number="v$.lastOperationDuration.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.meanOperationDuration')"
              for="bank-account-my-suffix-meanOperationDuration"
            ></label>
            <input
              type="number"
              class="form-control"
              name="meanOperationDuration"
              id="bank-account-my-suffix-meanOperationDuration"
              data-cy="meanOperationDuration"
              :class="{ valid: !v$.meanOperationDuration.$invalid, invalid: v$.meanOperationDuration.$invalid }"
              v-model.number="v$.meanOperationDuration.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.balance')"
              for="bank-account-my-suffix-balance"
            ></label>
            <input
              type="number"
              class="form-control"
              name="balance"
              id="bank-account-my-suffix-balance"
              data-cy="balance"
              :class="{ valid: !v$.balance.$invalid, invalid: v$.balance.$invalid }"
              v-model.number="v$.balance.$model"
              required
            />
            <div v-if="v$.balance.$anyDirty && v$.balance.$invalid">
              <small class="form-text text-danger" v-for="error of v$.balance.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.openingDay')"
              for="bank-account-my-suffix-openingDay"
            ></label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="bank-account-my-suffix-openingDay"
                  v-model="v$.openingDay.$model"
                  name="openingDay"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="bank-account-my-suffix-openingDay"
                data-cy="openingDay"
                type="text"
                class="form-control"
                name="openingDay"
                :class="{ valid: !v$.openingDay.$invalid, invalid: v$.openingDay.$invalid }"
                v-model="v$.openingDay.$model"
              />
            </b-input-group>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.lastOperationDate')"
              for="bank-account-my-suffix-lastOperationDate"
            ></label>
            <div class="d-flex">
              <input
                id="bank-account-my-suffix-lastOperationDate"
                data-cy="lastOperationDate"
                type="datetime-local"
                class="form-control"
                name="lastOperationDate"
                :class="{ valid: !v$.lastOperationDate.$invalid, invalid: v$.lastOperationDate.$invalid }"
                :value="convertDateTimeFromServer(v$.lastOperationDate.$model)"
                @change="updateInstantField('lastOperationDate', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.active')"
              for="bank-account-my-suffix-active"
            ></label>
            <input
              type="checkbox"
              class="form-check"
              name="active"
              id="bank-account-my-suffix-active"
              data-cy="active"
              :class="{ valid: !v$.active.$invalid, invalid: v$.active.$invalid }"
              v-model="v$.active.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.accountType')"
              for="bank-account-my-suffix-accountType"
            ></label>
            <select
              class="form-control"
              name="accountType"
              :class="{ valid: !v$.accountType.$invalid, invalid: v$.accountType.$invalid }"
              v-model="v$.accountType.$model"
              id="bank-account-my-suffix-accountType"
              data-cy="accountType"
            >
              <option
                v-for="bankAccountType in bankAccountTypeValues"
                :key="bankAccountType"
                :value="bankAccountType"
                :label="t$('jhipsterSampleApplicationVueApp.BankAccountType.' + bankAccountType)"
              >
                {{ bankAccountType }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.attachment')"
              for="bank-account-my-suffix-attachment"
            ></label>
            <div>
              <div v-if="bankAccount.attachment" class="form-text text-danger clearfix">
                <a
                  class="pull-left"
                  @click="openFile(bankAccount.attachmentContentType, bankAccount.attachment)"
                  v-text="t$('entity.action.open')"
                ></a
                ><br />
                <span class="pull-left">{{ bankAccount.attachmentContentType }}, {{ byteSize(bankAccount.attachment) }}</span>
                <button
                  type="button"
                  @click="
                    bankAccount.attachment = null;
                    bankAccount.attachmentContentType = null;
                  "
                  class="btn btn-secondary btn-xs pull-right"
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
              </div>
              <label for="file_attachment" v-text="t$('entity.action.addblob')" class="btn btn-primary pull-right"></label>
              <input
                type="file"
                ref="file_attachment"
                id="file_attachment"
                style="display: none"
                data-cy="attachment"
                @change="setFileData($event, bankAccount, 'attachment', false)"
              />
            </div>
            <input
              type="hidden"
              class="form-control"
              name="attachment"
              id="bank-account-my-suffix-attachment"
              data-cy="attachment"
              :class="{ valid: !v$.attachment.$invalid, invalid: v$.attachment.$invalid }"
              v-model="v$.attachment.$model"
            />
            <input
              type="hidden"
              class="form-control"
              name="attachmentContentType"
              id="bank-account-my-suffix-attachmentContentType"
              v-model="bankAccount.attachmentContentType"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.description')"
              for="bank-account-my-suffix-description"
            ></label>
            <textarea
              class="form-control"
              name="description"
              id="bank-account-my-suffix-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            ></textarea>
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootBankAccount.user')"
              for="bank-account-my-suffix-user"
            ></label>
            <select class="form-control" id="bank-account-my-suffix-user" data-cy="user" name="user" v-model="bankAccount.user">
              <option :value="null"></option>
              <option
                :value="bankAccount.user && userOption.id === bankAccount.user.id ? bankAccount.user : userOption"
                v-for="userOption in users"
                :key="userOption.id"
              >
                {{ userOption.login }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.cancel')"></span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="t$('entity.action.save')"></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./bank-account-my-suffix-update.component.ts"></script>

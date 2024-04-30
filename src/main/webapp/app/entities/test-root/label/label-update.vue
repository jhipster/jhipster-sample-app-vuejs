<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate v-on:submit.prevent="save()">
        <h2
          id="jhipsterSampleApplicationVueApp.testRootLabel.home.createOrEditLabel"
          data-cy="LabelCreateUpdateHeading"
          v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.home.createOrEditLabel')"
        ></h2>
        <div>
          <div class="form-group" v-if="label.id">
            <label for="id" v-text="t$('global.field.id')"></label>
            <input type="text" class="form-control" id="id" name="id" v-model="label.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.labelName')"
              for="label-labelName"
            ></label>
            <input
              type="text"
              class="form-control"
              name="labelName"
              id="label-labelName"
              data-cy="labelName"
              :class="{ valid: !v$.labelName.$invalid, invalid: v$.labelName.$invalid }"
              v-model="v$.labelName.$model"
              required
            />
            <div v-if="v$.labelName.$anyDirty && v$.labelName.$invalid">
              <small class="form-text text-danger" v-for="error of v$.labelName.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label v-text="t$('jhipsterSampleApplicationVueApp.testRootLabel.operation')" for="label-operation"></label>
            <select
              class="form-control"
              id="label-operations"
              data-cy="operation"
              multiple
              name="operation"
              v-if="label.operations !== undefined"
              v-model="label.operations"
            >
              <option
                v-bind:value="getSelected(label.operations, operationOption, 'id')"
                v-for="operationOption in operations"
                :key="operationOption.id"
              >
                {{ operationOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
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
<script lang="ts" src="./label-update.component.ts"></script>

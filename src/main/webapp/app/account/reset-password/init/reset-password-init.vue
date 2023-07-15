<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 v-text="t$('reset.request.title')"></h1>

        <div class="alert alert-warning" v-if="!success">
          <p v-text="t$('reset.request.messages.info')"></p>
        </div>

        <div class="alert alert-success" v-if="success">
          <p v-text="t$('reset.request.messages.success')"></p>
        </div>

        <form v-if="!success" name="form" role="form" v-on:submit.prevent="requestReset()">
          <div class="form-group">
            <label class="form-control-label" for="email" v-text="t$('global.form[\'email.label\']')"></label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-bind:placeholder="t$('global.form[\'email.placeholder\']')"
              :class="{ valid: !v$.resetAccount.email.$invalid, invalid: v$.resetAccount.email.$invalid }"
              v-model="v$.resetAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              data-cy="emailResetPassword"
            />
            <div v-if="v$.resetAccount.email.$anyDirty && v$.resetAccount.email.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.resetAccount.email.required"
                v-text="t$('global.messages.validate.email.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.resetAccount.email.email"
                v-text="t$('global.messages.validate.email.invalid')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.resetAccount.email.minLength"
                v-text="t$('global.messages.validate.email.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.resetAccount.email.maxLength"
                v-text="t$('global.messages.validate.email.maxlength')"
              ></small>
            </div>
          </div>
          <button
            type="submit"
            :disabled="v$.resetAccount.$invalid"
            class="btn btn-primary"
            v-text="t$('reset.request.form.button')"
            data-cy="submit"
          ></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reset-password-init.component.ts"></script>

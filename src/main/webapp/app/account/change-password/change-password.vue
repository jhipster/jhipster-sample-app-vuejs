<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h2 v-if="username" id="password-title">
          <span v-html="t$('password.title', { username: username })"></span>
        </h2>

        <div class="alert alert-success" role="alert" v-if="success" v-html="t$('password.messages.success')"></div>
        <div class="alert alert-danger" role="alert" v-if="error" v-html="t$('password.messages.error')"></div>

        <div class="alert alert-danger" role="alert" v-if="doNotMatch" v-text="t$('global.messages.error.dontmatch')"></div>

        <form name="form" id="password-form" @submit.prevent="changePassword()">
          <div class="form-group">
            <label class="form-control-label" for="currentPassword" v-text="t$('global.form[\'currentpassword.label\']')"></label>
            <input
              type="password"
              class="form-control"
              id="currentPassword"
              name="currentPassword"
              :class="{ valid: !v$.resetPassword.currentPassword.$invalid, invalid: v$.resetPassword.currentPassword.$invalid }"
              :placeholder="t$('global.form[\'currentpassword.placeholder\']')"
              v-model="v$.resetPassword.currentPassword.$model"
              required
              data-cy="currentPassword"
            />
            <div v-if="v$.resetPassword.currentPassword.$anyDirty && v$.resetPassword.currentPassword.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.resetPassword.currentPassword.required"
                v-text="t$('global.messages.validate.newpassword.required')"
              ></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="newPassword" v-text="t$('global.form[\'newpassword.label\']')"></label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              name="newPassword"
              :placeholder="t$('global.form[\'newpassword.placeholder\']')"
              :class="{ valid: !v$.resetPassword.newPassword.$invalid, invalid: v$.resetPassword.newPassword.$invalid }"
              v-model="v$.resetPassword.newPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="newPassword"
            />
            <div v-if="v$.resetPassword.newPassword.$anyDirty && v$.resetPassword.newPassword.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.resetPassword.newPassword.required"
                v-text="t$('global.messages.validate.newpassword.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.resetPassword.newPassword.minLength"
                v-text="t$('global.messages.validate.newpassword.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.resetPassword.newPassword.maxLength"
                v-text="t$('global.messages.validate.newpassword.maxlength')"
              ></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="confirmPassword" v-text="t$('global.form[\'confirmpassword.label\']')"></label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              :class="{ valid: !v$.resetPassword.confirmPassword.$invalid, invalid: v$.resetPassword.confirmPassword.$invalid }"
              :placeholder="t$('global.form[\'confirmpassword.placeholder\']')"
              v-model="v$.resetPassword.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="confirmPassword"
            />
            <div v-if="v$.resetPassword.confirmPassword.$anyDirty && v$.resetPassword.confirmPassword.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.resetPassword.confirmPassword.sameAsPassword"
                v-text="t$('global.messages.error.dontmatch')"
              ></small>
            </div>
          </div>

          <button
            type="submit"
            :disabled="v$.resetPassword.$invalid"
            class="btn btn-primary"
            v-text="t$('password.form.button')"
            data-cy="submit"
          ></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./change-password.component.ts"></script>

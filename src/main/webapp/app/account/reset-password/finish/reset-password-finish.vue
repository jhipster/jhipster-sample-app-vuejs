<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 v-text="t$('reset.request.title')"></h1>

        <div class="alert alert-danger" v-html="t$('reset.finish.messages.keymissing')" v-if="keyMissing"></div>

        <div class="alert alert-danger" v-if="error">
          <p v-text="t$('reset.finish.messages.error')"></p>
        </div>

        <div class="alert alert-success" v-if="success">
          <span v-html="t$('reset.finish.messages.success')"></span>
          <a class="alert-link" @click="openLogin" v-text="t$('global.messages.info.authenticated.link')"></a>
        </div>
        <div class="alert alert-danger" v-if="doNotMatch">
          <p v-text="t$('global.messages.error.dontmatch')"></p>
        </div>

        <div class="alert alert-warning" v-if="!success && !keyMissing">
          <p v-text="t$('reset.finish.messages.info')"></p>
        </div>

        <div v-if="!keyMissing">
          <form v-if="!success" name="form" @submit.prevent="finishReset()">
            <div class="form-group">
              <label class="form-control-label" for="newPassword" v-text="t$('global.form[\'newpassword.label\']')"></label>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                name="newPassword"
                :placeholder="t$('global.form[\'newpassword.placeholder\']')"
                :class="{ valid: !v$.resetAccount.newPassword.$invalid, invalid: v$.resetAccount.newPassword.$invalid }"
                v-model="v$.resetAccount.newPassword.$model"
                minlength="4"
                maxlength="50"
                required
                data-cy="resetPassword"
              />
              <div v-if="v$.resetAccount.newPassword.$anyDirty && v$.resetAccount.newPassword.$invalid">
                <small
                  class="form-text text-danger"
                  v-if="!v$.resetAccount.newPassword.required"
                  v-text="t$('global.messages.validate.newpassword.required')"
                ></small>
                <small
                  class="form-text text-danger"
                  v-if="!v$.resetAccount.newPassword.minLength"
                  v-text="t$('global.messages.validate.newpassword.minlength')"
                ></small>
                <small
                  class="form-text text-danger"
                  v-if="!v$.resetAccount.newPassword.maxLength"
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
                :class="{ valid: !v$.resetAccount.confirmPassword.$invalid, invalid: v$.resetAccount.confirmPassword.$invalid }"
                :placeholder="t$('global.form[\'confirmpassword.placeholder\']')"
                v-model="v$.resetAccount.confirmPassword.$model"
                minlength="4"
                maxlength="50"
                required
                data-cy="confirmResetPassword"
              />
              <div v-if="v$.resetAccount.confirmPassword.$anyDirty && v$.resetAccount.confirmPassword.$invalid">
                <small
                  class="form-text text-danger"
                  v-if="!v$.resetAccount.confirmPassword.sameAsPassword"
                  v-text="t$('global.messages.error.dontmatch')"
                ></small>
              </div>
            </div>
            <button
              type="submit"
              :disabled="v$.resetAccount.$invalid"
              class="btn btn-primary"
              v-text="t$('password.form.button')"
              data-cy="submit"
            ></button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reset-password-finish.component.ts"></script>

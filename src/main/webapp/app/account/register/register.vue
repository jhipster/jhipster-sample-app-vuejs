<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 v-text="t$('register.title')" id="register-title" data-cy="registerTitle"></h1>

        <div class="alert alert-success" role="alert" v-if="success" v-html="t$('register.messages.success')"></div>

        <div class="alert alert-danger" role="alert" v-if="error" v-html="t$('register.messages.error.fail')"></div>

        <div class="alert alert-danger" role="alert" v-if="errorUserExists" v-html="t$('register.messages.error.userexists')"></div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists" v-html="t$('register.messages.error.emailexists')"></div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" role="form" v-on:submit.prevent="register()" v-if="!success" no-validate>
          <div class="form-group">
            <label class="form-control-label" for="username" v-text="t$('global.form[\'username.label\']')"></label>
            <input
              type="text"
              class="form-control"
              v-model="v$.registerAccount.login.$model"
              id="username"
              name="login"
              :class="{ valid: !v$.registerAccount.login.$invalid, invalid: v$.registerAccount.login.$invalid }"
              required
              minlength="1"
              maxlength="50"
              pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              v-bind:placeholder="t$('global.form[\'username.placeholder\']')"
              data-cy="username"
            />
            <div v-if="v$.registerAccount.login.$anyDirty && v$.registerAccount.login.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.login.required"
                v-text="t$('register.messages.validate.login.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.login.minLength"
                v-text="t$('register.messages.validate.login.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.login.maxLength"
                v-text="t$('register.messages.validate.login.maxlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.login.pattern"
                v-text="t$('register.messages.validate.login.pattern')"
              ></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email" v-text="t$('global.form[\'email.label\']')"></label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              :class="{ valid: !v$.registerAccount.email.$invalid, invalid: v$.registerAccount.email.$invalid }"
              v-model="v$.registerAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              v-bind:placeholder="t$('global.form[\'email.placeholder\']')"
              data-cy="email"
            />
            <div v-if="v$.registerAccount.email.$anyDirty && v$.registerAccount.email.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.email.required"
                v-text="t$('global.messages.validate.email.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.email.email"
                v-text="t$('global.messages.validate.email.invalid')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.email.minLength"
                v-text="t$('global.messages.validate.email.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.email.maxLength"
                v-text="t$('global.messages.validate.email.maxlength')"
              ></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstPassword" v-text="t$('global.form[\'newpassword.label\']')"></label>
            <input
              type="password"
              class="form-control"
              id="firstPassword"
              name="password"
              :class="{ valid: !v$.registerAccount.password.$invalid, invalid: v$.registerAccount.password.$invalid }"
              v-model="v$.registerAccount.password.$model"
              minlength="4"
              maxlength="50"
              required
              v-bind:placeholder="t$('global.form[\'newpassword.placeholder\']')"
              data-cy="firstPassword"
            />
            <div v-if="v$.registerAccount.password.$anyDirty && v$.registerAccount.password.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.password.required"
                v-text="t$('global.messages.validate.newpassword.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.password.minLength"
                v-text="t$('global.messages.validate.newpassword.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.registerAccount.password.maxLength"
                v-text="t$('global.messages.validate.newpassword.maxlength')"
              ></small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secondPassword" v-text="t$('global.form[\'confirmpassword.label\']')"></label>
            <input
              type="password"
              class="form-control"
              id="secondPassword"
              name="confirmPasswordInput"
              :class="{ valid: !v$.confirmPassword.$invalid, invalid: v$.confirmPassword.$invalid }"
              v-model="v$.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              v-bind:placeholder="t$('global.form[\'confirmpassword.placeholder\']')"
              data-cy="secondPassword"
            />
            <div v-if="v$.confirmPassword.$dirty && v$.confirmPassword.$invalid">
              <small
                class="form-text text-danger"
                v-if="!v$.confirmPassword.required"
                v-text="t$('global.messages.validate.confirmpassword.required')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.confirmPassword.minLength"
                v-text="t$('global.messages.validate.confirmpassword.minlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.confirmPassword.maxLength"
                v-text="t$('global.messages.validate.confirmpassword.maxlength')"
              ></small>
              <small
                class="form-text text-danger"
                v-if="!v$.confirmPassword.sameAsPassword"
                v-text="t$('global.messages.error.dontmatch')"
              ></small>
            </div>
          </div>

          <button
            type="submit"
            :disabled="v$.$invalid"
            class="btn btn-primary"
            v-text="t$('register.form.button')"
            data-cy="submit"
          ></button>
        </form>
        <p></p>
        <div class="alert alert-warning">
          <span v-text="t$('global.messages.info.authenticated.prefix')"></span>
          <a class="alert-link" v-on:click="openLogin()" v-text="t$('global.messages.info.authenticated.link')"></a
          ><span v-html="t$('global.messages.info.authenticated.suffix')"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>

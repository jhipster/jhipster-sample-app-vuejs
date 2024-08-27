<template>
  <div class="modal-body">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-alert
          show
          data-cy="loginError"
          variant="danger"
          v-if="authenticationError"
          v-html="t$('login.messages.error.authentication')"
        ></b-alert>
      </div>
      <div class="col-md-8">
        <b-form @submit.prevent="doLogin()">
          <b-form-group :label="t$('global.form[\'username.label\']')" label-for="username">
            <b-form-input
              id="username"
              type="text"
              name="username"
              autofocus
              :placeholder="t$('global.form[\'username.placeholder\']')"
              v-model="login"
              data-cy="username"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group :label="t$('login.form.password')" label-for="password">
            <b-form-input
              id="password"
              type="password"
              name="password"
              :placeholder="t$('login.form[\'password.placeholder\']')"
              v-model="password"
              data-cy="password"
            >
            </b-form-input>
          </b-form-group>
          <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" checked>
            <span v-text="t$('login.form.rememberme')"></span>
          </b-form-checkbox>
          <div>
            <b-button data-cy="submit" type="submit" variant="primary" v-text="t$('login.form.button')"></b-button>
          </div>
        </b-form>
        <p></p>
        <div>
          <b-alert show variant="warning">
            <b-link
              :to="'/account/reset/request'"
              class="alert-link"
              v-text="t$('login.password.forgot')"
              data-cy="forgetYourPasswordSelector"
            ></b-link>
          </b-alert>
        </div>
        <div>
          <b-alert show variant="warning">
            <span v-text="t$('global.messages.info.register.noaccount')"></span>
            <b-link :to="'/register'" class="alert-link" v-text="t$('global.messages.info.register.link')"></b-link>
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./login-form.component.ts"></script>

<template>
  <div class="d-flex justify-content-center">
    <div class="row-md">
      <div class="col-md-12">
        <b-alert
          data-cy="loginError"
          variant="danger"
          :model-value="authenticationError"
          v-html="t$('login.messages.error.authentication')"
        ></b-alert>
      </div>
      <div class="col-md-12">
        <b-form @submit.prevent="doLogin()">
          <b-form-group :label="t$('global.form[\'username.label\']')" label-for="username">
            <b-form-input
              id="username"
              type="text"
              name="username"
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
            <span>{{ t$('login.form.rememberme') }}</span>
          </b-form-checkbox>
          <div>
            <b-button data-cy="submit" type="submit" variant="primary">{{ t$('login.form.button') }}</b-button>
          </div>
        </b-form>
        <p></p>
        <div>
          <b-alert :model-value="true" variant="warning">
            <b-link :to="'/account/reset/request'" class="alert-link" data-cy="forgetYourPasswordSelector">{{
              t$('login.password.forgot')
            }}</b-link>
          </b-alert>
        </div>
        <div>
          <b-alert :model-value="true" variant="warning">
            <span>{{ t$('global.messages.info.register.noaccount') }}</span>
            <b-link :to="'/register'" class="alert-link">{{ t$('global.messages.info.register.link') }}</b-link>
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./login-form.component.ts"></script>

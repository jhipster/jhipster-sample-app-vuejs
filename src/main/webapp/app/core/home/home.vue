<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="hipster img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4">{{ t$('home.title') }}</h1>
      <p class="lead">{{ t$('home.subtitle') }}</p>

      <div>
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username">{{ t$('home.logged.message', { username }) }}</span>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span>{{ t$('global.messages.info.authenticated.prefix') }}</span>
          <a class="alert-link" @click="showLogin()">{{ t$('global.messages.info.authenticated.link') }}</a
          ><span v-html="t$('global.messages.info.authenticated.suffix')"></span>
        </div>
        <div class="alert alert-warning" v-if="!authenticated">
          <span>{{ t$('global.messages.info.register.noaccount') }}</span
          >&nbsp;
          <router-link class="alert-link" to="/register">{{ t$('global.messages.info.register.link') }}</router-link>
        </div>
      </div>

      <p>{{ t$('home.question') }}</p>

      <ul>
        <li>
          <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">{{ t$('home.link.homepage') }}</a>
        </li>
        <li>
          <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">{{
            t$('home.link.stackoverflow')
          }}</a>
        </li>
        <li>
          <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">{{
            t$('home.link.bugtracker')
          }}</a>
        </li>
        <li>
          <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">{{ t$('home.link.chat') }}</a>
        </li>
        <li>
          <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer">{{ t$('home.link.follow') }}</a>
        </li>
      </ul>

      <p>
        <span>{{ t$('home.like') }}</span>
        <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">{{ t$('home.github') }}</a
        >!
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>

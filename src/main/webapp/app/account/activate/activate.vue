<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 v-text="t$('activate.title')"></h1>
        <div class="alert alert-success" v-if="success">
          <span v-html="t$('activate.messages.success')"></span>
          <a class="alert-link" @click="openLogin" v-text="t$('global.messages.info.authenticated.link')"></a>.
        </div>
        <div class="alert alert-danger" v-if="error" v-html="t$('activate.messages.error')"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./activate.component.ts"></script>

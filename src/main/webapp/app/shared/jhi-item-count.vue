<template>
  <div class="info jhi-item-count">
    <span v-text="t$('global.item-count', { first, second, total })"></span>
  </div>
</template>

<script lang="ts" src="./jhi-item-count.component.ts"></script>

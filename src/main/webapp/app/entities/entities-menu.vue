<template>
  <div>
    <b-dropdown-item to="/bank-account-my-suffix">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.testRootBankAccountMySuffix')">Bank Account</span>
    </b-dropdown-item>
    <b-dropdown-item to="/label">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.testRootLabel')">Label</span>
    </b-dropdown-item>
    <b-dropdown-item to="/operation">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.testRootOperation')">Operation</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>

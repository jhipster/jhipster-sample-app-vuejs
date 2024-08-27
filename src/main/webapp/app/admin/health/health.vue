<template>
  <div>
    <h2>
      <span id="health-page-heading" v-text="t$('health.title')" data-cy="healthPageHeading"></span>
      <button class="btn btn-primary float-right" @click="refresh()" :disabled="updatingHealth">
        <font-awesome-icon icon="sync"></font-awesome-icon> <span v-text="t$('health[\'refresh.button\']')"></span>
      </button>
    </h2>
    <div class="table-responsive">
      <table id="healthCheck" class="table table-striped" aria-describedby="Health check">
        <thead>
          <tr>
            <th v-text="t$('health.table.service')" scope="col"></th>
            <th class="text-center" v-text="t$('health.table.status')" scope="col"></th>
            <th class="text-center" v-text="t$('health.details.details')" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="health of healthData" :key="health.name">
            <td><span v-text="t$('health.indicator.' + baseName(health.name))" /> {{ subSystemName(health.name) }}</td>
            <td class="text-center">
              <span class="badge" :class="getBadgeClass(health.status)" v-text="t$('health.status.' + health.status)"></span>
            </td>
            <td class="text-center">
              <a class="hand" @click="showHealth(health)" v-if="health.details || health.error">
                <font-awesome-icon icon="eye"></font-awesome-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="healthModal">
      <template #modal-title>
        <h4 v-if="currentHealth" class="modal-title" id="showHealthLabel">
          <span v-text="t$('health.indicator.' + baseName(currentHealth.name))" />
          {{ subSystemName(currentHealth.name) }}
        </h4>
      </template>
      <health-modal :current-health="currentHealth"></health-modal>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./health.component.ts"></script>

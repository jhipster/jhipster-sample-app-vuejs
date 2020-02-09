import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
import { Authority } from '@/shared/security/authority';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const BankAccountMySuffix = () => import('../entities/test-root/bank-account-my-suffix/bank-account-my-suffix.vue');
// prettier-ignore
const BankAccountMySuffixUpdate = () => import('../entities/test-root/bank-account-my-suffix/bank-account-my-suffix-update.vue');
// prettier-ignore
const BankAccountMySuffixDetails = () => import('../entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.vue');
// prettier-ignore
const Label = () => import('../entities/test-root/label/label.vue');
// prettier-ignore
const LabelUpdate = () => import('../entities/test-root/label/label-update.vue');
// prettier-ignore
const LabelDetails = () => import('../entities/test-root/label/label-details.vue');
// prettier-ignore
const Operation = () => import('../entities/test-root/operation/operation.vue');
// prettier-ignore
const OperationUpdate = () => import('../entities/test-root/operation/operation-update.vue');
// prettier-ignore
const OperationDetails = () => import('../entities/test-root/operation/operation-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/account/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/account/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/account/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: [Authority.ADMIN] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: [Authority.ADMIN] }
    }
    ,
    {
      path: '/bank-account-my-suffix',
      name: 'BankAccountMySuffix',
      component: BankAccountMySuffix,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/bank-account-my-suffix/new',
      name: 'BankAccountMySuffixCreate',
      component: BankAccountMySuffixUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/bank-account-my-suffix/:bankAccountId/edit',
      name: 'BankAccountMySuffixEdit',
      component: BankAccountMySuffixUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/bank-account-my-suffix/:bankAccountId/view',
      name: 'BankAccountMySuffixView',
      component: BankAccountMySuffixDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/label',
      name: 'Label',
      component: Label,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/label/new',
      name: 'LabelCreate',
      component: LabelUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/label/:labelId/edit',
      name: 'LabelEdit',
      component: LabelUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/label/:labelId/view',
      name: 'LabelView',
      component: LabelDetails,
      meta: { authorities: [Authority.USER] }
    }
    ,
    {
      path: '/operation',
      name: 'Operation',
      component: Operation,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/operation/new',
      name: 'OperationCreate',
      component: OperationUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/operation/:operationId/edit',
      name: 'OperationEdit',
      component: OperationUpdate,
      meta: { authorities: [Authority.USER] }
    },
    {
      path: '/operation/:operationId/view',
      name: 'OperationView',
      component: OperationDetails,
      meta: { authorities: [Authority.USER] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});

import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const BankAccountMySuffix = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.vue');
// prettier-ignore
const BankAccountMySuffixUpdate = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-update.vue');
// prettier-ignore
const BankAccountMySuffixDetails = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.vue');
// prettier-ignore
const Label = () => import('@/entities/test-root/label/label.vue');
// prettier-ignore
const LabelUpdate = () => import('@/entities/test-root/label/label-update.vue');
// prettier-ignore
const LabelDetails = () => import('@/entities/test-root/label/label-details.vue');
// prettier-ignore
const Operation = () => import('@/entities/test-root/operation/operation.vue');
// prettier-ignore
const OperationUpdate = () => import('@/entities/test-root/operation/operation-update.vue');
// prettier-ignore
const OperationDetails = () => import('@/entities/test-root/operation/operation-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/bank-account-my-suffix',
    name: 'BankAccountMySuffix',
    component: BankAccountMySuffix,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bank-account-my-suffix/new',
    name: 'BankAccountMySuffixCreate',
    component: BankAccountMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bank-account-my-suffix/:bankAccountId/edit',
    name: 'BankAccountMySuffixEdit',
    component: BankAccountMySuffixUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/bank-account-my-suffix/:bankAccountId/view',
    name: 'BankAccountMySuffixView',
    component: BankAccountMySuffixDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/label',
    name: 'Label',
    component: Label,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/label/new',
    name: 'LabelCreate',
    component: LabelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/label/:labelId/edit',
    name: 'LabelEdit',
    component: LabelUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/label/:labelId/view',
    name: 'LabelView',
    component: LabelDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/operation',
    name: 'Operation',
    component: Operation,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/operation/new',
    name: 'OperationCreate',
    component: OperationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/operation/:operationId/edit',
    name: 'OperationEdit',
    component: OperationUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/operation/:operationId/view',
    name: 'OperationView',
    component: OperationDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];

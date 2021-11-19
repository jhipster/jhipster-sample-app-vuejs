import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const BankAccountMySuffix = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.vue');
const BankAccountMySuffixUpdate = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-update.vue');
const BankAccountMySuffixDetails = () => import('@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.vue');

const Label = () => import('@/entities/test-root/label/label.vue');
const LabelUpdate = () => import('@/entities/test-root/label/label-update.vue');
const LabelDetails = () => import('@/entities/test-root/label/label-details.vue');

const Operation = () => import('@/entities/test-root/operation/operation.vue');
const OperationUpdate = () => import('@/entities/test-root/operation/operation-update.vue');
const OperationDetails = () => import('@/entities/test-root/operation/operation-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/',
    component: Entities,
    children: [
      {
        path: 'bank-account-my-suffix',
        name: 'BankAccountMySuffix',
        component: BankAccountMySuffix,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'bank-account-my-suffix/new',
        name: 'BankAccountMySuffixCreate',
        component: BankAccountMySuffixUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'bank-account-my-suffix/:bankAccountId/edit',
        name: 'BankAccountMySuffixEdit',
        component: BankAccountMySuffixUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'bank-account-my-suffix/:bankAccountId/view',
        name: 'BankAccountMySuffixView',
        component: BankAccountMySuffixDetails,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'label',
        name: 'Label',
        component: Label,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'label/new',
        name: 'LabelCreate',
        component: LabelUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'label/:labelId/edit',
        name: 'LabelEdit',
        component: LabelUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'label/:labelId/view',
        name: 'LabelView',
        component: LabelDetails,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'operation',
        name: 'Operation',
        component: Operation,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'operation/new',
        name: 'OperationCreate',
        component: OperationUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'operation/:operationId/edit',
        name: 'OperationEdit',
        component: OperationUpdate,
        meta: { authorities: [Authority.USER] },
      },
      {
        path: 'operation/:operationId/view',
        name: 'OperationView',
        component: OperationDetails,
        meta: { authorities: [Authority.USER] },
      },
      // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
    ],
  },
];

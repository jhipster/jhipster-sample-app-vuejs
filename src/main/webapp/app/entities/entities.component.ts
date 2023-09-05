import { defineComponent, provide } from 'vue';

import BankAccountMySuffixService from './test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import LabelService from './test-root/label/label.service';
import OperationService from './test-root/operation/operation.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('bankAccountService', () => new BankAccountMySuffixService());
    provide('labelService', () => new LabelService());
    provide('operationService', () => new OperationService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});

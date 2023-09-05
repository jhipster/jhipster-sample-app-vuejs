import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import BankAccountMySuffixService from './test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import LabelService from './test-root/label/label.service';
import OperationService from './test-root/operation/operation.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('bankAccountService') private bankAccountService = () => new BankAccountMySuffixService();
  @Provide('labelService') private labelService = () => new LabelService();
  @Provide('operationService') private operationService = () => new OperationService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}

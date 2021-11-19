import { Component, Provide, Vue } from 'vue-property-decorator';

import BankAccountMySuffixService from './test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import LabelService from './test-root/label/label.service';
import OperationService from './test-root/operation/operation.service';

@Component
export default class Entities extends Vue {
  @Provide('bankAccountService') private bankAccountService = () => new BankAccountMySuffixService();
  @Provide('labelService') private labelService = () => new LabelService();
  @Provide('operationService') private operationService = () => new OperationService();
}

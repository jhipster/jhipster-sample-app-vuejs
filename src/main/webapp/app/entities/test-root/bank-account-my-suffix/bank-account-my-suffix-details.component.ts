import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import BankAccountMySuffixService from './bank-account-my-suffix.service';

@Component
export default class BankAccountMySuffixDetails extends mixins(JhiDataUtils) {
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  public bankAccount: IBankAccountMySuffix = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bankAccountId) {
        vm.retrieveBankAccountMySuffix(to.params.bankAccountId);
      }
    });
  }

  public retrieveBankAccountMySuffix(bankAccountId) {
    this.bankAccountService()
      .find(bankAccountId)
      .then(res => {
        this.bankAccount = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

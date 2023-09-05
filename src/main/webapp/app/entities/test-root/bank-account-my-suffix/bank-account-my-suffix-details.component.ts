import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import BankAccountMySuffixService from './bank-account-my-suffix.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class BankAccountMySuffixDetails extends mixins(JhiDataUtils) {
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  @Inject('alertService') private alertService: () => AlertService;

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
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

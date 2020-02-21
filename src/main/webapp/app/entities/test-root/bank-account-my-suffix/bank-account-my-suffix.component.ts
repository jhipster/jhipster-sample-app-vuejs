import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';

import BankAccountMySuffixService from './bank-account-my-suffix.service';

@Component
export default class BankAccountMySuffix extends mixins(JhiDataUtils, Vue2Filters.mixin, AlertMixin) {
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  private removeId: number = null;

  public bankAccounts: IBankAccountMySuffix[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllBankAccountMySuffixs();
  }

  public clear(): void {
    this.retrieveAllBankAccountMySuffixs();
  }

  public retrieveAllBankAccountMySuffixs(): void {
    this.isFetching = true;

    this.bankAccountService()
      .retrieve()
      .then(
        res => {
          this.bankAccounts = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IBankAccountMySuffix): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeBankAccountMySuffix(): void {
    this.bankAccountService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jhipsterApp.testRootBankAccount.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllBankAccountMySuffixs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

import { mixins } from 'vue-class-component';
import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';

import JhiDataUtils from '@/shared/data/data-utils.service';

import BankAccountMySuffixService from './bank-account-my-suffix.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class BankAccountMySuffix extends mixins(JhiDataUtils) {
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  @Inject('alertService') private alertService: () => AlertService;

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
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
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
        const message = this.$t('jhipsterSampleApplicationVueApp.testRootBankAccount.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllBankAccountMySuffixs();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}

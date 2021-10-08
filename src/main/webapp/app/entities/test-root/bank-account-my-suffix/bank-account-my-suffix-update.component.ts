import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, decimal } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import UserService from '@/admin/user-management/user-management.service';

import OperationService from '@/entities/test-root/operation/operation.service';
import { IOperation } from '@/shared/model/test-root/operation.model';

import { IBankAccountMySuffix, BankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import BankAccountMySuffixService from './bank-account-my-suffix.service';

const validations: any = {
  bankAccount: {
    name: {
      required,
    },
    bankNumber: {},
    agencyNumber: {},
    lastOperationDuration: {},
    meanOperationDuration: {},
    balance: {
      required,
      decimal,
    },
    openingDay: {},
    lastOperationDate: {},
    active: {},
    accountType: {},
    attachment: {},
    description: {},
  },
};

@Component({
  validations,
})
export default class BankAccountMySuffixUpdate extends mixins(JhiDataUtils) {
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  @Inject('alertService') private alertService: () => AlertService;

  public bankAccount: IBankAccountMySuffix = new BankAccountMySuffix();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('operationService') private operationService: () => OperationService;

  public operations: IOperation[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bankAccountId) {
        vm.retrieveBankAccountMySuffix(to.params.bankAccountId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.bankAccount.id) {
      this.bankAccountService()
        .update(this.bankAccount)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootBankAccount.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.bankAccountService()
        .create(this.bankAccount)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootBankAccount.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.bankAccount[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.bankAccount[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.bankAccount[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.bankAccount[field] = null;
    }
  }

  public retrieveBankAccountMySuffix(bankAccountId): void {
    this.bankAccountService()
      .find(bankAccountId)
      .then(res => {
        res.lastOperationDate = new Date(res.lastOperationDate);
        this.bankAccount = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.userService()
      .retrieve()
      .then(res => {
        this.users = res.data;
      });
    this.operationService()
      .retrieve()
      .then(res => {
        this.operations = res.data;
      });
  }
}

import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import UserService from '@/admin/user-management/user-management.service';

import OperationService from '../operation/operation.service';
import { IOperation } from '@/shared/model/test-root/operation.model';

import AlertService from '@/shared/alert/alert.service';
import { IBankAccountMySuffix, BankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import BankAccountMySuffixService from './bank-account-my-suffix.service';

const validations: any = {
  bankAccount: {
    name: {
      required
    },
    bankNumber: {},
    agencyNumber: {},
    lastOperationDuration: {},
    meanOperationDuration: {},
    balance: {
      required,
      numeric
    },
    openingDay: {},
    lastOperationDate: {},
    active: {},
    accountType: {},
    attachment: {},
    description: {}
  }
};

@Component({
  validations
})
export default class BankAccountMySuffixUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;
  public bankAccount: IBankAccountMySuffix = new BankAccountMySuffix();

  @Inject('userService') private userService: () => UserService;

  public users: Array<any> = [];

  @Inject('operationService') private operationService: () => OperationService;

  public operations: IOperation[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bankAccountId) {
        vm.retrieveBankAccountMySuffix(to.params.bankAccountId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.bankAccount.id) {
      this.bankAccountService()
        .update(this.bankAccount)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootBankAccount.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bankAccountService()
        .create(this.bankAccount)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootBankAccount.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.bankAccount[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.bankAccount[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.bankAccount[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
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

import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import BankAccountMySuffixService from '../bank-account-my-suffix/bank-account-my-suffix.service';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';

import LabelService from '../label/label.service';
import { ILabel } from '@/shared/model/test-root/label.model';

import AlertService from '@/shared/alert/alert.service';
import { IOperation, Operation } from '@/shared/model/test-root/operation.model';
import OperationService from './operation.service';

const validations: any = {
  operation: {
    date: {
      required
    },
    description: {},
    amount: {
      required,
      numeric
    }
  }
};

@Component({
  validations
})
export default class OperationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('operationService') private operationService: () => OperationService;
  public operation: IOperation = new Operation();

  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;

  public bankAccounts: IBankAccountMySuffix[] = [];

  @Inject('labelService') private labelService: () => LabelService;

  public labels: ILabel[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.operationId) {
        vm.retrieveOperation(to.params.operationId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.operation.labels = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.operation.id) {
      this.operationService()
        .update(this.operation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootOperation.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.operationService()
        .create(this.operation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootOperation.created', { param: param.id });
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
      this.operation[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.operation[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.operation[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.operation[field] = null;
    }
  }

  public retrieveOperation(operationId): void {
    this.operationService()
      .find(operationId)
      .then(res => {
        res.date = new Date(res.date);
        this.operation = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.bankAccountService()
      .retrieve()
      .then(res => {
        this.bankAccounts = res.data;
      });
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}

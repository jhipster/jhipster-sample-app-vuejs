import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, decimal } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';

import LabelService from '@/entities/test-root/label/label.service';
import { ILabel } from '@/shared/model/test-root/label.model';

import { IOperation, Operation } from '@/shared/model/test-root/operation.model';
import OperationService from './operation.service';

const validations: any = {
  operation: {
    date: {
      required,
    },
    description: {},
    amount: {
      required,
      decimal,
    },
  },
};

@Component({
  validations,
})
export default class OperationUpdate extends Vue {
  @Inject('operationService') private operationService: () => OperationService;
  public operation: IOperation = new Operation();

  @Inject('bankAccountService') private bankAccountService: () => BankAccountMySuffixService;

  public bankAccounts: IBankAccountMySuffix[] = [];

  @Inject('labelService') private labelService: () => LabelService;

  public labels: ILabel[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.operationId) {
        vm.retrieveOperation(to.params.operationId);
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
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootOperation.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.operationService()
        .create(this.operation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootOperation.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
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
      this.operation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.operation[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.operation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
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

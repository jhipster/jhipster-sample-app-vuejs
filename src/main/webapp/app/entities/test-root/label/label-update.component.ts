import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import OperationService from '../operation/operation.service';
import { IOperation } from '@/shared/model/test-root/operation.model';

import AlertService from '@/shared/alert/alert.service';
import { ILabel, Label } from '@/shared/model/test-root/label.model';
import LabelService from './label.service';

const validations: any = {
  label: {
    labelName: {
      required,
      minLength: minLength(3)
    }
  }
};

@Component({
  validations
})
export default class LabelUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('labelService') private labelService: () => LabelService;
  public label: ILabel = new Label();

  @Inject('operationService') private operationService: () => OperationService;

  public operations: IOperation[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.label.id) {
      this.labelService()
        .update(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootLabel.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.labelService()
        .create(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterApp.testRootLabel.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveLabel(labelId): void {
    this.labelService()
      .find(labelId)
      .then(res => {
        this.label = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.operationService()
      .retrieve()
      .then(res => {
        this.operations = res.data;
      });
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, minLength } from 'vuelidate/lib/validators';

import OperationService from '@/entities/test-root/operation/operation.service';
import { IOperation } from '@/shared/model/test-root/operation.model';

import { ILabel, Label } from '@/shared/model/test-root/label.model';
import LabelService from './label.service';

const validations: any = {
  label: {
    labelName: {
      required,
      minLength: minLength(3),
    },
  },
};

@Component({
  validations,
})
export default class LabelUpdate extends Vue {
  @Inject('labelService') private labelService: () => LabelService;
  public label: ILabel = new Label();

  @Inject('operationService') private operationService: () => OperationService;

  public operations: IOperation[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
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
    if (this.label.id) {
      this.labelService()
        .update(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootLabel.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        });
    } else {
      this.labelService()
        .create(this.label)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jhipsterSampleApplicationVueApp.testRootLabel.created', { param: param.id });
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

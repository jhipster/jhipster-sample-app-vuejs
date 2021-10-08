import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILabel } from '@/shared/model/test-root/label.model';
import LabelService from './label.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LabelDetails extends Vue {
  @Inject('labelService') private labelService: () => LabelService;
  @Inject('alertService') private alertService: () => AlertService;

  public label: ILabel = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.labelId) {
        vm.retrieveLabel(to.params.labelId);
      }
    });
  }

  public retrieveLabel(labelId) {
    this.labelService()
      .find(labelId)
      .then(res => {
        this.label = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

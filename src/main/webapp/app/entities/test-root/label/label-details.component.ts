import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILabel } from '@/shared/model/test-root/label.model';
import LabelService from './label.service';

@Component
export default class LabelDetails extends Vue {
  @Inject('labelService') private labelService: () => LabelService;
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
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

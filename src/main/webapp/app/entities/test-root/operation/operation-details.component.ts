import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOperation } from '@/shared/model/test-root/operation.model';
import OperationService from './operation.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class OperationDetails extends Vue {
  @Inject('operationService') private operationService: () => OperationService;
  @Inject('alertService') private alertService: () => AlertService;

  public operation: IOperation = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.operationId) {
        vm.retrieveOperation(to.params.operationId);
      }
    });
  }

  public retrieveOperation(operationId) {
    this.operationService()
      .find(operationId)
      .then(res => {
        this.operation = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOperation } from '@/shared/model/test-root/operation.model';
import OperationService from './operation.service';

@Component
export default class OperationDetails extends Vue {
  @Inject('operationService') private operationService: () => OperationService;
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
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}

/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, MountingOptions } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { RouteLocation } from 'vue-router';

import OperationDetails from '../../..../......mainwebappapp/entities/test-root/operation/operation-details.vue';
import OperationService from '../../..../......mainwebappapp/entities/test-root/operation/operation.service';
import AlertService from '../../..../......mainwebappapp/shared/alert/alert.service';

type OperationDetailsComponentType = InstanceType<typeof OperationDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const operationSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Operation Management Detail Component', () => {
    let operationServiceStub: SinonStubbedInstance<OperationService>;
    let mountOptions: MountingOptions<OperationDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      operationServiceStub = sinon.createStubInstance<OperationService>(OperationService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          operationService: () => operationServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        operationServiceStub.find.resolves(operationSample);
        route = {
          params: {
            operationId: '' + 123,
          },
        };
        const wrapper = shallowMount(OperationDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.operation).toMatchObject(operationSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        operationServiceStub.find.resolves(operationSample);
        const wrapper = shallowMount(OperationDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

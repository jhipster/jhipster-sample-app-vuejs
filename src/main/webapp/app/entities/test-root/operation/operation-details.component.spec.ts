import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';

import AlertService from '@/shared/alert/alert.service';

import OperationDetails from './operation-details.vue';

type OperationDetailsComponentType = InstanceType<typeof OperationDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const operationSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Operation Management Detail Component', () => {
    let operationServiceStub: any;
    let mountOptions: MountingOptions<OperationDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      operationServiceStub = {
        find: vi.fn(),
      };

      alertService = new AlertService({
        i18n: { t: vi.fn() } as any,
        toast: {
          create: vi.fn(),
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
        operationServiceStub.find.mockResolvedValue(operationSample);
        route = {
          params: {
            operationId: `${123}`,
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
        operationServiceStub.find.mockResolvedValue(operationSample);
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

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';

import AlertService from '@/shared/alert/alert.service';

import LabelDetails from './label-details.vue';

type LabelDetailsComponentType = InstanceType<typeof LabelDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const labelSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Label Management Detail Component', () => {
    let labelServiceStub: any;
    let mountOptions: MountingOptions<LabelDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      labelServiceStub = {
        find: vi.fn(),
      };

      alertService = new AlertService({
        i18n: { t: vi.fn() } as any,
        toast: {
          show: vi.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          labelService: () => labelServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        labelServiceStub.find.mockResolvedValue(labelSample);
        route = {
          params: {
            labelId: `${123}`,
          },
        };
        const wrapper = shallowMount(LabelDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.label).toMatchObject(labelSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        labelServiceStub.find.mockResolvedValue(labelSample);
        const wrapper = shallowMount(LabelDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

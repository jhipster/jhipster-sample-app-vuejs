/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import LabelDetails from './label-details.vue';
import LabelService from './label.service';
import AlertService from '@/shared/alert/alert.service';

type LabelDetailsComponentType = InstanceType<typeof LabelDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const labelSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('Label Management Detail Component', () => {
    let labelServiceStub: SinonStubbedInstance<LabelService>;
    let mountOptions: MountingOptions<LabelDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      labelServiceStub = sinon.createStubInstance<LabelService>(LabelService);

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
          labelService: () => labelServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        labelServiceStub.find.resolves(labelSample);
        route = {
          params: {
            labelId: '' + 123,
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
        labelServiceStub.find.resolves(labelSample);
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

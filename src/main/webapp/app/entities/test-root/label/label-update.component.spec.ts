/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { shallowMount, type MountingOptions } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import LabelUpdate from './label-update.vue';
import LabelService from './label.service';
import AlertService from '@/shared/alert/alert.service';

type LabelUpdateComponentType = InstanceType<typeof LabelUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const labelSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LabelUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Label Management Update Component', () => {
    let comp: LabelUpdateComponentType;
    let labelServiceStub: SinonStubbedInstance<LabelService>;

    beforeEach(() => {
      route = {};
      labelServiceStub = sinon.createStubInstance<LabelService>(LabelService);
      labelServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          labelService: () => labelServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.label = labelSample;
        labelServiceStub.update.resolves(labelSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.update.calledWith(labelSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        labelServiceStub.create.resolves(entity);
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.label = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        labelServiceStub.find.resolves(labelSample);
        labelServiceStub.retrieve.resolves([labelSample]);

        // WHEN
        route = {
          params: {
            labelId: '' + labelSample.id,
          },
        };
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.label).toMatchObject(labelSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        labelServiceStub.find.resolves(labelSample);
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

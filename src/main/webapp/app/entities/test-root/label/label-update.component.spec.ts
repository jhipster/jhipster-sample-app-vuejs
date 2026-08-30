import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';

import AlertService from '@/shared/alert/alert.service';

import LabelUpdate from './label-update.vue';

type LabelUpdateComponentType = InstanceType<typeof LabelUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const labelSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<LabelUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Label Management Update Component', () => {
    let comp: LabelUpdateComponentType;
    let labelServiceStub: any;

    beforeEach(() => {
      route = {};
      labelServiceStub = {
        retrieve: vi.fn(),
        find: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
      };
      labelServiceStub.retrieve.mockResolvedValueOnce([]);

      alertService = new AlertService({
        i18n: { t: vi.fn() } as any,
        toast: {
          create: vi.fn(),
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
          operationService: () => ({
            retrieve: vi.fn().mockResolvedValue({}),
          }),
        },
      };
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.label = labelSample;
        labelServiceStub.update.mockResolvedValue(labelSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.update).toHaveBeenCalledWith(labelSample);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        labelServiceStub.create.mockResolvedValue(entity);
        const wrapper = shallowMount(LabelUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.label = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        labelServiceStub.find.mockResolvedValue(labelSample);
        labelServiceStub.retrieve.mockResolvedValue([labelSample]);

        // WHEN
        route = {
          params: {
            labelId: `${labelSample.id}`,
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
        labelServiceStub.find.mockResolvedValue(labelSample);
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

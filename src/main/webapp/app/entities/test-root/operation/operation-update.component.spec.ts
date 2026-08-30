import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';
import dayjs from 'dayjs';

import AlertService from '@/shared/alert/alert.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';

import OperationUpdate from './operation-update.vue';

type OperationUpdateComponentType = InstanceType<typeof OperationUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const operationSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<OperationUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Operation Management Update Component', () => {
    let comp: OperationUpdateComponentType;
    let operationServiceStub: any;

    beforeEach(() => {
      route = {};
      operationServiceStub = {
        retrieve: vi.fn(),
        find: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
      };
      operationServiceStub.retrieve.mockResolvedValueOnce([]);

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
          operationService: () => operationServiceStub,
          bankAccountService: () => ({
            retrieve: vi.fn().mockResolvedValue({}),
          }),
          labelService: () => ({
            retrieve: vi.fn().mockResolvedValue({}),
          }),
        },
      };
    });

    afterEach(() => {
      vi.resetAllMocks();
    });

    describe('load', () => {
      beforeEach(() => {
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
      });
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.operation = operationSample;
        operationServiceStub.update.mockResolvedValue(operationSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.update).toHaveBeenCalledWith(operationSample);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        operationServiceStub.create.mockResolvedValue(entity);
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.operation = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        operationServiceStub.find.mockResolvedValue(operationSample);
        operationServiceStub.retrieve.mockResolvedValue([operationSample]);

        // WHEN
        route = {
          params: {
            operationId: `${operationSample.id}`,
          },
        };
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.operation).toMatchObject(operationSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        operationServiceStub.find.mockResolvedValue(operationSample);
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

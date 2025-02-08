import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import OperationUpdate from './operation-update.vue';
import OperationService from './operation.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';
import AlertService from '@/shared/alert/alert.service';

import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import LabelService from '@/entities/test-root/label/label.service';

type OperationUpdateComponentType = InstanceType<typeof OperationUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const operationSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<OperationUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Operation Management Update Component', () => {
    let comp: OperationUpdateComponentType;
    let operationServiceStub: SinonStubbedInstance<OperationService>;

    beforeEach(() => {
      route = {};
      operationServiceStub = sinon.createStubInstance<OperationService>(OperationService);
      operationServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          operationService: () => operationServiceStub,
          bankAccountService: () =>
            sinon.createStubInstance<BankAccountMySuffixService>(BankAccountMySuffixService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
          labelService: () =>
            sinon.createStubInstance<LabelService>(LabelService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
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
        operationServiceStub.update.resolves(operationSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.update.calledWith(operationSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        operationServiceStub.create.resolves(entity);
        const wrapper = shallowMount(OperationUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.operation = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        operationServiceStub.find.resolves(operationSample);
        operationServiceStub.retrieve.resolves([operationSample]);

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
        operationServiceStub.find.resolves(operationSample);
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

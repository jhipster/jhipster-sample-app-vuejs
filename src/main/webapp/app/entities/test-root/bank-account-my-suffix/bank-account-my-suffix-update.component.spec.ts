/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import dayjs from 'dayjs';
import BankAccountMySuffixUpdate from './bank-account-my-suffix-update.vue';
import BankAccountMySuffixService from './bank-account-my-suffix.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';
import AlertService from '@/shared/alert/alert.service';

import UserService from '@/entities/user/user.service';

type BankAccountMySuffixUpdateComponentType = InstanceType<typeof BankAccountMySuffixUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankAccountSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<BankAccountMySuffixUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('BankAccountMySuffix Management Update Component', () => {
    let comp: BankAccountMySuffixUpdateComponentType;
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountMySuffixService>;

    beforeEach(() => {
      route = {};
      bankAccountServiceStub = sinon.createStubInstance<BankAccountMySuffixService>(BankAccountMySuffixService);
      bankAccountServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

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
          bankAccountService: () => bankAccountServiceStub,

          userService: () =>
            sinon.createStubInstance<UserService>(UserService, {
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
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
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
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bankAccount = bankAccountSample;
        bankAccountServiceStub.update.resolves(bankAccountSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.update.calledWith(bankAccountSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        bankAccountServiceStub.create.resolves(entity);
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bankAccount = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        bankAccountServiceStub.find.resolves(bankAccountSample);
        bankAccountServiceStub.retrieve.resolves([bankAccountSample]);

        // WHEN
        route = {
          params: {
            bankAccountId: `${bankAccountSample.id}`,
          },
        };
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toMatchObject(bankAccountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankAccountServiceStub.find.resolves(bankAccountSample);
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

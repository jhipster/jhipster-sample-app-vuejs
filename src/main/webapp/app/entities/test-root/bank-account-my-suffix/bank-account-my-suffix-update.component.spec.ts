import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type RouteLocation } from 'vue-router';

import { type MountingOptions, shallowMount } from '@vue/test-utils';
import dayjs from 'dayjs';

import AlertService from '@/shared/alert/alert.service';
import { DATE_TIME_LONG_FORMAT } from '@/shared/composables/date-format';

import BankAccountMySuffixUpdate from './bank-account-my-suffix-update.vue';

type BankAccountMySuffixUpdateComponentType = InstanceType<typeof BankAccountMySuffixUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vi.fn();

vi.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankAccountSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<BankAccountMySuffixUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('BankAccountMySuffix Management Update Component', () => {
    let comp: BankAccountMySuffixUpdateComponentType;
    let bankAccountServiceStub: any;

    beforeEach(() => {
      route = {};
      bankAccountServiceStub = {
        retrieve: vi.fn(),
        find: vi.fn(),
        update: vi.fn(),
        create: vi.fn(),
      };
      bankAccountServiceStub.retrieve.mockResolvedValueOnce([]);

      alertService = new AlertService({
        i18n: { t: vi.fn() } as any,
        toast: {
          show: vi.fn(),
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

          userService: () => ({
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
        bankAccountServiceStub.update.mockResolvedValue(bankAccountSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.update).toHaveBeenCalledWith(bankAccountSample);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        bankAccountServiceStub.create.mockResolvedValue(entity);
        const wrapper = shallowMount(BankAccountMySuffixUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.bankAccount = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        bankAccountServiceStub.find.mockResolvedValue(bankAccountSample);
        bankAccountServiceStub.retrieve.mockResolvedValue([bankAccountSample]);

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
        bankAccountServiceStub.find.mockResolvedValue(bankAccountSample);
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

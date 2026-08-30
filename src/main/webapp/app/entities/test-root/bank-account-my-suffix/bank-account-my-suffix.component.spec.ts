import { beforeEach, describe, expect, it, vi } from 'vitest';

import { type MountingOptions, shallowMount } from '@vue/test-utils';

import AlertService from '@/shared/alert/alert.service';

import BankAccountMySuffix from './bank-account-my-suffix.vue';

type BankAccountMySuffixComponentType = InstanceType<typeof BankAccountMySuffix>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('BankAccountMySuffix Management Component', () => {
    let bankAccountServiceStub: any;
    let mountOptions: MountingOptions<BankAccountMySuffixComponentType>['global'];

    beforeEach(() => {
      bankAccountServiceStub = {
        retrieve: vi.fn(),
        delete: vi.fn(),
      };
      bankAccountServiceStub.retrieve.mockResolvedValue({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vi.fn() } as any,
        toast: {
          create: vi.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          bankAccountService: () => bankAccountServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        bankAccountServiceStub.retrieve.mockResolvedValue({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(BankAccountMySuffix, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(bankAccountServiceStub.retrieve).toHaveBeenCalledOnce();
        expect(comp.bankAccounts[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: BankAccountMySuffixComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(BankAccountMySuffix, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        bankAccountServiceStub.retrieve.mockReset();
        bankAccountServiceStub.retrieve.mockResolvedValue({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        bankAccountServiceStub.delete.mockResolvedValue({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeBankAccountMySuffix();
        await comp.$nextTick(); // clear components

        // THEN
        expect(bankAccountServiceStub.delete).toHaveBeenCalled();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(bankAccountServiceStub.retrieve).toHaveBeenCalledTimes(1);
      });
    });
  });
});

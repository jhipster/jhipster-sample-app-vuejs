/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import BankAccountMySuffixDetails from './bank-account-my-suffix-details.vue';
import BankAccountMySuffixService from './bank-account-my-suffix.service';
import AlertService from '@/shared/alert/alert.service';

type BankAccountMySuffixDetailsComponentType = InstanceType<typeof BankAccountMySuffixDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const bankAccountSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('BankAccountMySuffix Management Detail Component', () => {
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountMySuffixService>;
    let mountOptions: MountingOptions<BankAccountMySuffixDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      bankAccountServiceStub = sinon.createStubInstance<BankAccountMySuffixService>(BankAccountMySuffixService);

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
          bankAccountService: () => bankAccountServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        bankAccountServiceStub.find.resolves(bankAccountSample);
        route = {
          params: {
            bankAccountId: `${123}`,
          },
        };
        const wrapper = shallowMount(BankAccountMySuffixDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toMatchObject(bankAccountSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        bankAccountServiceStub.find.resolves(bankAccountSample);
        const wrapper = shallowMount(BankAccountMySuffixDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});

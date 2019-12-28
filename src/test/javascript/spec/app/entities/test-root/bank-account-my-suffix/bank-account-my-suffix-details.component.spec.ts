/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BankAccountMySuffixDetailComponent from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.vue';
import BankAccountMySuffixClass from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.component';
import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BankAccountMySuffix Management Detail Component', () => {
    let wrapper: Wrapper<BankAccountMySuffixClass>;
    let comp: BankAccountMySuffixClass;
    let bankAccountServiceStub: SinonStubbedInstance<BankAccountMySuffixService>;

    beforeEach(() => {
      bankAccountServiceStub = sinon.createStubInstance<BankAccountMySuffixService>(BankAccountMySuffixService);

      wrapper = shallowMount<BankAccountMySuffixClass>(BankAccountMySuffixDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { bankAccountService: () => bankAccountServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBankAccountMySuffix = { id: 123 };
        bankAccountServiceStub.find.resolves(foundBankAccountMySuffix);

        // WHEN
        comp.retrieveBankAccountMySuffix(123);
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toBe(foundBankAccountMySuffix);
      });
    });
  });
});

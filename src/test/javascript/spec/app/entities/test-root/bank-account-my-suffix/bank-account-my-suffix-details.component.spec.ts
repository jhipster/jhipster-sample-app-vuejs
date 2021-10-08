/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import BankAccountMySuffixDetailComponent from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.vue';
import BankAccountMySuffixClass from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix-details.component';
import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

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
        router,
        provide: { bankAccountService: () => bankAccountServiceStub, alertService: () => new AlertService() },
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

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundBankAccountMySuffix = { id: 123 };
        bankAccountServiceStub.find.resolves(foundBankAccountMySuffix);

        // WHEN
        comp.beforeRouteEnter({ params: { bankAccountId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toBe(foundBankAccountMySuffix);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});

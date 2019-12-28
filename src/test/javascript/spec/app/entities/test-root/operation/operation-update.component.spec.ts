/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OperationUpdateComponent from '@/entities/test-root/operation/operation-update.vue';
import OperationClass from '@/entities/test-root/operation/operation-update.component';
import OperationService from '@/entities/test-root/operation/operation.service';

import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';

import LabelService from '@/entities/test-root/label/label.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Operation Management Update Component', () => {
    let wrapper: Wrapper<OperationClass>;
    let comp: OperationClass;
    let operationServiceStub: SinonStubbedInstance<OperationService>;

    beforeEach(() => {
      operationServiceStub = sinon.createStubInstance<OperationService>(OperationService);

      wrapper = shallowMount<OperationClass>(OperationUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          operationService: () => operationServiceStub,

          bankAccountService: () => new BankAccountMySuffixService(),

          labelService: () => new LabelService()
        }
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(format(date, DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.operation = entity;
        operationServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.operation = entity;
        operationServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(operationServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});

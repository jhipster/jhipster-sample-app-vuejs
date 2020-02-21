/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import OperationComponent from '@/entities/test-root/operation/operation.vue';
import OperationClass from '@/entities/test-root/operation/operation.component';
import OperationService from '@/entities/test-root/operation/operation.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {}
  }
};

describe('Component Tests', () => {
  describe('Operation Management Component', () => {
    let wrapper: Wrapper<OperationClass>;
    let comp: OperationClass;
    let operationServiceStub: SinonStubbedInstance<OperationService>;

    beforeEach(() => {
      operationServiceStub = sinon.createStubInstance<OperationService>(OperationService);
      operationServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<OperationClass>(OperationComponent, {
        store,
        i18n,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          operationService: () => operationServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      operationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllOperations();
      await comp.$nextTick();

      // THEN
      expect(operationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.operations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      operationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(operationServiceStub.retrieve.called).toBeTruthy();
      expect(comp.operations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      operationServiceStub.retrieve.reset();
      operationServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(operationServiceStub.retrieve.callCount).toEqual(2);
      expect(comp.page).toEqual(1);
      expect(comp.operations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      operationServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeOperation();
      await comp.$nextTick();

      // THEN
      expect(operationServiceStub.delete.called).toBeTruthy();
      expect(operationServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});

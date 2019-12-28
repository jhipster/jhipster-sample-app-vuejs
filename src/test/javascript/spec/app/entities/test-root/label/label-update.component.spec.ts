/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import LabelUpdateComponent from '@/entities/test-root/label/label-update.vue';
import LabelClass from '@/entities/test-root/label/label-update.component';
import LabelService from '@/entities/test-root/label/label.service';

import OperationService from '@/entities/test-root/operation/operation.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Label Management Update Component', () => {
    let wrapper: Wrapper<LabelClass>;
    let comp: LabelClass;
    let labelServiceStub: SinonStubbedInstance<LabelService>;

    beforeEach(() => {
      labelServiceStub = sinon.createStubInstance<LabelService>(LabelService);

      wrapper = shallowMount<LabelClass>(LabelUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          labelService: () => labelServiceStub,

          operationService: () => new OperationService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.label = entity;
        labelServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.label = entity;
        labelServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(labelServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});

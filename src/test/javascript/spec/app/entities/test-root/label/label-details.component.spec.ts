/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LabelDetailComponent from '@/entities/test-root/label/label-details.vue';
import LabelClass from '@/entities/test-root/label/label-details.component';
import LabelService from '@/entities/test-root/label/label.service';
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
  describe('Label Management Detail Component', () => {
    let wrapper: Wrapper<LabelClass>;
    let comp: LabelClass;
    let labelServiceStub: SinonStubbedInstance<LabelService>;

    beforeEach(() => {
      labelServiceStub = sinon.createStubInstance<LabelService>(LabelService);

      wrapper = shallowMount<LabelClass>(LabelDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { labelService: () => labelServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLabel = { id: 123 };
        labelServiceStub.find.resolves(foundLabel);

        // WHEN
        comp.retrieveLabel(123);
        await comp.$nextTick();

        // THEN
        expect(comp.label).toBe(foundLabel);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLabel = { id: 123 };
        labelServiceStub.find.resolves(foundLabel);

        // WHEN
        comp.beforeRouteEnter({ params: { labelId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.label).toBe(foundLabel);
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

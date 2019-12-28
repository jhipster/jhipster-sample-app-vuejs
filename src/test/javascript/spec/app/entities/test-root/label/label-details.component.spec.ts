/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import LabelDetailComponent from '@/entities/test-root/label/label-details.vue';
import LabelClass from '@/entities/test-root/label/label-details.component';
import LabelService from '@/entities/test-root/label/label.service';

const localVue = createLocalVue();

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
        provide: { labelService: () => labelServiceStub }
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
  });
});

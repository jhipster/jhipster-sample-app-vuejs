import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import JhiDocs from '@/admin/docs/docs.vue';
import JhiDocsClass from '@/admin/docs/docs.component';

import * as config from '@/shared/config/config';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);

describe('JhiDocs', () => {
  let jhiDocs: JhiDocsClass;
  let wrapper: Wrapper<JhiDocsClass>;

  beforeEach(() => {
    wrapper = shallowMount<JhiDocsClass>(JhiDocs, {
      i18n,
      localVue
    });
    jhiDocs = wrapper.vm;
  });

  it('should be a Vue instance', async () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

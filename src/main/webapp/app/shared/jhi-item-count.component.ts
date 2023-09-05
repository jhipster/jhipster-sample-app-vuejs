import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  compatConfig: { MODE: 3 },
  props: {
    page: Number,
    total: Number,
    itemsPerPage: Number,
  },
  setup(props) {
    const first = computed(() => ((props.page - 1) * props.itemsPerPage === 0 ? 1 : (props.page - 1) * props.itemsPerPage + 1));
    const second = computed(() => (props.page * props.itemsPerPage < props.total ? props.page * props.itemsPerPage : props.total));

    return {
      first,
      second,
      t$: useI18n().t,
    };
  },
});

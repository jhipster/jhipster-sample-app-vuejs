import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 20,
    },
  },
  setup(props) {
    const first = computed(() => ((props.page - 1) * props.itemsPerPage === 0 ? 1 : (props.page - 1) * props.itemsPerPage + 1));
    const second = computed(() => Math.min(props.page * props.itemsPerPage, props.total));

    return {
      first,
      second,
      t$: useI18n().t,
    };
  },
});

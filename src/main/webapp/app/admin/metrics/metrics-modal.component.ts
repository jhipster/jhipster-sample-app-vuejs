import { type PropType, type Ref, computed, defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { filterBy } from '@/shared/computables';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiMetricsModal',
  props: {
    threadDump: {
      type: Array as PropType<any[]>,
    },
  },
  setup(props) {
    const threadDumpFilter: Ref<any> = ref('');
    const filteredThreadDump = computed(() => filterBy(props.threadDump, { filterByTerm: threadDumpFilter.value }));

    const threadDumpData = computed(() => {
      const data = {
        threadDumpAll: 0,
        threadDumpBlocked: 0,
        threadDumpRunnable: 0,
        threadDumpTimedWaiting: 0,
        threadDumpWaiting: 0,
      };
      if (props.threadDump) {
        props.threadDump.forEach(value => {
          if (value.threadState === 'RUNNABLE') {
            data.threadDumpRunnable += 1;
          } else if (value.threadState === 'WAITING') {
            data.threadDumpWaiting += 1;
          } else if (value.threadState === 'TIMED_WAITING') {
            data.threadDumpTimedWaiting += 1;
          } else if (value.threadState === 'BLOCKED') {
            data.threadDumpBlocked += 1;
          }
        });
        data.threadDumpAll = data.threadDumpRunnable + data.threadDumpWaiting + data.threadDumpTimedWaiting + data.threadDumpBlocked;
      }
      return data;
    });

    return {
      threadDumpFilter,
      threadDumpData,
      filteredThreadDump,
      t$: useI18n().t,
    };
  },
  methods: {
    getBadgeClass(threadState: string): string {
      if (threadState === 'RUNNABLE') {
        return 'badge-success';
      } else if (threadState === 'WAITING') {
        return 'badge-info';
      } else if (threadState === 'TIMED_WAITING') {
        return 'badge-warning';
      } else if (threadState === 'BLOCKED') {
        return 'badge-danger';
      }
    },
  },
});

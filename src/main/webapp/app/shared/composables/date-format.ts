import { type Ref } from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export const DATE_TIME_LONG_FORMAT = 'YYYY-MM-DDTHH:mm';

export const useDateFormat = ({ entityRef }: { entityRef?: Ref<Record<string, any>> } = {}) => {
  const formatDate = value => (value ? dayjs(value).format(DATE_TIME_FORMAT) : '');
  const dateFormatUtils = {
    convertDateTimeFromServer: (date: Date): string => (date && dayjs(date).isValid() ? dayjs(date).format(DATE_TIME_LONG_FORMAT) : null),
    formatDate,
    formatDuration: value => (value ? (dayjs.duration(value).humanize() ?? value) : ''),
  };
  const entityUtils = entityRef
    ? {
        ...dateFormatUtils,
        updateInstantField: (field: string, event: any) => {
          if (event.target?.value) {
            entityRef.value[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
          } else {
            entityRef.value[field] = null;
          }
        },
        updateZonedDateTimeField: (field: string, event: any) => {
          if (event.target?.value) {
            entityRef.value[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
          } else {
            entityRef.value[field] = null;
          }
        },
      }
    : {};

  const i18n = useI18n();
  const formatDateI18N = (date, format = 'short') => (date ? i18n.d(Date.parse(date), format) : null);
  const i18nUtils = {
    formatDateI18N,
    formatDateLong: date => formatDateI18N(date, 'long'),
    formatDateShort: date => formatDateI18N(date, 'short'),
  };

  return {
    ...dateFormatUtils,
    ...entityUtils,
    ...i18nUtils,
  };
};

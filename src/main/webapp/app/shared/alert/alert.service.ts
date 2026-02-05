import { type Composer, useI18n } from 'vue-i18n';

import { type BToastProps, useToast } from 'bootstrap-vue-next';

import { getMessageFromHeaders } from '@/shared/jhipster/headers';

export const useAlertService = () => {
  const toast = useToast();
  if (!toast) {
    throw new Error('BootstrapVue toast component was not found');
  }
  const i18n = useI18n();
  return new AlertService({
    toast,
    i18n,
  });
};

export default class AlertService {
  private readonly toast: ReturnType<typeof useToast>;
  private readonly i18n: Composer;

  constructor({ toast, i18n }: { toast: ReturnType<typeof useToast>; i18n: Composer }) {
    this.toast = toast;
    this.i18n = i18n;
  }

  showInfo(toastMessage: string, props: BToastProps = {}) {
    this.toast.show!({
      props: {
        pos: 'top-center',
        title: 'Info',
        variant: 'info',
        solid: true,
        body: toastMessage,
        ...props,
      },
    });
  }

  showSuccess(toastMessage: string) {
    this.showInfo(toastMessage, {
      title: 'Success',
      variant: 'success',
    });
  }

  showError(toastMessage: string) {
    this.showInfo(toastMessage, {
      title: 'Error',
      variant: 'danger',
    });
  }

  showHttpError({ data, status, headers }: any) {
    let errorMessage: string | null = null;
    switch (status) {
      case 0:
        errorMessage = this.i18n.t('error.server.not.reachable').toString();
        break;

      case 400: {
        const message = getMessageFromHeaders(headers);
        if (message.errorKey && message.param) {
          errorMessage = this.i18n.t(message.errorKey!, { entityName: this.i18n.t(`global.menu.entities.${message.param!}`) }).toString();
        } else if (message.errorKey) {
          errorMessage = this.i18n.t(message.errorKey!).toString();
        } else if (message.errorMessage) {
          errorMessage = message.errorMessage;
        } else if (data.message) {
          errorMessage = this.i18n.t(data.message).toString();
        } else if (data?.fieldErrors) {
          errorMessage = 'Validation error';
        }
        break;
      }

      case 404:
        errorMessage = this.i18n.t('error.http.404').toString();
        break;

      default:
        errorMessage = this.i18n.t(data.message).toString();
    }
    this.showError(errorMessage!);
  }
}

import { type Composer, useI18n } from 'vue-i18n';

import { type BToastProps, useToast } from 'bootstrap-vue-next';

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
  private toast: ReturnType<typeof useToast>;
  private i18n: Composer;

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

  showHttpError(httpErrorResponse: any) {
    let errorMessage: string | null = null;
    switch (httpErrorResponse.status) {
      case 0:
        errorMessage = this.i18n.t('error.server.not.reachable').toString();
        break;

      case 400: {
        const arr = Object.keys(httpErrorResponse.headers);
        let entityKey: string | null = null;
        for (const entry of arr) {
          if (entry.toLowerCase().endsWith('app-error')) {
            errorMessage = httpErrorResponse.headers[entry];
          } else if (entry.toLowerCase().endsWith('app-params')) {
            entityKey = httpErrorResponse.headers[entry];
          }
        }
        if (errorMessage && entityKey) {
          errorMessage = this.i18n.t(errorMessage, { entityName: this.i18n.t(`global.menu.entities.${entityKey}`) }).toString();
        } else if (!errorMessage) {
          errorMessage = this.i18n.t(httpErrorResponse.data.message).toString();
        }
        break;
      }

      case 404:
        errorMessage = this.i18n.t('error.http.404').toString();
        break;

      default:
        errorMessage = this.i18n.t(httpErrorResponse.data.message).toString();
    }
    this.showError(errorMessage);
  }
}

import { vitest } from 'vitest';
import AlertService from './alert.service';

describe('Alert Service test suite', () => {
  let translationStub: vitest.Mock;
  let toastStub: vitest.Mock;
  let alertService: AlertService;

  beforeEach(() => {
    translationStub = vitest.fn();
    toastStub = vitest.fn();
    alertService = new AlertService({
      i18n: { t: translationStub } as any,
      bvToast: {
        toast: toastStub,
      } as any,
    });
  });

  it('should show error toast with translation/message', async () => {
    const message = 'translatedMessage';

    // WHEN
    alertService.showError(message);

    // THEN
    expect(toastStub).toBeCalledTimes(1);
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });

  it('should show not reachable toast when http status = 0', async () => {
    const translationKey = 'error.server.not.reachable';
    const message = 'Server not reachable';
    const httpErrorResponse = {
      status: 0,
    };
    // GIVEN
    translationStub.mockReturnValueOnce(message);

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toBeCalledTimes(1);
    expect(translationStub).toHaveBeenCalledWith(translationKey);
    expect(toastStub).toBeCalledTimes(1);
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });

  it('should show parameterized error toast when http status = 400 and entity headers', async () => {
    const translationKey = 'error.update';
    const message = 'Updation Error';
    const httpErrorResponse = {
      status: 400,
      headers: {
        'x-jhipsterapp-error': translationKey,
        'x-jhipsterapp-params': 'dummyEntity',
      },
    };
    // GIVEN
    translationStub.mockImplementation(key => {
      if (key === translationKey) {
        return message;
      }
      if (key === 'global.menu.entities.dummyEntity') {
        return 'DummyEntity';
      }
      throw new Error();
    });

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toBeCalledTimes(2);
    expect(translationStub).toBeCalledWith(translationKey, { entityName: 'DummyEntity' });
    expect(translationStub).toBeCalledWith('global.menu.entities.dummyEntity');
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });

  it('should show error toast with data.message when http status = 400 and entity headers', async () => {
    const message = 'Validation error';
    const httpErrorResponse = {
      status: 400,
      headers: {
        'x-jhipsterapp-error400': 'error',
        'x-jhipsterapp-params400': 'dummyEntity',
      },
      data: {
        message,
        fieldErrors: {
          field1: 'error1',
        },
      },
    };

    // GIVEN
    translationStub.mockReturnValueOnce(message);

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toBeCalledTimes(1);
    expect(translationStub).toHaveBeenCalledWith(message);
    expect(toastStub).toBeCalledTimes(1);
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });

  it('should show error toast when http status = 404', async () => {
    const translationKey = 'error.http.404';
    const message = 'The page does not exist.';
    const httpErrorResponse = {
      status: 404,
    };

    // GIVEN
    translationStub.mockReturnValueOnce(message);

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toBeCalledTimes(1);
    expect(translationStub).toHaveBeenCalledWith(translationKey);
    expect(toastStub).toBeCalledTimes(1);
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });

  it('should show error toast when http status != 400,404', async () => {
    const message = 'Error 500';
    const httpErrorResponse = {
      status: 500,
      data: {
        message,
      },
    };

    // GIVEN
    translationStub.mockReturnValueOnce(message);

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toBeCalledTimes(1);
    expect(translationStub).toHaveBeenCalledWith(message);
    expect(toastStub).toBeCalledTimes(1);
    expect(toastStub).toBeCalledWith(message, {
      toaster: 'b-toaster-top-center',
      title: 'Error',
      variant: 'danger',
      solid: true,
      autoHideDelay: 5000,
    });
  });
});

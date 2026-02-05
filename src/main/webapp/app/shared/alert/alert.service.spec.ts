import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { MESSAGE_ERROR_HEADER_NAME, MESSAGE_PARAM_HEADER_NAME } from '@/shared/jhipster/constants';

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
      toast: {
        show: toastStub,
      } as any,
    });
  });

  it('should show error toast with translation/message', () => {
    const message = 'translatedMessage';

    // WHEN
    alertService.showError(message);

    // THEN
    expect(toastStub).toHaveBeenCalledExactlyOnceWith({
      props: {
        body: message,
        pos: 'top-center',
        title: 'Error',
        variant: 'danger',
        solid: true,
      },
    });
  });

  it('should show not reachable toast when http status = 0', () => {
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
    expect(translationStub).toHaveBeenCalledExactlyOnceWith(translationKey);
    expect(toastStub).toHaveBeenCalledExactlyOnceWith({
      props: {
        body: expect.any(String),
        pos: 'top-center',
        solid: true,
        title: 'Error',
        variant: 'danger',
      },
    });
  });

  it('should show parameterized error toast when http status = 400 and entity headers', () => {
    const translationKey = 'error.update';
    const message = 'Updation Error';
    const httpErrorResponse = {
      status: 400,
      headers: {
        [MESSAGE_ERROR_HEADER_NAME]: translationKey,
        [MESSAGE_PARAM_HEADER_NAME]: 'dummyEntity',
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
    expect(translationStub).toHaveBeenCalledTimes(2);
    expect(translationStub).toHaveBeenCalledWith(translationKey, { entityName: 'DummyEntity' });
    expect(translationStub).toHaveBeenCalledWith('global.menu.entities.dummyEntity');
    expect(toastStub).toHaveBeenCalledWith({
      props: {
        body: expect.any(String),
        pos: 'top-center',
        solid: true,
        title: 'Error',
        variant: 'danger',
      },
    });
  });

  it('should show error toast with data.message when http status = 400 and entity headers', () => {
    const message = 'Validation error';
    const httpErrorResponse = {
      status: 400,
      headers: {
        [`${MESSAGE_ERROR_HEADER_NAME}400`]: 'error',
        [`${MESSAGE_PARAM_HEADER_NAME}400`]: 'dummyEntity',
      },
      data: {
        message,
        fieldErrors: {
          field1: 'error1',
        },
      },
    };

    // GIVEN
    translationStub.mockReturnValueOnce('DummyEntity');
    translationStub.mockReturnValueOnce(message);

    // WHEN
    alertService.showHttpError(httpErrorResponse);

    // THEN
    expect(translationStub).toHaveBeenCalledExactlyOnceWith(message);
    expect(toastStub).toHaveBeenCalledExactlyOnceWith({
      props: {
        body: expect.any(String),
        pos: 'top-center',
        solid: true,
        title: 'Error',
        variant: 'danger',
      },
    });
  });

  it('should show error toast when http status = 404', () => {
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
    expect(translationStub).toHaveBeenCalledExactlyOnceWith(translationKey);
    expect(toastStub).toHaveBeenCalledExactlyOnceWith({
      props: {
        body: expect.any(String),
        pos: 'top-center',
        solid: true,
        title: 'Error',
        variant: 'danger',
      },
    });
  });

  it('should show error toast when http status != 400,404', () => {
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
    expect(translationStub).toHaveBeenCalledExactlyOnceWith(message);
    expect(toastStub).toHaveBeenCalledExactlyOnceWith({
      props: {
        body: expect.any(String),
        pos: 'top-center',
        solid: true,
        title: 'Error',
        variant: 'danger',
      },
    });
  });
});

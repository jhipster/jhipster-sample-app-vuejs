/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import OperationService from '@/entities/test-root/operation/operation.service';
import { Operation } from '@/shared/model/test-root/operation.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Operation Service', () => {
    let service: OperationService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new OperationService();
      currentDate = new Date();

      elemDefault = new Operation(0, currentDate, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a Operation', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Operation', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            description: 'BBBBBB',
            amount: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of Operation', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            description: 'BBBBBB',
            amount: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve({ sort: {}, page: 0, size: 10 }).then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a Operation', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });
    });
  });
});

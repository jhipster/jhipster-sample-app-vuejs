/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@/shared/date/filters';
import BankAccountMySuffixService from '@/entities/test-root/bank-account-my-suffix/bank-account-my-suffix.service';
import { BankAccountMySuffix, BankAccountType } from '@/shared/model/test-root/bank-account-my-suffix.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('BankAccountMySuffix Service', () => {
    let service: BankAccountMySuffixService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new BankAccountMySuffixService();
      currentDate = new Date();

      elemDefault = new BankAccountMySuffix(
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        currentDate,
        currentDate,
        false,
        BankAccountType.CHECKING,
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            openingDay: format(currentDate, DATE_FORMAT),
            lastOperationDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });
      it('should create a BankAccountMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            openingDay: format(currentDate, DATE_FORMAT),
            lastOperationDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            openingDay: currentDate,
            lastOperationDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        return service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a BankAccountMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            bankNumber: 1,
            agencyNumber: 1,
            lastOperationDuration: 1,
            meanOperationDuration: 1,
            balance: 1,
            openingDay: format(currentDate, DATE_FORMAT),
            lastOperationDate: format(currentDate, DATE_TIME_FORMAT),
            active: true,
            accountType: 'BBBBBB',
            attachment: 'BBBBBB',
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            openingDay: currentDate,
            lastOperationDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        return service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });
      it('should return a list of BankAccountMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            bankNumber: 1,
            agencyNumber: 1,
            lastOperationDuration: 1,
            meanOperationDuration: 1,
            balance: 1,
            openingDay: format(currentDate, DATE_FORMAT),
            lastOperationDate: format(currentDate, DATE_TIME_FORMAT),
            active: true,
            accountType: 'BBBBBB',
            attachment: 'BBBBBB',
            description: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            openingDay: currentDate,
            lastOperationDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        return service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });
      it('should delete a BankAccountMySuffix', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        return service.delete(123).then(res => {
          expect(res.ok).toBeTruthy();
        });
      });
    });
  });
});

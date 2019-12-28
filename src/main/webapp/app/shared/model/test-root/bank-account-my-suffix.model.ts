import { IOperation } from '@/shared/model/test-root/operation.model';

export const enum BankAccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  LOAN = 'LOAN'
}

export interface IBankAccountMySuffix {
  id?: number;
  name?: string;
  bankNumber?: number;
  agencyNumber?: number;
  lastOperationDuration?: number;
  meanOperationDuration?: number;
  balance?: number;
  openingDay?: Date;
  lastOperationDate?: Date;
  active?: boolean;
  accountType?: BankAccountType;
  attachmentContentType?: string;
  attachment?: any;
  description?: any;
  userLogin?: string;
  userId?: number;
  operations?: IOperation[];
}

export class BankAccountMySuffix implements IBankAccountMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public bankNumber?: number,
    public agencyNumber?: number,
    public lastOperationDuration?: number,
    public meanOperationDuration?: number,
    public balance?: number,
    public openingDay?: Date,
    public lastOperationDate?: Date,
    public active?: boolean,
    public accountType?: BankAccountType,
    public attachmentContentType?: string,
    public attachment?: any,
    public description?: any,
    public userLogin?: string,
    public userId?: number,
    public operations?: IOperation[]
  ) {
    this.active = this.active || false;
  }
}

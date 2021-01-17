import { IUser } from '@/shared/model/user.model';
import { IOperation } from '@/shared/model/test-root/operation.model';

import { BankAccountType } from '@/shared/model/enumerations/bank-account-type.model';
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
  attachment?: string;
  description?: string;
  user?: IUser;
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
    public attachment?: string,
    public description?: string,
    public user?: IUser,
    public operations?: IOperation[]
  ) {
    this.active = this.active ?? false;
  }
}

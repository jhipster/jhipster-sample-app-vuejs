import { type IUser } from '@/shared/model/user.model';

import { type BankAccountType } from '@/shared/model/enumerations/bank-account-type.model';
export interface IBankAccountMySuffix {
  id?: number;
  name?: string;
  bankNumber?: number | null;
  agencyNumber?: number | null;
  lastOperationDuration?: number | null;
  meanOperationDuration?: number | null;
  balance?: number;
  openingDay?: Date | null;
  lastOperationDate?: Date | null;
  active?: boolean | null;
  accountType?: keyof typeof BankAccountType | null;
  attachmentContentType?: string | null;
  attachment?: string | null;
  description?: string | null;
  user?: IUser | null;
}

export class BankAccountMySuffix implements IBankAccountMySuffix {
  constructor(
    public id?: number,
    public name?: string,
    public bankNumber?: number | null,
    public agencyNumber?: number | null,
    public lastOperationDuration?: number | null,
    public meanOperationDuration?: number | null,
    public balance?: number,
    public openingDay?: Date | null,
    public lastOperationDate?: Date | null,
    public active?: boolean | null,
    public accountType?: keyof typeof BankAccountType | null,
    public attachmentContentType?: string | null,
    public attachment?: string | null,
    public description?: string | null,
    public user?: IUser | null,
  ) {
    this.active = this.active ?? false;
  }
}

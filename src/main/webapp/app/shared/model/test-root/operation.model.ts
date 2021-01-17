import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import { ILabel } from '@/shared/model/test-root/label.model';

export interface IOperation {
  id?: number;
  date?: Date;
  description?: string | null;
  amount?: number;
  bankAccount?: IBankAccountMySuffix | null;
  labels?: ILabel[] | null;
}

export class Operation implements IOperation {
  constructor(
    public id?: number,
    public date?: Date,
    public description?: string | null,
    public amount?: number,
    public bankAccount?: IBankAccountMySuffix | null,
    public labels?: ILabel[] | null
  ) {}
}

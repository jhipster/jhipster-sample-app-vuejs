import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';
import { ILabel } from '@/shared/model/test-root/label.model';

export interface IOperation {
  id?: number;
  date?: Date;
  description?: string;
  amount?: number;
  bankAccount?: IBankAccountMySuffix;
  labels?: ILabel[];
}

export class Operation implements IOperation {
  constructor(
    public id?: number,
    public date?: Date,
    public description?: string,
    public amount?: number,
    public bankAccount?: IBankAccountMySuffix,
    public labels?: ILabel[]
  ) {}
}

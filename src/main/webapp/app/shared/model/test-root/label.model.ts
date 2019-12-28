import { IOperation } from '@/shared/model/test-root/operation.model';

export interface ILabel {
  id?: number;
  labelName?: string;
  operations?: IOperation[];
}

export class Label implements ILabel {
  constructor(public id?: number, public labelName?: string, public operations?: IOperation[]) {}
}

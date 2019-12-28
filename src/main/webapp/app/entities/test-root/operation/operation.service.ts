import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IOperation } from '@/shared/model/test-root/operation.model';

const baseApiUrl = 'api/operations';

export default class OperationService {
  public find(id: number): Promise<IOperation> {
    return new Promise<IOperation>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IOperation): Promise<IOperation> {
    return new Promise<IOperation>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IOperation): Promise<IOperation> {
    return new Promise<IOperation>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}

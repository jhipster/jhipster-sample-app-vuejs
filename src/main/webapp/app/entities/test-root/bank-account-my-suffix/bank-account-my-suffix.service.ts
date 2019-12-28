import axios from 'axios';

import { IBankAccountMySuffix } from '@/shared/model/test-root/bank-account-my-suffix.model';

const baseApiUrl = 'api/bank-accounts';

export default class BankAccountMySuffixService {
  public find(id: number): Promise<IBankAccountMySuffix> {
    return new Promise<IBankAccountMySuffix>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
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

  public create(entity: IBankAccountMySuffix): Promise<IBankAccountMySuffix> {
    return new Promise<IBankAccountMySuffix>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IBankAccountMySuffix): Promise<IBankAccountMySuffix> {
    return new Promise<IBankAccountMySuffix>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}

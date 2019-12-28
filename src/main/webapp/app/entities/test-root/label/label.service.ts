import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { ILabel } from '@/shared/model/test-root/label.model';

const baseApiUrl = 'api/labels';

export default class LabelService {
  public find(id: number): Promise<ILabel> {
    return new Promise<ILabel>(resolve => {
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

  public create(entity: ILabel): Promise<ILabel> {
    return new Promise<ILabel>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: ILabel): Promise<ILabel> {
    return new Promise<ILabel>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}

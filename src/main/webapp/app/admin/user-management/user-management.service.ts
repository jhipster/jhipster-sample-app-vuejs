import axios from 'axios';
import buildPaginationQueryOpts from '@/shared/sort/sorts';
import { type IUser } from '@/shared/model/user.model';

export default class UserManagementService {
  get(userId: string): Promise<any> {
    return axios.get(`api/admin/users/${userId}`);
  }

  create(user: IUser): Promise<any> {
    return axios.post('api/admin/users', user);
  }

  update(user: IUser): Promise<any> {
    return axios.put('api/admin/users', user);
  }

  remove(userId: number): Promise<any> {
    return axios.delete(`api/admin/users/${userId}`);
  }

  retrieve(req?: any): Promise<any> {
    return axios.get(`api/admin/users?${buildPaginationQueryOpts(req)}`);
  }

  retrieveAuthorities(): Promise<any> {
    return axios.get('api/authorities').then(response => {
      response.data = response.data.map(authority => authority.name);
      return response;
    });
  }
}

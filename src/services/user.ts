import { getAPIClient } from './api';

interface IGetAllUsersResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  lastLoginDate: string;
}

class UserService {
  async getAllUsers(): Promise<IGetAllUsersResponse[]> {
    const { data } = await getAPIClient().get(`/admin`);

    return data;
  }

  async store(storeData: any) {
    const { data } = await getAPIClient().post('/admin', storeData);

    return data;
  }

  async delete(userId: number) {
    await getAPIClient().delete(`/admin/${userId}`);
  }
}

export default new UserService();

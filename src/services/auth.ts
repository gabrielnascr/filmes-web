import { getAPIClient } from './api';

interface IAuthenticateDTO {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  token: string;
  loggedUser: any;
}

class AuthService {
  async authenticate({
    email,
    password,
  }: IAuthenticateDTO): Promise<IAuthenticateResponse> {
    const { data } = await getAPIClient().post('/auth/login', {
      email,
      password,
    });
    return data;
  }

  async getProfile(context?: any) {
    return await getAPIClient(context).get('/auth/profile');
  }
}

export default new AuthService();

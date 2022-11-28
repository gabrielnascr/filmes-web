import { getAPIClient } from "./api";

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
    const { data } = await getAPIClient().post('/auth/login', { email, password });
    return data;
  }

  async getProfile(context?: any) {
    const { data } = await getAPIClient(context).get('/auth/profile');

    return data;
  }
}

export default new AuthService();

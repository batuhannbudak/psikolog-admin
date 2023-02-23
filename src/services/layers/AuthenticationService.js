import AxiosClient from '../AxiosClient';
import { BASE_URL } from '../../constants/apiUrls';

export default class AuthenticationService {
  static login(body) {
    return AxiosClient.post(`${BASE_URL}login`, body);
  }

  static checkAuthentication() {
    return AxiosClient.get(`${BASE_URL}auth`);
  }
}

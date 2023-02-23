import AxiosClient from '../AxiosClient';
import { BASE_URL } from '../../constants/apiUrls';

export default class ClientService {
  static getClientList(params) {
    return AxiosClient.get(`${BASE_URL}clients`, params);
  }
}

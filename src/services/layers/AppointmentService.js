import AxiosClient from '../AxiosClient';
import { BASE_URL } from '../../constants/apiUrls';

export default class ClientService {
  static getAppointments(params) {
    return AxiosClient.get(`${BASE_URL}therapist-appointments`, params);
  }
}

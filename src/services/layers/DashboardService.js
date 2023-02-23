import AxiosClient from '../AxiosClient';
import { BASE_URL } from '../../constants/apiUrls';

export default class DashboardService {
  static getStatistics(params = {}) {
    return AxiosClient.get(`${BASE_URL}stats`, params);
  }
}

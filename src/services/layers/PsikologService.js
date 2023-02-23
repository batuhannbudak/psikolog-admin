import AxiosClient from '../AxiosClient';
import { BASE_URL } from '../../constants/apiUrls';

export default class PsikologService {
  static getPsikologList(params) {
    return AxiosClient.get(`${BASE_URL}therapists`, params);
  }
}

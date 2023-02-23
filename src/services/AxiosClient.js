import axios from 'axios';

export const client = axios.create({
  withCredentials: true,
  credentials: 'include',
  origin: "https://atakann.com",
  dataType: "JSON",
  headers: {
    'Content-Type': 'application/json'
  }
});

export default class AxiosClient {
  static head(path) {
    return client.head(path);
  }

  static get(path, params = {}) {
    return client.get(path, {
      params
    });
  }

  static post(path, data = {}) {
    return client.post(path, data);
  }

  static put(path, data = {}, headers = {}) {
    return client.put(path, data, {
      headers
    });
  }

  static delete(path, data = {}, headers = {}) {
    return client.delete(path, {
      data,
      headers
    });
  }

  static setHeader(key, value) {
    client.defaults.headers[key] = value;
  }
}

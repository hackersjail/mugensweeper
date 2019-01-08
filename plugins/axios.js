import { URLSearchParams } from 'universal-url';

export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    /* eslint-disable no-param-reassign */
    config.url = `${config.baseURL}${config.url}`;
    if (typeof config.data === 'object') {
      const params = new URLSearchParams();
      Object.keys(config.data).forEach((key) => params.append(key, config.data[key]));
      config.data = params.toString();
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (store.state.token) config.headers.Authorization = store.state.token;
  });
};

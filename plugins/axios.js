import { URLSearchParams } from 'universal-url';

export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    /* eslint-disable no-param-reassign */
    config.url = `http://localhost:10000/dev${config.url}`; // ToDo:ドメインやディレクトリ構成確定後、ハードコーディング部分修正実施
    if (typeof config.data === 'object') {
      const params = new URLSearchParams();
      Object.keys(config.data).forEach((key) => params.append(key, config.data[key]));
      config.data = params.toString();
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (store.state.token) config.headers.Authorization = store.state.token;
  });
};

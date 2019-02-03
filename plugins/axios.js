import { URLSearchParams } from 'universal-url';

export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    /* eslint-disable no-param-reassign */
    if (typeof config.data === 'object') {
      const params = new URLSearchParams();
      Object.keys(config.data).forEach((key) => params.append(key, config.data[key]));
      config.data = params.toString();
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (store.state.token) config.headers.Authorization = `Bearer ${store.state.token}`;
  });

  $axios.onResponseError((err) => {
    if (err.response.status === 401) {
      store.commit('clearAccessToken');
      window.location.reload();
    }
  });
};

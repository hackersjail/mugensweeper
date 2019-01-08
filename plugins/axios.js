export default ({ $axios, store }) => {
  $axios.onRequest((config) => {
    /* eslint-disable no-param-reassign */
    if (store.state.token) config.headers.Authorization = store.state.token;
  });
};

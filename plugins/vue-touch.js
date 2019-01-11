import Vue from 'vue';

const VueTouch = require('vue-touch');

export default () => {
  Vue.use(VueTouch, { name: 'v-touch' });
};

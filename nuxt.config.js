const pkg = require('./package');
require('dotenv').config();

const { AXIOS_BASE, NODE_ENV } = process.env;

module.exports = {
  mode: 'spa',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: false,
  css: [],
  plugins: ['@/plugins/axios', '@/plugins/window-state', '@/plugins/vue-touch'],
  modules: ['@nuxtjs/axios'],
  axios: { baseURL: NODE_ENV !== 'test' && AXIOS_BASE ? AXIOS_BASE : 'http://localhost:10000/v1' },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};

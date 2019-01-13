import Vue from 'vue';

export default () => {
  const windowStatePlugin = {
    install() {
      // ウィンドウの状態
      const state = {
        width: 0,
        height: 0,
      };
      // ウィンドウのサイズを取得
      const onResize = () => {
        state.width = document.documentElement.clientWidth;
        state.height = document.documentElement.clientHeight;
      };
      window.addEventListener('resize', onResize);
      onResize();

      // プロパティ $window を定義
      Vue.util.defineReactive(Vue.prototype, '$window', state);
    },
  };

  Vue.use(windowStatePlugin);
};

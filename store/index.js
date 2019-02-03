const USER_KEY_NAME = 'msweeP';
const DEFAULT_GRID_WIDTH = 40;
const GRID_WIDTH_MIN = 5;
const GRID_WIDTH_MAX = 150;
const GRID_WIDTH_STEP = 5;

export const state = () => ({
  userName: null,
  userId: null,
  token: null,
  blocks: null,
  gridWidth: DEFAULT_GRID_WIDTH,
  pointData: null,
  moveDist: { x: 0, y: 0 }, // 原点の移動量
  swipeInit: { x: 0, y: 0 }, // swipe基準点
  dragInit: { x: 0, y: 0 }, // drag基準点
  downFlg: false, // mousedownもしくはtouchdownされたか
  dragFlg: false,
  windowSize: { width: 0, height: 0 },
});

export const plugins = [
  (store) => {
    if (process.env.NODE_ENV === 'test') return;
    const localData = localStorage.getItem(USER_KEY_NAME);
    if (localData) {
      store.commit('setAccessToken', JSON.parse(localData));
    }

    store.subscribe((mutation) => {
      if (mutation.type !== 'setAccessToken') return; // setAccessTokenの発火時のみ起動
      localStorage.setItem(USER_KEY_NAME, JSON.stringify(mutation.payload));
    });
  },
  (store) => {
    const onResize = () => {
      store.commit('setWindowSize', {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    window.addEventListener('resize', onResize);
    onResize();
  },
];

export const getters = {
  gridX(state) {
    return Math.ceil(state.windowSize.width / state.gridWidth);
  },
  gridY(state) {
    return Math.ceil(state.windowSize.height / state.gridWidth);
  },
  centerPos(state) {
    return {
      x: state.windowSize.width / 2,
      y: state.windowSize.height / 2,
    };
  },
};

export const mutations = {
  setAccessToken(state, { token, userId, userName }) {
    state.token = token;
    state.userId = userId;
    state.userName = userName;
  },
  clearAccessToken() {
    localStorage.removeItem(USER_KEY_NAME);
  },
  setPoint(state, pointData) {
    state.pointData = pointData;
  },
  setField(state, blocks) {
    state.blocks = blocks;
  },
  setInitPos(state, position) {
    // 基準地点設定
    state.downFlg = true;
    state.dragInit = position;
    state.swipeInit = state.moveDist;
  },
  gridMove(state, position) {
    if (!state.downFlg) return;
    state.dragFlg = true;
    const requestHalf = {
      x: state.swipeInit.x - (position.x - state.dragInit.x),
      y: state.swipeInit.y + (position.y - state.dragInit.y),
    };
    state.moveDist = requestHalf;
  },
  resetInitPos(state) {
    // touchend
    state.dragFlg = false;
    state.downFlg = false;
  },
  changeGridWidth(state, direction) {
    state.gridWidth = Math.max(
      GRID_WIDTH_MIN,
      Math.min(GRID_WIDTH_MAX, state.gridWidth + direction * GRID_WIDTH_STEP),
    );
  },
  setWindowSize(state, size) {
    state.windowSize = {
      ...state.windowSize,
      ...size,
    };
  },
};

export const actions = {
  async getAccessToken({ commit, state }, userName) {
    if (!state.token) {
      const userData = await this.$axios.$post('/user', { userName });
      commit('setAccessToken', userData);
    }
  },
  async getPoint({ commit }) {
    const pointData = await this.$axios.$get('/point');
    commit('setPoint', pointData);
  },
  async getField({ commit }) {
    const fieldData = await this.$axios.$get('/field');
    commit('setField', fieldData);
  },
  async postField({ dispatch }, { x, y, isRequestToOpen }) {
    const isAdded = await this.$axios.$post('/field', {
      x,
      y,
      isRequestToOpen,
    });
    if (isAdded) {
      await dispatch('getField');
    }
  },
};

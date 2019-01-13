const USER_KEY_NAME = 'msweeP';
const DEFAULT_GRID_X = 48;

export const state = () => ({
  userName: null,
  userId: null,
  token: null,
  blocks: null,
  gridX: DEFAULT_GRID_X,
  rankedUsers: [
    { userId: 1, userName: 'mishima', userScore: 123 },
    { userId: 2, userName: 'shiratsuchi', userScore: 124 },
    { userId: 3, userName: 'miyamoto', userScore: 125 },
    { userId: 4, userName: 'ryoko', userScore: 126 },
    { userId: 5, userName: 'hiroshima', userScore: 127 },
    { userId: 6, userName: 'etoh', userScore: 128 },
    { userId: 7, userName: 'matsuda', userScore: 129 },
  ],
  moveDist: { x: 0, y: 0 }, // 原点の移動量
  swipeInit: { x: 0, y: 0 }, // swipe基準点
  dragInit: { x: 0, y: 0 }, // drag基準点
  downFlg: false, // mousedownもしくはtouchdownされたか
  dragFlg: false,
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
];

export const mutations = {
  setAccessToken(state, { token, userId, userName }) {
    state.token = token;
    state.userId = userId;
    state.userName = userName;
  },
  setField(state, blocks) {
    state.blocks = blocks;
  },
  setInitPos(state, position) {
    // 基準地点設定
    state.downFlg = true;
    // state.dragFlg = true;
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
};

export const actions = {
  async getAccessToken({ commit, state }, userName) {
    if (!state.token) {
      const userData = await this.$axios.$post('/user_id_generate', { userName });
      commit('setAccessToken', userData);
    }
  },
  async getField({ commit }) {
    const fieldData = await this.$axios.$get('/field/temp');
    commit('setField', fieldData);
  },
  async postField({ state, dispatch }, block) {
    const isAdded = await this.$axios.$post('/field', {
      x: block.x,
      y: block.y,
      userId: state.userId,
    });
    if (isAdded) {
      await dispatch('getField');
    }
  },
};

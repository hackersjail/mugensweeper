const USER_KEY_NAME = 'msweeP';
const DEFAULT_GRID_X = 48;

export const state = () => ({
  userName: null,
  userId: null,
  token: null,
  blocks: null,
  gridX: DEFAULT_GRID_X,
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
      localStorage.setItem(USER_KEY_NAME, JSON.stringify(mutation.payload.token));
    });
  },
];

export const mutations = {
  setAccessToken(state, { token, userId, userName }) {
    state.token = token;
    state.userId = userId;
    state.userName = userName;
  },
  setField(state, [...blocks]) {
    state.blocks = blocks;
  },
  setInitPos(state, position) {
    // 基準地点設定
    state.dragFlg = true;
    state.dragInit = position;
    state.swipeInit.x = state.moveDist.x;
    state.swipeInit.y = state.moveDist.y;
  },
};

export const actions = {
  async getAccessToken({ commit, state }, userName) {
    if (!state.token) {
      const userData = await this.$axios.$post('/user_id_generate', { userName });
      commit('setAccessToken', userData);
    }
  },
  async getField({ state, commit }) {
    if (state.token) {
      const fieldData = await this.$axios.$get('/field');
      commit('setField', fieldData);
    }
  },
};

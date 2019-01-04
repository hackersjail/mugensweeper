const USER_KEY_NAME = 'msweeP';
const DEFAULT_GRID_X = 48;

export const state = () => ({
  userName: null,
  userId: null,
  token: null,
  blocks: null,
  gridX: DEFAULT_GRID_X,
  // 盤面が現表示領域のみであれば1、画面スクロール可能にして無限に盤面が続いているように見せるには2に変更
  infinitLine: 1,
  rankedUsers: [
    { userId: 1, userName: 'mishima', userScore: 123 },
    { userId: 2, userName: 'shiratsuchi', userScore: 124 },
    { userId: 3, userName: 'miyamoto', userScore: 125 },
    { userId: 4, userName: 'ryoko', userScore: 126 },
    { userId: 5, userName: 'hiroshima', userScore: 127 },
    { userId: 6, userName: 'etoh', userScore: 128 },
    { userId: 7, userName: 'matsuda', userScore: 129 },
  ],
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
};

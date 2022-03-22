import { CHANGE_SAMPLE } from '../mutation-types';

// 샘플별 필요한 내용들 공통으로 처리하기 위한 구간.
export const Page = {
  state: () => ({name: '', tag:''}),
  mutations: {
    [CHANGE_SAMPLE.CHANGE_SAMPLE](state, value) {
      state.name = value;
    },
    [CHANGE_SAMPLE.CHANGE_TEMP] () {

    }
  },
  getters: {
    // state 에 담긴 name 기준으로 샘플 분리.
    pageInfo(state) {
      return state.name;
    }
  },
  actions: {
    changeName({ commit }, value) {
      commit(CHANGE_SAMPLE.CHANGE_SAMPLE, value);
    },
  }
};
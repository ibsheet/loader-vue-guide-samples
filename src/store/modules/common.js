import { CHANGE_SAMPLE } from '../mutation-types';

import { setData } from '../../samples/dataload'


export const Page = {
  // state에 시트에 필요한 정보를 담아둠.
  state: () => ({name: '', dataload:setData, getData:{}}),
  mutations: {
    [CHANGE_SAMPLE.CHANGE_SAMPLE](state, value) {
      state.name = value;
    },
    [CHANGE_SAMPLE.CHANGE_DATA](state, cnt) {
      state.getData = state.dataload(cnt);
    }
  },
  getters: {
    //state 에 담긴 name 기준으로 샘플 분리.
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
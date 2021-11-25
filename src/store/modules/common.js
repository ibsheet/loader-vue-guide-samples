import { CHANGE_SAMPLE } from '../mutation-types';
import { dataFunction } from '../../samples/dataload/fun'
import { Function } from '../../samples/merge/function'

export const Page = {
  // state에 시트에 필요한 정보를 담아둠.
  state: () => ({name: '', data_load:dataFunction, merge:Function, tag:''}),
  mutations: {
    [CHANGE_SAMPLE.CHANGE_SAMPLE](state, value) {
      state.name = value;
    },
    [CHANGE_SAMPLE.CHANGE_TEMP] (state, value) {
      switch(value) {
        case "Merge" :
          state.tag = state.merge();
          break;
        case "DataLoad" :
          state.tag = state.data_load();
          break;
      }
      console.warn(state.tag);
      return state.tag;
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
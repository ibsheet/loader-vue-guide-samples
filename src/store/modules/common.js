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
      switch (state.name) {
        case "SubSum" :
          return state.subsum;
        case "Type" : 
          return state.text;
        case "Tree" : 
          return state.tree;
        case "Merge" : 
          return state.merge;
        case "Formula" : 
          return state.formula;
        case "Multiple" : 
          return state.multiple;
        case "Dialog" : 
          return state.dialog;
        case "DataLoad" : 
          // console.log(state.dataload(100));
          return state.getData;
        case "Form" : 
          return state.dialog;
      }
    }
  },
  actions: {
    changeName({ commit }, value) {
      commit(CHANGE_SAMPLE.CHANGE_SAMPLE, value);
    },
  }
};
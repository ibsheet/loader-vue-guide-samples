import { CHANGE_SAMPLE } from '../mutation-types';
import { TextData } from '../../samples/text'
// import { SheetSampleData } from '../../samples/test'
import { SubSumData } from '../../samples/subsum'
// const { data, options } = TextData


export const Page = {
  // state에 시트에 필요한 정보를 담아둠.
  state: () => ({name: '', subsum:SubSumData, text:TextData}),
  mutations: {
    [CHANGE_SAMPLE.CHANGE_SAMPLE](state, value) {
      state.name = value;
      // this.SubSumData
    }
  },
  getters: {
    //state 에 담긴 name 기준으로 샘플 분리.
    pageInfo(state) {
      switch (state.name) {
        case "SubSum" :
          return state.subsum;
        case "TextType" : 
          return state.text;
      }
    }
  },
  actions: {
    changeName({ commit }, value) {
      commit(CHANGE_SAMPLE.CHANGE_SAMPLE, value);
    },
  }
};
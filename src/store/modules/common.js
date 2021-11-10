import { CHANGE_SAMPLE } from '../mutation-types';
// import { TextData } from '../../samples/text'
import { SubSumData } from '../../samples/subsum'
// const { data, options } = TextData


export const Page = {
  state: () => ({name: 'test'}),
  mutations: {
    [CHANGE_SAMPLE.CHANGE_SAMPLE](state, value) {
      state.name = value;
      // this.SubSumData
    }
  },
  getters: {
    pagenInfo() {
      return SubSumData;
    }
  },
  actions: {
    changeName({ commit }, value) {
      commit(CHANGE_SAMPLE.CHANGE_SAMPLE, value);
    },
  }
};
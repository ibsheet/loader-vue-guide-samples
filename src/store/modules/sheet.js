import { CREATE_SHEET } from '../mutation-types';
import { REMOVE_SAMPLE } from '../mutation-types';
import loader from '@ibsheet/loader'
// import { SheetSampleData } from '../../samples/text'
// const { data, options } = SheetSampleData[1]

export const Sheet = {
  state: () => ({tag_id:'', sheet_id: '', data: '', options:''}),
  mutations: {
    [CREATE_SHEET.CREATE_SHEET](state, sheetData) {
      const {data, options} = sheetData["pageInfo"];
      loader.createSheet({
        // el: 'sheetContainer',
        el: state.tag_id,
        options,
        data
      }).then((sheet) => {
        state.sheet_id = sheet.id;
      });
    },
    [REMOVE_SAMPLE.REMOVE_SAMPLE](state, id) {
      loader.removeSheet(id)
    },
    [CREATE_SHEET.CHANGE_SHEETDIV](state, tagId) {
      state.tag_id = tagId;
    }
  },
  getters: {
    sheetnInfo(state) {
      return `시트 이름 : ${state.sheet_id}`;
    }
  },
  actions: {
    changeName({ commit }, options, value) {
      commit(CREATE_SHEET.CREATE_SHEET, options,value);
    },
  }
};
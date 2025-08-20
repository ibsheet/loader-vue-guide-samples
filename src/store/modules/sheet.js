import { CREATE_SHEET } from "../mutation-types";
import { REMOVE_SAMPLE } from "../mutation-types";
import { CHANGE_SAMPLE } from "../mutation-types";
// 각 샘플별 옵션/데이터 import는 유지
import { MultipleOptions } from '../../samples/multiple/info'
import { MultipleData } from '../../samples/multiple/data'
import { DialogOption } from '../../samples/dialog/info'
import { ModalOption } from '../../samples/dialog/QuasarModal/info'
import { DialogData } from '../../samples/dialog/data'
import { FormOption } from '../../samples/form/info'
import { FormData } from '../../samples/form/data'
import { TypeOption } from '../../samples/type/info'
import { TypeData } from '../../samples/type/data'
import { MergeOption } from '../../samples/merge/info'
import { MergeData } from '../../samples/merge/data'
import { TreeOption } from '../../samples/tree/info'
import { TreeData } from '../../samples/tree/data'
import { SubSumOption } from '../../samples/subsum/info'
import { SubSumData } from '../../samples/subsum/data'
import { FormulaOption } from '../../samples/formula/info'
import { FormulaData } from '../../samples/formula/data'
import { DataLoadOption } from '../../samples/dataload/info'
import { set_data } from '../../samples/dataload/data'

const flattenData = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    if (raw.length === 1 && raw[0] && Array.isArray(raw[0].data)) {
      return raw[0].data.slice();
    }
    if (!raw[0] || typeof raw[0] !== 'object' || !('data' in raw[0])) {
      return raw.slice();
    }
  }
  return [];
};

export const Sheet = {
  namespaced: true,
  state: () => ({
    options: [],
    data: [],
    multiData: [],
    setting_data: set_data // DataLoad 등 일부 샘플에서 필요
  }),
  mutations: {
    [CREATE_SHEET.CREATE_SHEET](state, obj) {
      switch (obj.pageName || obj) {
        case "SubSum":
          state.options = SubSumOption;
          state.data = flattenData(SubSumData);
          break;
        case "Type":
          state.options = TypeOption;
          state.data = flattenData(TypeData);
          break;
        case "Tree":
          state.options = TreeOption;
          state.data = flattenData(TreeData);
          break;
        case "Merge":
          state.options = MergeOption;
          state.data = flattenData(MergeData);
          break;
        case "Formula":
          state.options = FormulaOption;
          state.data = flattenData(FormulaData);
          break;
        case "Multiple":
          state.options = MultipleOptions;
          state.multiData = MultipleData
            .filter(d => d && Array.isArray(d.data))
            .map(d => d.data.map(r => ({ ...r })));  // 깊은 복사
          // 단일 sheetData 는 첫 시트 기준(필요 없다면 빈 배열 유지)
          state.data = state.multiData[0] ? state.multiData[0] : [];
          break;
        case "Dialog":
          state.options = DialogOption;
          state.data = flattenData(DialogData);
          break;
        case "DataLoad":
          state.options = DataLoadOption;
          state.data = [{ data: state.setting_data(obj.opt) }];
          break;
        case "Form":
          state.options = FormOption;
          state.data = flattenData(FormData);
          break;
        case "ModalOpen":
          state.options = ModalOption;
          state.data = flattenData(TypeData);
          break;
      }

      if (obj.pageName == 'Multiple' || obj == 'Multiple') state.multiData = [];
    },
    [REMOVE_SAMPLE.REMOVE_SAMPLE](state) {
      // 시트 삭제는 필요 없음, 단순 옵션/데이터 초기화만
      state.options = [];
      state.data = [];
      state.multiData = [];
    },
    [CHANGE_SAMPLE.CHANGE_DATA](state, cnt) {
      state.data = state.setting_data(cnt);
    },
  },
  getters: {
    sheetOptions: (s) => s.options,
    sheetData:    (s) => s.data,
    sheetMultiData: (s) => s.multiData
  },
  actions: {},
};
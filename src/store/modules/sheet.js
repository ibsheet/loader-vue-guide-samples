import { CREATE_SHEET } from '../mutation-types';
import { REMOVE_SAMPLE } from '../mutation-types';
import { CHANGE_SAMPLE } from '../mutation-types';

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

import loader from '@ibsheet/loader'

// import { SheetSampleData } from '../../samples/text'
// const { data, options } = SheetSampleData[1]

export const Sheet = {
  state: () => ({sheet:[], data: [], options:[], setting_data:set_data}),
  mutations: {
    
    [CREATE_SHEET.CREATE_SHEET](state, pageName) {
      switch (pageName) {
        case "SubSum" :
          state.options = SubSumOption;
          state.data = SubSumData;
          break;
        case "Type" : 
          state.options = TypeOption;
          state.data = TypeData;
          break;
        case "Tree" : 
          state.options = TreeOption;
          state.data = TreeData;
          break;
        case "Merge" : 
          state.options = MergeOption;
          state.data = MergeData;
          break;
        case "Formula" : 
          state.options = FormulaOption;
          state.data = FormulaData;
          break;
        case "Multiple" : 
            state.options = MultipleOptions;
            state.data = MultipleData;
          break;
        case "Dialog" : 
          state.options = DialogOption;
          state.data = DialogData;
          break;
        case "DataLoad" : 
          state.options = DataLoadOption;
          // state.data = [{data:state.data}];
          break;
        case "Form" : 
          state.options = FormOption;
          state.data = FormData;
          break;
        case "ModalOpen" : 
          state.options = ModalOption;
          state.data = TypeData;
          break;
      }

      const eventBinding = (name, sheet) => {
        switch(name) {
          case 'Type':
          case 'Formula':
          case 'Merge':
          case 'Tree':
          case 'SubSum':
          case 'Multiple':
          case 'Dialog':
          case 'DataLoad':
          case 'Form':
            sheet.options.Events = {
              onRenderFirstFinish: evt => {
                if (state.data.length > 0) {
                  state.data.map(sheetData =>{
                    evt.sheet.loadSearchData(sheetData);
                  })
                }
              }
            }
            return sheet;
        }
      };

      if (state.options.length > 0) {
        state.options.map((sheet, idx) => {
          eventBinding(pageName, sheet);
          loader.createSheet({
            id: sheet.id ? sheet.id : 'sheet' + idx,
            el: sheet.el,
            options : sheet.options ,
            // data : sheet.data
          }).then((sheet) => {
            state.sheet.push(sheet);
          });
        });
      }

    },
    [REMOVE_SAMPLE.REMOVE_SAMPLE](state, sObj) {
      if (sObj.length > 0 && typeof(sObj) != 'string') {
        sObj.map(sheetObj => {
          loader.removeSheet(sheetObj.id)
        })
        state.sheet = [];
      } else {
        loader.removeSheet(sObj);
      }
    },
    [CREATE_SHEET.CHANGE_SHEETDIV](state, tagId) {
      state.tag_id = tagId;
    },
    [CHANGE_SAMPLE.CHANGE_DATA](state, cnt) {
      state.data = state.setting_data(cnt);
    }
  },
  getters: {
    sheetnInfo(state) {
      return state.sheet;
    }
  },
  actions: {

  }
};
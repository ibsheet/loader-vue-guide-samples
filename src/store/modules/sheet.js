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


// 시트 생성 및 각 샘플별 필요한 생성옵션 및 데이터 생성 구간.
export const Sheet = {
  state: () => ({sheet:[], data: [], options:[], setting_data:set_data}),
  mutations: {
    
    //시트 생성 옵션을 객체로 처리하도록 변경. 시트 생성시 필요한 옵션이 있는 경우 옵션으로 처리하기 위함.
    [CREATE_SHEET.CREATE_SHEET](state, obj) {
      
      switch (obj.pageName) {
        case 'SubSum' :
          state.options = SubSumOption;
          state.data = SubSumData;
          break;
        case 'Type' :
          state.options = TypeOption;
          state.data = TypeData;
          break;
        case 'Tree' :
          state.options = TreeOption;
          state.data = TreeData;
          break;
        case 'Merge' :
          state.options = MergeOption;
          state.data = MergeData;
          break;
        case 'Formula' :
          state.options = FormulaOption;
          state.data = FormulaData;
          break;
        case 'Multiple' :
            state.options = MultipleOptions;
            state.data = MultipleData;
          break;
        case 'Dialog' :
          state.options = DialogOption;
          state.data = DialogData;
          break;
        case 'DataLoad' :
          state.options = DataLoadOption;
          state.data = [{data:state.setting_data(obj.opt)}];
          break;
        case 'Form' :
          state.options = FormOption;
          state.data = FormData;
          break;
        case 'ModalOpen' :
          state.options = ModalOption;
          state.data = TypeData;
          break;
      }
      // 렌더 후 조회.
      const eventBinding = (name, sheet) => {
        switch(name) {
          case 'Form':
            // 폼 태그에서 input 에 필요한 정보 세팅.
            sheet.options.Events = {
              onRenderFirstFinish: evt => {
                if (state.data.length > 0) {
                  state.data.map(sheetData =>{
                    evt.sheet.loadSearchData(sheetData);
                  })
                }
              },
              onFocus: evt => {
                document.getElementsByName('sName')[0].value = evt.row['sName'];
                document.getElementsByName('sAge')[0].value = evt.row['sAge'];
                document.getElementsByName('sPosi')[0].value = evt.row['sPosi'];
                document.getElementsByName('sPrice')[0].value = evt.row['sPrice'];
                document.getElementsByName('sDepart')[0].value = evt.row['sDepart'];
              },
              onBlur: () => {
                document.getElementsByName()[0].value = '';
                document.getElementsByName()[0].value = '';
                document.getElementsByName()[0].value = '';
                document.getElementsByName()[0].value = '';
                document.getElementsByName()[0].value = '';
              }
            }
            return sheet;
          case 'Type':
          case 'Formula':
          case 'Merge':
          case 'Tree':
          case 'SubSum':
          case 'Multiple':
          case 'Dialog':
          case 'DataLoad':
          case 'ModalOpen':
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
          eventBinding(obj.pageName, sheet);
          loader.createSheet({
            id: sheet.id ? sheet.id : 'sheet' + (state.options.length > 1 ? (idx + 1) : ''),
            el: sheet.el,
            options : sheet.options ,
          }).then(sheet => {
            // 주의: 해당 구간에서 데이터 조회를 하면 안됩니다. 데이터 조회는 onRenderFirstFinish 이벤트에서 실행해야합니다.
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
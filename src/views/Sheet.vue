<template>
  <div class="sheet-page">
    <!-- 설명 -->
    <div v-if="currentDesc" class="q-mb-md">
      <div class="text-h6 text-weight-bold">{{ currentDesc.title }}</div>
      <div class="text-subtitle2">{{ currentDesc.desc }}</div>
    </div>

    <!-- Dialog 버튼 -->
    <q-btn
      v-if="pageName === 'Dialog'"
      label="Show Dialog"
      color="secondary"
      class="q-mb-md"
      @click="openDialog"
    />

    <!-- 옵션 Select -->
    <div v-if="showSelect" class="q-pa-sm q-mb-sm bg-grey-2 rounded-borders">
      <div class="q-gutter-md row no-wrap items-center">
        <q-select
          v-model="model"
          label="Option 1"
          :options="selectValues.model"
          style="width:200px"
          @update:model-value="(opt) => onSelectChange(opt, model2, model3)"
        />
        <q-select
          v-if="pageName === 'Merge'"
          v-model="model2"
          label="Option 2"
          :options="selectValues.model2"
          style="width:200px"
          @update:model-value="(opt) => onSelectChange(model, opt, model3)"
        />
        <q-select
          v-if="pageName === 'Merge'"
          v-model="model3"
          label="Option 3"
          :options="selectValues.model3"
          style="width:200px"
          @update:model-value="(opt) => onSelectChange(model, model2, opt)"
        />
      </div>
    </div>

    <!-- 시트 영역 -->
    <div
      class="row no-wrap"
      :style="{ width: '100%', display: pageName !== 'Form' ? 'block' : undefined }"
    >
      <!-- 단일 -->
      <IBSheetVue
        v-if="!isMultiple && firstSheet"
        :options="firstSheet"
        :data="sheetRows"
        style="min-width:400px;height:600px;display:block"
        @instance="getInstance"
      />

      <!-- Form 상세 -->
      <q-card
        v-if="pageName === 'Form'"
        class="q-ml-md"
        style="min-width:300px;max-width:350px;padding:10px;"
      >
        <div class="text-h5 text-center q-mb-md">상세 보기</div>
        <q-form class="q-gutter-md" @submit="submitForm" @reset="resetForm">
          <input name="sName"   class="q-field__input form-input" placeholder="Name" />
          <input name="sAge"    class="q-field__input form-input" placeholder="Age" />
          <input name="sPosi"   class="q-field__input form-input" placeholder="Position" />
          <input name="sPrice"  class="q-field__input form-input" placeholder="Price" />
          <input name="sDepart" class="q-field__input form-input" placeholder="Department" />
          <div class="q-mt-sm">
            <q-btn label="수정" type="submit" color="secondary" />
            <q-btn label="삭제" type="reset" color="secondary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>

      <!-- Multiple -->
      <div
        v-if="isMultiple && normalizedSheets.length"
        class="row q-gutter-sm q-ml-sm"
        style="flex-wrap:wrap;"
      >
        <IBSheetVue
          v-for="(cfg, idx) in normalizedSheets"
          :key="cfg.id"
          :options="cfg.options"
          :data="multiDataSafe[idx]"
          style="min-width:300px;width:33%;height:520px;"
          @instance="getInstance"
        />
      </div>
    </div>

    <!-- Dialog -->
    <q-dialog v-model="dialogOpen" @show="prepareModalSheet">
      <q-card style="width:700px;max-width:90vw;">
        <q-card-section>
          <div class="text-h6">Dialog Sheet</div>
        </q-card-section>
        <div style="height:420px;">
          <IBSheetVue
            v-if="modalSheet"
            :options="modalSheet"
            :data="modalSheetData"
            style="width:100%;height:400px;display:block"
          />
        </div>
        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref, onMounted, watch, shallowRef } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { IBSheetVue } from '@ibsheet/vue';
import { getItemList, changeOpt } from '@/store/modules/function';
import loader from '@ibsheet/loader';

import { ModalOption } from '@/samples/dialog/QuasarModal/info'
import { TypeData } from '@/samples/type/data'

export default {
  name: 'Sheet',
  components: { IBSheetVue },
  setup() {
    const store = useStore();
    const route = useRoute();

    const pageName = computed(() => store.state.Page?.name || route.name || '');

    const sheetOptions = computed(() => store.getters['Sheet/sheetOptions'] || []);
    const sheetData    = computed(() => store.getters['Sheet/sheetData'] || []);
    const multiData    = computed(() => store.getters['Sheet/sheetMultiData'] || []);

    const sheetRows = computed(() => {
      const v = sheetData.value;
      if (!Array.isArray(v)) return [];
      if (v.length === 1 && v[0] && Array.isArray(v[0].data)) {
        return v[0].data;
      }
      if (!v[0] || typeof v[0] !== 'object' || !('data' in v[0])) {
        return v;
      }
      return [];
    });

    const multiDataSafe = computed(() => {
      const raw = multiData.value;
      if (!Array.isArray(raw)) return [];
      return raw.map(block => {
        if (Array.isArray(block)) return block;
        if (block && Array.isArray(block.data)) return block.data;
        return [];
      });
    });

    const normalizedSheets = computed(() => {
      const raw = sheetOptions.value;
      return raw
        .map((item, i) => {
          if (!item) return null;
          if (item.Cols) {
            return { id: item.Id || `sheet_${i}`, options: item };
          }
          if (item.options?.Cols) {
            return { id: item.id || item.options.Id || `sheet_${i}`, options: item.options };
          }
          if (item.options?.options?.Cols) {
            return { id: item.id || item.options.options.Id || `sheet_${i}`, options: item.options.options };
          }
          console.warn('[normalize] Unrecognized option shape', item);
          return null;
        })
        .filter(Boolean);
    });

    const firstSheet = computed(() => normalizedSheets.value[0]?.options || null);

    const isMultiple = computed(() => pageName.value === 'Multiple');

    // Dialog
    const dialogOpen = ref(false);
    const modalSheet = ref(null);
    const modalSheetData = ref([]);

    function extractRows(raw) {
      if (Array.isArray(raw) &&
          raw.length === 1 &&
          raw[0]?.data &&
          Array.isArray(raw[0].data)) {
        return raw[0].data;
      }
      if (Array.isArray(raw) && raw.length && !('data' in raw[0])) return raw;
      return [];
    }

    function deepClone(obj) {
      if (obj === null || typeof obj !== 'object') return obj;
      if (Array.isArray(obj)) return obj.map(deepClone);
      const out = {};
      for (const k in obj) out[k] = deepClone(obj[k]);
      return out;
    }

    function prepareModalSheet() {
      const baseOpt = Array.isArray(ModalOption) ? ModalOption[0] : ModalOption;
      modalSheet.value = deepClone(baseOpt['options']);
      modalSheetData.value = extractRows(TypeData).map(r => ({ ...r }));
    }

    // 설명
    const sampleDesc = {
      Type : {title:'컬럼 별 타입', desc:'각 컬럼별 설정 가능한 Type에 대한 예제입니다.'},
      Merge : {title:'자동 머지 기능', desc:'헤더, 데이터 영역의 각 셀들의 값이 같은 경우 자동으로 병합시킬 수 있습니다.'},
      Tree : {title:'트리 예제', desc:'트리 관련 예제 입니다. 지정한 레벨만큼 트리를 접거나 펼칠 수 있습니다.'},
      DataLoad : {title:'대용량 조회', desc:'IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.'},
      SubSum : {title:'소계 기능', desc:'특정 컬럼을 기준으로, 지정한 컬럼들에 대한 소계 값을 보여주는 기능입니다.'},
      Formula : {title:'포뮬러 기능', desc:'포뮬러를 이용하여 자동값 계산 또는 속성을 설정할 수 있습니다.'},
      Form : {title:'Form 형태를 이용한 상세보기', desc:'시트와 form 간의 연동을 통해 행 선택시 내용을 form 에서 확인하고 form 의 내용을 수정하여 시트의 반영할 수 있습니다.'},
      Multiple : {title:'여러 개의 시트', desc:`여러 개의 시트를 각 컴포넌트 별로 생성할 수 있습니다. onRenderFirstFinishAll 이벤트 에서 마지막에 생성된 시트 객체를 알 수 있습니다.`},
      Dialog : {title:'시트 + 다이얼로그', desc:'모달 창 위에 시트를 띄웁니다. '}
    };
    const currentDesc = computed(() => sampleDesc[pageName.value] || null);

    // Select
    const showSelect = computed(() => ['Merge','Tree','DataLoad','SubSum'].includes(pageName.value));
    const selectValues = ref({ model: [], model2: [], model3: [] });
    const model = ref(null);
    const model2 = ref(null);
    const model3 = ref(null);

    function loadSelectOptions() {
      if (!showSelect.value) {
        selectValues.value = { model: [], model2: [], model3: [] };
        model.value = model2.value = model3.value = null;
        return;
      }
      const list = getItemList(pageName.value);
      selectValues.value = list || { model: [], model2: [], model3: [] };
      model.value = list?.model?.[0] || null;
      if (pageName.value === 'Merge') {
        model2.value = list?.model2?.[0] || null;
        model3.value = list?.model3?.[0] || null;
      }
    }

    function onSelectChange(opt1, opt2, opt3) {
      if (!firstSheet.value) return;
      changeOpt(pageName.value, sheetRef.value, opt1, opt2, opt3);
    }

    // Form
    function submitForm(e) {
      e.preventDefault();
      sheetRef.value.setRowValue(sheetRef.value.getFocusedRow(), Object.fromEntries(new FormData(e.target)));
    }
    function resetForm() {
      sheetRef.value.removeRow(sheetRef.value.getFocusedRow());
    }

    // 시트 생성
    function createSheetFor(name) {
      if (!name || name === 'Home') return;
      store.commit('Sheet/CREATE_SHEET', { pageName: name });
    }

    // mount
    onMounted(() => {
      createSheetFor(pageName.value);
      loadSelectOptions();
    });

    // pageName 변경
    watch(pageName, (nv, ov) => {
      if (nv && nv !== ov) {
        createSheetFor(nv);
        loadSelectOptions();
      }
    });

    // 디버깅용 (필요 시 주석 해제)
    // watch(sheetOptions, v => console.log('[WATCH] options count =', v.length), { immediate:true });
    // watch(sheetRows, v => console.log('[WATCH] rows =', v.length, v.slice(0,2)), { immediate:true });
    // watch(multiData, v => console.log('[WATCH] ', multiData), { immediate:true });
    // watch(firstSheet, v => console.log('[WATCH] firstSheet Cols?', v?.Cols?.length), { immediate:true });

    // Instance
    const sheetRef = shallowRef(null);
    function getInstance(inst) {
      sheetRef.value = inst;
      eventBinding(pageName.value, sheetRef.value)
    }

    const eventBinding = (name, sheet) => {
      switch(name) {
        case 'Form':
          sheet.bind('onRenderFirstFinish', (evt) =>{
            if (sheetData.value && sheetData.value.length > 0) {
              evt.sheet.loadSearchData(sheetData.value);
            }
          })
          sheet.bind('onFocus', evt => {
            document.getElementsByName('sName')[0].value = evt.row['sName'];
            document.getElementsByName('sAge')[0].value = evt.row['sAge'];
            document.getElementsByName('sPosi')[0].value = evt.row['sPosi'];
            document.getElementsByName('sPrice')[0].value = evt.row['sPrice'];
          })
          sheet.bind('onBlur', evt => {
            document.getElementsByName('sName')[0].value = '';
            document.getElementsByName('sAge')[0].value = '';
            document.getElementsByName('sPosi')[0].value = '';
            document.getElementsByName('sPrice')[0].value = '';
            document.getElementsByName('sDepart')[0].value = '';
          })
          break;
        case 'Type':
        case 'Formula':
        case 'Merge':
        case 'Tree':
        case 'SubSum':
        case 'Multiple':
        case 'Dialog':
        case 'DataLoad':
        case 'ModalOpen':
          sheet.bind('onRenderFirstFinish', evt => {
            if (multiData.value && multiData.value.length > 0) {
              const IBSheet = loader.getIBSheetStatic();
              if (evt.sheet.id == IBSheet[IBSheet.length - 3].id) {
                evt.sheet.loadSearchData(multiData.value[0]);
              } else if (evt.sheet.id == IBSheet[IBSheet.length - 2].id) {
                evt.sheet.loadSearchData(multiData.value[1]);
              } else if (evt.sheet.id == IBSheet[IBSheet.length - 1].id) {
                evt.sheet.loadSearchData(multiData.value[2]);
              }
            } else {
              if (sheetData.value && sheetData.value.length > 1) {
                evt.sheet.loadSearchData(sheetData.value);
              }  
            }
          })
          break;
        }
      };

    function openDialog() { dialogOpen.value = true; }

    return {
      pageName,
      currentDesc,
      // data / options
      sheetOptions,
      sheetData,
      sheetRows,
      multiDataSafe,
      normalizedSheets,
      firstSheet,
      isMultiple,
      // dialog
      dialogOpen,
      modalSheet,
      modalSheetData,
      openDialog,
      prepareModalSheet,
      // select
      showSelect,
      selectValues,
      model,
      model2,
      model3,
      onSelectChange,
      // form
      submitForm,
      resetForm,
      // events
      getInstance
    };
  }
};
</script>

<style scoped>
.sheet-page {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
}

.form-input {
  width: 90%;
  height: 56px;
  background: rgba(0,0,0,0.05);
  padding: 10px;
  border: none;
  outline: none;
}

:deep(.ibsheet) {
  font-size: 12px;
}
</style>
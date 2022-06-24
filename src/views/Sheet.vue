<template>
  <div>

    <div class="text-h6 text-weight-bold">{{sampleDesc[pageName]["title"]}}</div>
    <div class="text-subtitle2">{{sampleDesc[pageName]["desc"]}}</div>
    <q-btn v-if="pageName == 'Dialog'" label="ShowDialog" style="margin: 10px 0px;" color="secondary" @click="changeVal(pageName, sheetObj)"></q-btn>
    <!-- Select 를 사용하여 옵션 변경을 위한 Select들. -->
    <div class="q-pa-md" v-if="setTemp()">
    <div class="q-gutter-md row no-wrap center">
      <q-select v-model="model" label="Select Opiton" :options="val.model" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
        @update:model-value="(opt) => (
          //값이 변경시 호출하는 function
          changeVal(pageName, sheetObj, opt, model2, model3)
        )"
      />
      <q-select v-if="pageName == 'Merge'" v-model="model2" label="Select Opiton" :options="val.model2" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          changeVal(pageName, sheetObj, model, opt, model3)
        )"/>
      <q-select v-if="pageName == 'Merge'" v-model="model3" label="Select Opiton" :options="val.model3" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          changeVal(pageName, sheetObj, model, model2, opt)
        )"/>
    </div>

  </div>
    <div class="row no-wrap">
      <div id='sheetContainer' style="min-width: 400px"></div>
      <!-- Form 예제 에서 사용되는 form tag -->
      <q-card v-if="pageName == 'Form'" class="my-card" style="min-width: 300px;max-width:350px; padding: 10px; margin: 0px 10px;">
        <div align="center">
          <div  class="text-h4" style="margin:5px">
            상세 보기
          </div>
          <q-form class="q-gutter-md"
            @submit="changeVal(pageName, sheetObj, $event)"
          >
            <input name="sName" class="q-field__input" style="width:90%;height:56px;background:rgba(0, 0, 0, 0.05); padding:10px">
            <input name="sAge" class="q-field__input" style="width:90%;height:56px;background:rgba(0, 0, 0, 0.05); padding:10px">
            <input name="sPosi" class="q-field__input" style="width:90%;height:56px;background:rgba(0, 0, 0, 0.05); padding:10px">
            <input name="sPrice" class="q-field__input" style="width:90%;height:56px;background:rgba(0, 0, 0, 0.05); padding:10px">
            <input name="sDepart" class="q-field__input" style="width:90%;height:56px;background:rgba(0, 0, 0, 0.05); padding:10px">
            <div>
              <q-btn label="수정" type="submit" color="secondary"/>
              <q-btn label="삭제" type="reset" color="secondary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>
      </q-card>
      <!-- 여러개의 시트 생성에 필요한 시트 컨테이너.  -->
      <div v-if="pageName == 'Multiple'" id='sheetContainer2' style="min-width: 400px"></div>
      <div v-if="pageName == 'Multiple'" id='sheetContainer3' style="min-width: 400px"></div>
    </div>
  </div>
  <!-- 다이얼로그예제에서 사용되는 다이얼로그 -->
  <q-dialog
      v-model="dialogOpen"
      @show="createSheet('ModalOpen')"
      @before-hide="removeSheet('modalSheet')"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Dialog</div>
        </q-card-section>

        <div id='modalContainer'></div>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { getItemList, changeOpt } from '../store/modules/function'

export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetObj = computed(() => store.state.Sheet.sheet);
    const getters = computed(() => store.getters);
    const createSheet = (state, sampleData) => store.commit('CREATE_SHEET', state, sampleData);
    const removeSheet = (id) => store.commit("REMOVE_SAMPLE", id);
    const dataLoad = (cnt) => store.commit("CHANGE_DATA", cnt);
    const options = getItemList;
    const optList = options(store.state.Page.name);
    const chgOpt = changeOpt;
    const val = ref(optList);
    const model = ref(null);
    const model2 = ref(null);
    const model3 = ref(null);
    // 다이얼로그를 띄우기 위한 bool값
    const dialogOpen = ref(false);

    return {
      dialogOpen, model, model2, model3, val, optList, createSheet, removeSheet, options, chgOpt, pageName, getters, sheetObj, dataLoad, setTemp() {
        // 4개의 예제는 select 가 필요함.
        switch (this.pageName) {
          case "Merge" :
          case "Tree" :
          case "DataLoad" :
          case "SubSum" :
            return true;
        }
      }
    };
  },
  mounted() {
    // 새로고침하는 경우 여기서 시트 생성 및 Select 옵션 받아오는 로직.
    switch (this.pageName) {
      case "Merge" :
      case "Tree" :
      case "DataLoad" :
        this.optList = this.options(this.pageName);
        // Select에 초기값 반영방법.
        // for (const itemList in this.optList){
        //   this[itemList] = this.optList[itemList][0].label;
        // }
        break;
    }
    this.createSheet({pageName: this.pageName});
  },
  watch: {
    '$route.name': function (val, old) {
      if (val != old && val != "Home" &&  val != "Multiple") {
        //그 외 메뉴리스트 변경 및 시트 그리는건 전 메뉴 다 호출되어야 함.(홈과 멀티플은 제외!)
        if (val == "DataLoad") this.dataLoad(0);
        this.createSheet({pageName: val});
        this.optList = getItemList(this.pageName);
        this.val = ref(this.optList);
        this.model = ref(null);
        this.model2 = ref(null);
        this.model3 = ref(null);
        // for (const itemList in this.optList){
        //   this[itemList] = this.optList[itemList][0].label;
        // }
      }
    }
  },
  updated () {
    // 멀티플구조에서만 업데이트 구간에서 create호출(container가 생성된 후에 create 호출해야함.)
    if (this.pageName == "Multiple") {
      this.createSheet({pageName: this.pageName});
    }
  },
  methods: {
    changeVal(pageName, sheet, opt, model2, model3) {
      switch (pageName) {
        case "DataLoad" :
        case "Form" :
          this.chgOpt(pageName, sheet, opt);
          break
        case "Dialog" :
          this.dialogOpen = true;
          break;
        default :
          this.chgOpt(pageName, sheet, opt, model2, model3);
          break;
      }
    },
  },
  data () {
    return{
      sampleDesc: {
        Type : {title:'컬럼 별 타입', desc:'각 컬럼별 설정 가능한 Type에 대한 예제입니다.'},
        Merge : {title:'자동 머지 기능', desc:'헤더, 데이터 영역의 각 셀들의 값이 같은 경우 자동으로 병합시킬 수 있습니다.'},
        Tree : {title:'트리 예제', desc:'트리 관련 예제 입니다. 지정한 레벨만큼 트리를 접거나 펼칠 수 있습니다.'},
        DataLoad : {title:'대용량 조회', desc:'IBSheet8 은 새로운 렌더방식을 이용해, 대용량 데이터 조회/조작을 사용할 수 있습니다.'},
        SubSum : {title:'소계 기능', desc:'특정 컬럼을 기준으로, 지정한 컬럼들에 대한 소계 값을 보여주는 기능입니다.'},
        Formula : {title:'포뮬러 기능', desc:'포뮬러를 이용하여 자동값 계산 또는 속성을 설정할 수 있습니다.'},
        Form : {title:'Form 형태를 이용한 상세보기', desc:'시트와 form 간의 연동을 통해 행 선택시 내용을 form 에서 확인하고 form 의 내용을 수정하여 시트의 반영할 수 있습니다.'},
        Multiple : {title:'여러 개의 시트', desc:`여러 개의 시트를 각 컴포넌트 별로 생성할 수 있습니다. onRenderFirstFinishAll 이벤트 에서 마지막에 생성된 시트 객체를 알 수 있습니다.`},
        Dialog : {title:'시트 + 다이얼로그', desc:'모달 창 위에 시트를 띄웁니다. '}
      }
    }
  }

}

</script>

<style>
body {
  margin : 0
}

div {
  box-sizing: border-box;
}
</style>
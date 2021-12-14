<template>
  <div>
    
    <div class="text-h6">{{pageName}}</div>
    <q-btn v-if="pageName == 'Dialog'" label="ShowDialog" style="margin: 10px 0px;" color="secondary" @click="changeVal(pageName, sheetObj)"></q-btn>
    <div class="q-pa-md" v-if="setTemp()">
    <div class="q-gutter-md row no-wrap center">
      <q-select v-model="model" :options="val.item" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
        @update:model-value="(opt) => (
          changeVal(pageName, sheetObj, opt, model2, model3)
        )"
      />
      <q-select v-if="pageName == 'Merge'" v-model="model2" :options="val.item2" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          changeVal(pageName, sheetObj, model, opt, model3)
        )"/>
      <q-select v-if="pageName == 'Merge'" v-model="model3" :options="val.item3" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          changeVal(pageName, sheetObj, model, model2, opt)
        )"/>
    </div>

  </div>
    <div class="row no-wrap">
      <div id='sheetContainer' style="min-width: 400px"></div>
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
      <div v-if="pageName == 'Multiple'" id='sheetContainer2' style="min-width: 400px"></div>
      <div v-if="pageName == 'Multiple'" id='sheetContainer3' style="min-width: 400px"></div>
    </div>
  </div>

  <q-dialog
      v-model="medium"
      @show="createSheet('ModalOpen')"
      @before-hide="reomoveSheet('modalSheet')"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Medium</div>
        </q-card-section>

        <div id='modalContainer'></div>
        <!-- <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section> -->

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div>{{testComp}}</div>
</template>

<script>
import { computed, h } from "vue";
import { mapState, useStore } from "vuex";
import { ref } from 'vue'

import { getItemList, changeOpt } from '../store/modules/function'
import { dataFunction } from '../samples/dataload/fun'

export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetObj = computed(() => store.state.Sheet.sheet);
    const getters = computed(() => store.getters);
    // 시트 생성만 여기서
    const createSheet = (state, sampleData) => store.commit('CREATE_SHEET', state, sampleData);
    const reomoveSheet = (id) => store.commit("REMOVE_SAMPLE", id);

    const dataLoad = (cnt) => store.commit("CHANGE_DATA", cnt);
    const options = getItemList;
    const optList = options(store.state.Page.name);
    const chgOpt = changeOpt;
    const val = ref(optList);
    const model = ref(null);
    const model2 = ref(null);
    const model3 = ref(null);
    const medium = ref(false);
    const testComp = dataFunction();

    return {testComp, medium, model, model2, model3, val, optList, createSheet, reomoveSheet, options, chgOpt, pageName, getters, sheetObj, dataLoad, setTemp(){
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
  render(){
    
    // const { h } = VueElement
    return h('div', this.testComp)
  },
  computed: {
    ...mapState(['sheet']),
  },
  mounted() {
    switch (this.pageName) {
      case "Merge" :
      case "Tree" :
      case "DataLoad" : 
        this.optList = this.options(this.pageName);
        break;
    }
    this.createSheet(this.pageName);
  },
  watch: {
    '$route.name': function (val, old) {
      if (val != old && val != "Home" &&  val != "Multiple") {
        //그 외 메뉴리스트 변경 및 시트 그리는건 전 메뉴 다 호출되어야 함.(홈과 멀티플은 제외!)
        if (val == "DataLoad") this.dataLoad(0);
        this.createSheet(val);
        this.optList = getItemList(this.pageName);
        this.val = ref(this.optList);
        this.model = ref(null);
        this.model2 = ref(null);
        this.model3 = ref(null);
        this.model4 = ref(null);
        this.model5 = ref(null);
      }
    }
  },
  updated () {
    // 멀티플구조에서만 업데이트 구간에서 create호출(container가 생성된 후에 create 호출해야함.)
    if (this.pageName == "Multiple") {
      this.createSheet(this.pageName);
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
          this.medium = true;
          break;
        default :
          this.chgOpt(pageName, sheet, opt, model2, model3);
          break;
      }
    },
  },
  data () {
    return{
      data:"test"
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
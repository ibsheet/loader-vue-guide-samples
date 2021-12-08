<template>
  <div>
    
    <div class="text-h6">{{pageName}}</div>
    <div class="q-pa-md" v-if="setTemp()">
    <div class="q-gutter-md row no-wrap center">
      <q-select v-if="test(pageName)" v-model="model" :options="val.item" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
        @update:model-value="(opt) => (
          chgOpt(sheetObj, opt.value, options.value, options.value)
        )"
      />

      <q-select v-if="test(pageName)" v-model="model2" :options="val.item2" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          chgOpt(sheetObj, options.value, opt.value, options.value)
        )"/>
      <q-select v-if="test(pageName)" v-model="model3" :options="val.item3" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (
          chgOpt(sheetObj, options.value, options.value, opt.value)
        )"/>
    </div>
  </div>
    
    <div class="row no-wrap">
      <div id='sheetContainer' style="min-width: 400px"></div>
      <div v-if="pageName == 'Multiple'" id='sheetContainer2' style="min-width: 400px"></div>
      <div v-if="pageName == 'Multiple'" id='sheetContainer3' style="min-width: 400px"></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from 'vue'

import { getItemList, changeOpt } from '../store/modules/function'

export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetObj = computed(() => store.state.Sheet.sheet);
    const getters = computed(() => store.getters);
    // 시트 생성만 여기서
    const createSheet = (sampleData) => store.commit('CREATE_SHEET', sampleData);

    const dataLoad = (cnt) => store.commit("CHANGE_DATA", cnt);
    const options = getItemList;
    const optList = options(store.state.Page.name);
    const chgOpt = changeOpt;
    const val = ref(optList);
    const model = ref(null);
    const model2 = ref(null);
    const model3 = ref(null);

    return {model, model2, model3, val, optList, createSheet, options, chgOpt, pageName, getters, sheetObj, dataLoad, setTemp(){
        switch (this.pageName) {
          case "Merge" :
          case "Tree" :
          case "DataLoad" :
            return true; 
        }
      },
      test(name) {
        if (name == "Merge") {
          return true;
        }
      }
    };
  },
  components: {
    // Template
  },
  mounted() {
    switch (this.pageName) {
      case "Merge" :
      case "Tree" :
        this.optList = this.options(this.pageName);
        break;
      case "DataLoad" : 
        this.optList = this.options(this.pageName);
        this.dataLoad(1000);
        break;
    }
    this.createSheet(this.pageName);
  },
  watch: {
    '$route.name': function (val, old) {
      if (val != old && val != "Home" &&  val != "Multiple") {
        //그 외 메뉴리스트 변경 및 시트 그리는건 전 메뉴 다 호출되어야 함.(홈과 멀티플은 제외!)
        this.createSheet(val);
        this.optList = getItemList(this.pageName);
        this.val = ref(this.optList);
      }
    }
  },
  updated () {
    // 멀티플구조에서만 업데이트 구간에서 create호출(container가 생성된 후에 create 호출해야함.)
    if (this.pageName == "Multiple") {
      this.createSheet(this.pageName);
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
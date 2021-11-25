<template>
  <div>
    
    <div class="text-h6">{{pageName}}</div>
    <Template v-if="setTemp()"/>
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

import Template from './Template.vue'

export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetId = computed(() => store.state.Sheet.sheet_id);
    const getters = computed(() => store.getters);
    // 시트 생성만 여기서
    const createSheet = (sampleData) => store.commit('CREATE_SHEET', sampleData);
    // const template = (pageName) => store.commit('CHANGE_TEMP', pageName);
    
    const dataLoad = (cnt) => store.commit("CHANGE_DATA", cnt);

    

    return { pageName, createSheet,  getters, sheetId, dataLoad, setTemp(){
      if (this.pageName == "Merge") {
          return true
      }
    }};
  },
  components: {
    Template
  },
  mounted() {
    switch (this.pageName) {
      case "Merge" :
      case "DataLoad" : 
        // this.template(this.pageName);
        // this.dataLoad(1000);
        break;
    }
    this.createSheet(this.pageName);
  },
  updated() {
    if (this.pageName == "DataLoad") this.dataLoad(1000);
    this.createSheet(this.pageName);
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
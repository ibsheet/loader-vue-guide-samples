<template>
  <div>
    
    <div class="text-h6">{{pageName}}</div>
    <!-- <button v-if="pageName == 'SubSum'">dd</button> -->
    <div id='sheetContainer'></div>
    <div v-if="pageName == 'Multiple'" id='sheetContainer2'></div>
    <div v-if="pageName == 'Multiple'" id='sheetContainer3'></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
// import { setData } from '../samples/dataload'



export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetId = computed(() => store.state.Sheet.sheet_id);
    const test = computed(() => store.getters);
    // 시트 생성&삭제
    const createSheet = (sampleData) => store.commit('CREATE_SHEET', sampleData);
    const changeSheetDiv = (divId) => store.commit('CHANGE_SHEETDIV', divId);
    const reomoveSheet = (id) => store.commit("REMOVE_SAMPLE", id);

    const dataLoad = (cnt) => store.commit("CHANGE_DATA", cnt);

    

    return { pageName, createSheet, reomoveSheet, test, sheetId, dataLoad, changeSheetDiv};
  },
  mounted() {
    console.warn(this.pageName);
    switch (this.pageName) {
      case "DataLoad" : 
        this.dataLoad(100);
        break;
    }
    this.createSheet(this.pageName);
  },

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
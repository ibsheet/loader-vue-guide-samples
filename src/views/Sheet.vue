<template>
  <div>
    <div>{{pageName}} 페이지 입니다</div>
    <!-- <div>{{test}} Getter</div> -->
    <div id='sheetContainer'></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { SheetSampleData } from '../shared/ibsheet-data'
const ibsample_data  = SheetSampleData

export default {
  setup() {
    const store = useStore();
    const pageName = computed(() => store.state.Page.name);
    const sheetId = computed(() => store.state.Sheet.sheet_id);
    const sheetInfo = computed(() => store.state.Sheet.options);
    const sheetData = computed(() => store.state.Sheet.sheet_data);
    const test = computed(() => store.getters);
    // 시트 생성&삭제
    const createSheet = (sampleData) => store.commit('CREATE_SHEET', sampleData);
    const reomoveSheet = (id) => store.commit("REMOVE_SAMPLE", id);

    const changePage = (title) => store.commit("CHANGE_SAMPLE", pageName.value = title);

    return { pageName, createSheet, reomoveSheet, test, sheetInfo, sheetData, sheetId, changePage};
  },
  mounted() {
    switch(this.pageName) {
      case "Number" : 
        this.createSheet(ibsample_data[1]);
        break;
      case "TextType" : 
        this.createSheet(ibsample_data[0]);
        break;
    }
  },
  beforeUpdate() {
    this.reomoveSheet(this.sheetId);
  },
  updated() {
    console.log(this.test);
    switch(this.pageName) {
      case "Number" : 
        this.createSheet(ibsample_data[1]);
        break;
      case "TextType" : 
        this.createSheet(ibsample_data[0]);
        break;
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
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
// import { SheetSampleData } from '../shared/ibsheet-data'
// const ibsample_data  = SheetSampleData

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
    // url 로 바로 접근하는 경우에 시트 생성을 위한구간. 방법이 이게 맞는지는 의문
    switch(this.pageName) {
      case "Number" : 
        this.createSheet(this.test);
        break;
      case "TextType" : 
        this.createSheet(this.test);
        break;
    }
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
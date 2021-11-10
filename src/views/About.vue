<template>
  <div>
    <div id='sheetContainer'></div>
  </div>
</template>

<script>
// import loader from '@ibsheet/loader'
import { computed } from "vue";
import { useStore } from "vuex";
// let SHEET_ID = ''

export default {

  name: 'About',
  components: {
  },
  setup() {
    const store = useStore();
    const sheetId = computed(() => store.state.Sheet.sheet_id);
    const reomoveSheet = () => store.commit("REMOVE_SAMPLE");
    return { reomoveSheet, sheetId }
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
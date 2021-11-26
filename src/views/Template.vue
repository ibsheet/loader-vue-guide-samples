<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row no-wrap center">
      <q-select v-model="val" :options="options.item" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"
      :option-value="opt => Object(opt) === opt && 'value' in opt ? opt.value : null"
      @update:model-value="(opt) => (test(opt.value))"
      >
      </q-select>

      <q-select v-if="options.item2" v-model="val2" :options="options.item2" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"/>
      <q-select v-if="options.item3" v-model="val3" :options="options.item3" transition-show="jump-up" transition-hide="jump-up" style="width: 200px"/>
    </div>
  </div>
</template>

<script>
// import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from 'vue'
import { Function } from '../samples/merge/function'

export default {
  setup() {
    const store = useStore();
    // const pageName = computed(() => store.state.Page.name);
    const options = Function(store.state.Page.name);
    const val = ref(options.item[0]);
    const val2 = ref(options.item2[0]);
    const val3 = ref(options.item3[0]);
    
    return { options, /* pageName,  */val, val2, val3};
  },
  methods: {
    test(val) {
      alert(val);
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
<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row no-wrap">
      <q-select
        @click ='test();'
        transition-show="jump-up"
        transition-hide="jump-up"
        :options="options.headerMerge"
        style="width: 250px"
        v-model="modelSingle"
        use-chips
        stack-label
        :option-value="options.headerMerge"
      />
      <q-select v-model="model" :options="options.dataMerege" transition-show="jump-up" transition-hide="jump-up" style="width: 250px"/>
    </div>
  </div>
</template>

<script>
import { Function } from '../samples/merge/function'

export default {
  setup() {
    const options = Function();
    return { options };
  },
  methods: {
    test() {
      alert('aa');
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
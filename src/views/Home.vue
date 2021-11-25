<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card class="my-card" v-for="(info, idx) in sampleInfo" :key="idx">
      <q-btn :to='info.title' ><img :dense="$q.screen.xs" :src = info.img style="height: 180px; width: 300px"></q-btn>
      <q-card-actions align="left">
        <q-btn color="secondary" class="no-pointer-events"> 기본기능 </q-btn>
        <q-btn flat :to='info.title'> {{info.title}} </q-btn>
      </q-card-actions>
    </q-card>

  </div>
</template>
<script>
export default {
 data() {
     return {
        sampleInfo: [
            {title:'Type', img:require('../assets/type.png')},
            {title:'Merge', img:require('../assets/subsum.png')},
            {title:'Tree', img:require('../assets/tree.png')},
            {title:'SubSum', img:require('../assets/subsum.png')},
            {title:'Formula', img:require('../assets/formula.png')},
            {title:'Form', img:require('../assets/form.png')},
            {title:'Multiple', img:require('../assets/multi.png')},
            {title:'Dialog', img:require('../assets/dialog.png')},
            {title:'Dataload', img:require('../assets/dataload.png')},
        ]
     }
 },
}
</script>
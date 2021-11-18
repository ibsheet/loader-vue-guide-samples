<template>
  <div class="q-pa-md row items-start q-gutter-md">

    <q-card class="my-card" v-for="img in image" :key="img">
      <div><img :src = img> </div>
      <q-card-actions align="center">
        <q-btn flat round to="/Text"> TextType </q-btn>
      </q-card-actions>
    </q-card>

    <!-- <q-card class="my-card">
      <div><img src = "../assets/subsum.png"> </div>
      <q-card-actions align="center">
        <q-btn flat round to> SubSum </q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <div><img src = "../assets/tree.png"> </div>
      <q-card-actions align="center">
        <q-btn flat round to> Tree </q-btn>
      </q-card-actions>
    </q-card> -->

  </div>
</template>
<script>
export default {
 data() {
     return {
        image: [
            require('../assets/type.png'), require('../assets/subsum.png')
        ]
     }
 },
}
</script>
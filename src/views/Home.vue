<template>
  <div class='q-pa-md row items-start q-gutter-md'>

    <q-card class='my-card' v-for='(info, idx) in sampleInfo' :key='idx'>
      <q-btn :to='info.to' ><img :dense='$q.screen.xs' :src = info.img style='height: 180px; width: 300px'></q-btn>
      <q-card-actions align='left'>
        <q-btn :color='info.class' class='no-pointer-events text-weight-bold'> {{info.level}} </q-btn>
        <q-btn flat :to='info.title' class='text-weight-bold'> {{info.label}} </q-btn>
      </q-card-actions>
    </q-card>

  </div>
</template>
<script>
const url = process.env.NODE_ENV === 'production' ? '/v8/demo/vue/' : '/';
import typeImg from '../assets/type.png';
import mergeImg from '../assets/merge.png';
import treeImg from '../assets/tree.png';
import dataloadImg from '../assets/dataload.png';
import subsumImg from '../assets/subsum.png';
import formulaImg from '../assets/formula.png';
import formImg from '../assets/form.png';
import multipleImg from '../assets/multi.png';
import dialogImg from '../assets/dialog.png';

export default {
  data() {
    return {
      // 메인 화면에 보여줄 정보들.
      sampleInfo: [
        {to: url + 'type', title:'Type', img: typeImg, label:'컬럼 타입', level:'기본기능', class:'secondary'},
        {to: url + 'merge', title:'Merge', img: mergeImg, label:' 자동 머지', level:'기본기능', class:'secondary'},
        {to: url + 'tree', title:'Tree', img: treeImg, label:'트리 기능', level:'기본기능', class:'secondary'},
        {to: url + 'dataload', title:'Dataload', img: dataloadImg, label:'대용량 조회', level:'기본기능', class:'secondary'},
        {to: url + 'subsum', title:'SubSum', img: subsumImg, label:'소계 기능', level:'고급기능', class:'primary'},
        {to: url + 'formula', title:'Formula', img: formulaImg, label:'포뮬러 기능', level:'고급기능', class:'primary'},
        {to: url + 'form', title:'Form', img: formImg, label:'Form 형태를 이용한 상세보기', level:'실무예제', class:'deep-orange'},
        {to: url + 'multiple', title:'Multiple', img: multipleImg, label:'여러 개의 시트', level:'실무예제', class:'deep-orange'},
        {to: url + 'dialog', title:'Dialog', img: dialogImg, label:'시트 + 다이얼로그', level:'실무예제', class:'deep-orange'},
      ]
    }
  }
}
</script>
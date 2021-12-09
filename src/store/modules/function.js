// import { computed } from "vue";

const getItemList = (pageName) => {
  const itemList = {};
  switch(pageName) {
    // 
    case "Merge" :
      itemList.item = 
        [{label:'HeaderMerge: 0', value:0},
           {label:'HeaderMerge: 1', value:1}, 
           {label:'HeaderMerge: 2', value:2}, 
           {label:'HeaderMerge: 3', value:3},
           {label:'HeaderMerge: 4', value:4},
           {label:'HeaderMerge: 5', value:5},
           {label:'HeaderMerge: 6', value:6}];
      
      itemList.item2 = 
        [{label:'DataMerge: 0', value:0},
          {label:'DataMerge: 1', value:1}, 
          {label:'DataMerge: 2', value:2}, 
          {label:'DataMerge: 3', value:3},
          {label:'DataMerge: 4', value:4},
          {label:'DataMerge: 5', value:5},
          {label:'DataMerge: 6', value:6}];
      itemList.item3 = 
        [{label:'PrevColumnMerge: 0', value:0},
          {label:'PrevColumnMerge: 1', value:1}, 
          {label:'PrevColumnMerge: 2', value:2}, 
          {label:'PrevColumnMerge: 3', value:3}];
      break;
    case "Tree" :
      itemList.item = 
        [{label:'showTreeLevel: 1', value:1},
          {label:'showTreeLevel: 2', value:2}, 
          {label:'showTreeLevel: 3', value:3}, 
          {label:'showTreeLevel: 4', value:4}];
      break;
    case "DataLoad" :
      itemList.item = 
      [{label:'100,000 건', value:100000},
        {label:'200,000 건', value:200000}, 
        {label:'300,000 건', value:300000}];
      break;
  }

  
  return itemList
};

const changeOpt = (pageName, sheetId, val, val2, val3) => {

  switch (pageName) {
    case "Tree" :
      sheetId[0].showTreeLevel(val.value);
      break;
    case "Merge" : 
      if(sheetId) {
        if (val) val = val.value;
        if (val2) val2 = val2.value;
        if (val3) val3 = val3.value;
        sheetId[0].setAutoMerge({headerMerge: val, dataMerge: val2, prevColumnMerge: val3})
      }
      break;
  }

}

export { getItemList, changeOpt }
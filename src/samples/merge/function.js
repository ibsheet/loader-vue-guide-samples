export const Function = (pageName) => {

  switch(pageName) {
    case "Merge":
      console.log('a')
      break;
  }




  const itemList = {
                    item: [{label:'HeaderMerge: 0', value:0},
                       {label:'HeaderMerge: 1', value:1}, 
                       {label:'HeaderMerge: 2', value:2}, 
                       {label:'HeaderMerge: 3', value:3},
                       {label:'HeaderMerge: 4', value:4},
                       {label:'HeaderMerge: 5', value:5},
                       {label:'HeaderMerge: 6', value:6}],
                    item2:[{label:'DataMerge: 0', value:0},
                      {label:'DataMerge: 1', value:1}, 
                      {label:'DataMerge: 2', value:2}, 
                      {label:'DataMerge: 3', value:3},
                      {label:'DataMerge: 4', value:4},
                      {label:'DataMerge: 5', value:5},
                      {label:'DataMerge: 6', value:6}],
                    item3:[{label:'PrevColumnMerge: 0', value:0},
                    {label:'PrevColumnMerge: 1', value:1}, 
                    {label:'PrevColumnMerge: 2', value:2}, 
                    {label:'PrevColumnMerge: 3', value:3}]
  }

  
  return itemList
};

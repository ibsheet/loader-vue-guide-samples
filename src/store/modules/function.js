// 4개의 샘플에서 필요한 option 들을 받기 위한 구간.
const getItemList = (pageName) => {
  const itemList = {};
  switch(pageName) {
    case 'Merge' :
      itemList.model =
        [{label:'HeaderMerge: 0', value:0},
           {label:'HeaderMerge: 1', value:1},
           {label:'HeaderMerge: 2', value:2},
           {label:'HeaderMerge: 3', value:3},
           {label:'HeaderMerge: 4', value:4},
           {label:'HeaderMerge: 5', value:5},
           {label:'HeaderMerge: 6', value:6}];

      itemList.model2 =
        [{label:'DataMerge: 0', value:0},
          {label:'DataMerge: 1', value:1},
          {label:'DataMerge: 2', value:2},
          {label:'DataMerge: 3', value:3},
          {label:'DataMerge: 4', value:4},
          {label:'DataMerge: 5', value:5},
          {label:'DataMerge: 6', value:6}];
      itemList.model3 =
        [{label:'PrevColumnMerge: 0', value:0},
          {label:'PrevColumnMerge: 1', value:1},
          {label:'PrevColumnMerge: 2', value:2},
          {label:'PrevColumnMerge: 3', value:3}];
      break;
    case 'Tree' :
      itemList.model =
        [{label:'showTreeLevel: 1', value:1},
          {label:'showTreeLevel: 2', value:2},
          {label:'showTreeLevel: 3', value:3},
          {label:'showTreeLevel: 4', value:4}];
      break;
    case 'DataLoad' :
      itemList.model =
      [{label:'100,000 건', value:100000},
        {label:'200,000 건', value:200000},
        {label:'300,000 건', value:300000}];
      break;
    case 'SubSum' :
      itemList.model =
      [{label:'단일 컬럼 소계', value:'subsum'},
        {label:'단일 컬럼 소계 / 누계', value:'cumulate'},
        {label:'다중 컬럼 소계', value:'multisubsum'},
        {label:'다중 컬럼 소계 / 누계', value:'multicumulate'},
        {label:'소계행 삭제', value:'removesubsum'}
      ];
      break;
  }


  return itemList
};

// select 값 변경시 호출.
const changeOpt = (pageName, sheetObj, val, val2, val3) => {
  const mySheet = eval(sheetObj[0].id); // state가 proxy로 관리 되고있음.
  const color = {
    subsum: '#f08080',
    cumul: '#78c7fa',
    multisubsum: '#fad1d1',
    multicumul: '#ceebfd'
  };
  const data = [];
  const company = [
    'Google',
    'Apple',
    '삼성전자',
    'LG전자',
    '한화',
    'Microsoft',
    '현대',
    '현기차',
    'SK',
    '롯데'
  ];
  const country = [
    '미국',
    '일본',
    '한국',
    '영국',
    '캐나다',
    '중국',
    '프랑스',
    '브라질',
    '인도',
    '이탈리아'
  ];

  switch (pageName) {
    case 'Tree' :
      mySheet.showTreeLevel(val.value);
      break;
    case 'Merge' :
        if (val) val = val.value;
        if (val2) val2 = val2.value;
        if (val3) val3 = val3.value;
        mySheet.setAutoMerge({headerMerge: val, dataMerge: val2, prevColumnMerge: val3})
      break;
    case 'SubSum' :
        switch(val.value) {
          case 'subsum':
            mySheet.makeSubTotal([
              {
                stdCol: 'sPolicy',
                sumCols: 'A|B|C|D',
                position: 'bottom',
                color: color.subsum,
                captionCol: [
                  {
                    col: 'sPolicy',
                    val: '%s: %col',
                    cumVal: '%s: %col',
                    span: 3
                  },
                  {
                    col: 'E',
                    val: ' ',
                    cumVal: ' ',
                    span: 2
                  }
                ],
              }
            ]);
            break;
          case 'cumulate':
            mySheet.makeSubTotal([
              {
                stdCol: 'sPolicy',
                sumCols: 'A|B|C|D',
                captionCol: [
                  {
                    col: 'sPolicy',
                    val: '%s: %col',
                    cumVal: '%s: %col',
                    span: 3
                  }
                ],
                showCumulate: 1,
                color: color.subsum,
                cumulateColor: color.cumul ,
                position: 'bottom'
              }
            ]);
            break;
          case 'multisubsum':
            mySheet.makeSubTotal([
              {
                stdCol: 'sPolicy',
                sumCols: 'B|C',
                position: 'bottom',
                color: color.subsum
              },
              {
                stdCol: 'sUnit',
                avgCols: 'B|C',
                captionCol: [
                  {
                    col: 'sUnit',
                    val: '%s: %col'
                  }
                ],
                position: 'bottom',
                color: color.multisubsum
              },
            ]);
            break;
          case 'multicumulate':
            mySheet.makeSubTotal([
              {
                stdCol: 'sPolicy',
                sumCols: 'B|C',
                captionCol: [
                  {
                    col: 'sPolicy',
                    val: '%s: %col',
                    cumVal: '%s: %col'
                  }
                ],
                showCumulate: 1,
                position: 'bottom',
                color: color.subsum,
                cumulateColor: color.cumul,
              },
              {
                stdCol: 'sUnit',
                avgCols: 'B|C',
                captionCol: [
                  {
                    col: 'sUnit',
                    val: '%s: %col',
                    cumVal: '%s: %col'
                  }
                ],
                showCumulate: 1,
                position: 'bottom',
                color: color.multisubsum,
                cumulateColor: color.multicumul
              },
              {
                stdCol: 'sDetail',
                avgCols: 'A|D',
                captionCol: [
                  {
                    col: 'sDetail',
                    val: '%s: %col',
                    cumVal: '%s: %col'
                  }
                ],
                countCols: 'E',
                showCumulate: 1,
                position: 'bottom',
                color: color.multisubsum,
                cumulateColor: color.multicumul
              }
            ]);
            break;
          default:
            mySheet.removeSubTotal();
        }
      break;
    case 'DataLoad' :
        for (let i = 0; i < val.value; i++) {
          data.push({
            sCompany: company[Math.floor(Math.random() * 10)],
            sCountry: country[Math.floor(Math.random() * 10)],
            sSaleQuantity: Math.floor(Math.random() * 100000),
            sSaleIncrease: Math.floor(Math.random() * 10000),
            sPrice: Math.floor(Math.random() * 10000000),
            sSatisfaction: Math.floor(Math.random() * (100 - 50 + 1) + 50),
          });
        }

        mySheet.loadSearchData({data:data});
      break;
    case 'Form' :
      for (let idx = 0; idx < val.target.length; idx++) {
        mySheet.setValue(mySheet.getFocusedRow(), val.target[idx].name, val.target[idx].value);
      }
  }

}

export { getItemList, changeOpt }
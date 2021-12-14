export const DataLoadOption = [
  {
    options : {
      Cfg: {
        SearchMode: 0,
        CustomScroll: 1,
        Style: 'IBMT'
      },
      LeftCols: [
        {
          Header: ['No', 'No'],
          Type: 'Int',
          Name: 'SEQ',
          Width: 80
        }
      ],
      Cols: [
        {
          Header: ['확인', '확인'],
          Type: 'Bool',
          Name: 'sCheck',
          Width: 60
        },
        {
          Header: ['회사', '회사'],
          Type: 'Text',
          Name: 'sCompany',
          Width: 150
        },
        {
          Header: ['판매 국가', '판매 국가'],
          Type: 'Text',
          Name: 'sCountry',
          Width: 150
        },
        {
          Header: ['판매 수량', '판매 수량'],
          Type: 'Int',
          Name: 'sSaleQuantity',
          Width: 100
        },
        {
          Header: ['판매 증가량', '판매 증가량'],
          Type: 'Int',
          Name: 'sSaleIncrease',
          Width: 100
        },
        {
          Header: ['가격', '가격'],
          Type: 'Int',
          Name: 'sPrice',
          Format: '#,### \\원',
          Width: 180
        },
        {
          Header: ['만족도', '만족도'],
          Type: 'Int',
          Name: 'sSatisfaction',
          Format: '# \\%',
          Width: 180
        },
        {
          Header: ['코멘트', '코멘트'],
          Type: 'Text',
          Name: 'sComment',
          RelWidth: 1
        }
      ],
      Events: {},
    },
    el: 'sheetContainer'
  }
];

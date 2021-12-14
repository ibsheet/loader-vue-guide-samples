export const DialogOption = 
  [ 
    {
      options: {
        Def: { Col: { RelWidth: 1 } },
        Cfg: {
          SearchMode: 0,
          CustomScroll: 1,
          Style: 'IBMT'
        },
        LeftCols: [
          {
            Header: 'No',
            Type: 'Int',
            Name: 'SEQ'
          }
        ],
        Cols: [
          {
            Header: '정책 사업',
            Name: 'sPolicy',
            Type: 'Text',
            MinWidth: 150,
            RelWidth: 1,
          },
          {
            Header: '단위 사업',
            Name: 'sUnit',
            Type: 'Text',
            MinWidth: 150,
            RelWidth: 1,
          },
          {
            Header: '세부사업',
            Name: 'sDetail',
            Type: 'Text',
            MinWidth: 150,
            RelWidth: 1
          },
          {
            Header: 'A',
            Name: 'A',
            Type: 'Int'
          },
          {
            Header: 'B',
            Name: 'B',
            Type: 'Int'
          },
          {
            Header: 'C',
            Name: 'C',
            Type: 'Int'
          },
          {
            Header: 'D',
            Name: 'D',
            Type: 'Int'
          },
          {
            Header: 'E',
            Name: 'E',
            Type: 'Int'
          },
          {
            Header: 'F',
            Name: 'F',
            Type: 'Int',
            'Formula': 'E + 10'
          }
        ],
        Events: {}
      },
      el: 'sheetContainer'
    }
  ]
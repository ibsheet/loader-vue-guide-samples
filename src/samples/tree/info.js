// ibsheet sample data
export const TreeOption = 
  // sheet1
[
  {
    options: {
      Cfg: {
        SearchMode: 0,
        HeaderMerge: 3,
        MainCol: 'Sol',
        CustomScroll: 1,
          Style: 'IBMT'
        },
      LeftCols: [
        {
          Type: 'Int',
          Width: 50,
          Align: 'Center',
          Name: 'SEQ'
        }
      ],
      Cols: [
        {
          Header: '솔루션 팀',
          Type: 'Text',
          Name: 'Sol',
          MinWidth: '200',
          Align: 'Left',
          RelWidth: 1,
        },
        {
          Header: '2021/1',
          Type: 'Int',
          Name: 'Y202101',
          Width: '80',
          Align: 'Right',
          FormulaRow: 'Sum',
          RelWidth: 1,
          CanEdit: 0
        },
        {
          Header: '2021/2',
          Type: 'Int',
          Name: 'Y202102',
          Width: '80',
          Align: 'Right',
          FormulaRow: 'Sum',
          RelWidth: 1,
          CanEdit: 0
        },
        {
          Header: '2021/3',
          Type: 'Int',
          Name: 'Y202103',
          Width: '80',
          Align: 'Right',
          FormulaRow: 'Sum',
          RelWidth: 1,
          CanEdit: 0
        },
        {
          Header: '2021/4',
          Type: 'Int',
          Name: 'Y202104',
          Width: '80',
          Align: 'Right',
          FormulaRow: 'Sum',
          RelWidth: 1,
          CanEdit: 0
        },
        {
          Header: '2021/5',
          Type: 'Int',
          Name: 'Y202105',
          Width: '80',
          Align: 'Right',
          FormulaRow: 'Sum',
          RelWidth: 1,
          CanEdit: 0
        }
      ],
      Events: {}
    },
    el:'sheetContainer'
  }
]


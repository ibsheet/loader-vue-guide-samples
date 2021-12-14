// ibsheet sample data
export const FormulaOption = 
  // sheet1
[
  {
    options: {
      Def: {
        Row: {
          CanFormula: 1,
          CalcOrder: 'sTheaterColor,sSeatColor,sNormalColor,sDigital2Color,sDigital4TextColor,sDigital4Color,sNote'
        }
      },
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
          Header: '지역',
          Name: 'sArea',
          Type: 'Text',
          Align: 'Center',
          Width: 150
        },
        {
          Header: '영화상영관수',
          Name: 'sTheater',
          Type: 'Int',
          ColorFormula: 'Value < 10 ? \'Green\' : \'\'',
          Width: 100
        },
        {
          Header: '스크린수',
          Name: 'sScreen',
          Type: 'Int',
          Width: 100
        },
        {
          Header: '좌석수',
          Name: 'sSeat',
          Type: 'Int',
          ColorFormula: 'Value > 5000 ? \'Gray\' : \'\'',
          Width: 150
        },
        {
          Header: '일반',
          Name: 'sNormal',
          Type: 'Int',
          ColorFormula: 'Value > 10 ? \'Purple\' : \'\'',
          Width: 100
        },
        {
          Header: 'Digital 2D',
          Name: 'sDigital2',
          Type: 'Int',
          ColorFormula: 'Value > 100 ? \'Red\' : \'\'',
          Width: 100
        },
        {
          Header: 'Digital 3D',
          Name: 'sDigital3',
          Type: 'Int',
          Width: 100
        },
        {
          Header: 'Digital 4D',
          Name: 'sDigital4',
          Type: 'Int',
          ColorFormula: 'Value > 1 ? \'Black\' : \'\'',
          TextColorFormula: 'Value > 1 ? \'Yellow\' : \'\'',
          Width: 100
        },
        {
          Header: 'Digital IMAX',
          Name: 'sDigitalImax',
          Type: 'Int',
          Width: 100
        },
        {
          Header: '전체 합계',
          Name: 'sNote',
          Type: 'Text',
          RelWidth: 1,
          Formula: fr => fr.Row.sTheater + fr.Row.sScreen + fr.Row.sSeat + fr.Row.sNormal + fr.Row.sDigital2 + fr.Row.sDigital3 + fr.Row.sDigital4 + fr.Row.sDigitalImax
        }
      ],
      Events: {}
    },
    el: 'sheetContainer'
  }
]


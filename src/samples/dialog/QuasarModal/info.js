export const ModalOption = 
  [ 
    {
      options: {
        Cfg: {
          SearchMode: 0,
          CustomScroll: 1,
          Style: 'IBMT'
        },
        Def: { Col: { RelWidth: 1 } },
        LeftCols: [
          {
            Type: 'Int',
            Name: 'SEQ'
          }
        ],
        Cols: [
          {
            Header: '문자열(Text)',
            Type: 'Text',
            Name: 'TextData',
            Width: 130,
            Align: 'Center',
          },
          {
            Header: '콤보(Enum)',
            Type: 'Enum',
            Name: 'ComboData',
            Width: 100,
            Align: 'Right',
            Enum: '|대기|진행중|완료',
            EnumKeys: '|01|02|03'
          },
          {
            Header: '버튼(Button)',
            Type: 'Button',
            Name: 'ISO',
            Width: 120,
            Align: 'Left',
            CanEdit: 0,
            Button: 'Button'
          },
          {
            Header: '정수(Int)',
            Type: 'Int',
            Name: 'IntData',
            Width: 90,
            Align: 'Right',
            Format: '#,##0'
          },
          {
            Header: '실수(Float)',
            Type: 'Float',
            Name: 'FloatData',
            Width: 110,
            Align: 'Right',
            Format: '#,##0.######'
          },
          {
            Header: '날짜(Date)',
            Type: 'Date',
            Name: 'DateData',
            Width: 170,
            Align: 'Center',
            EmptyValue: '날짜를 입력해주세요'
          },
          {
            Header: '패스워드(Pass)',
            Type: 'Pass',
            Name: 'PassData',
            Align: 'Center',
            Width: 120
          },
          {
            Header: '라디오(Radio)',
            Type: 'Radio',
            Name: 'RadioData',
            Width: 140,
            Align: 'Center',
            CanEdit: 1,
            Enum: '|상|중|하',
            EnumKeys: '|H:1|M:1|L:1'
          },
          {
            Header: {
              Value: '체크(Bool)',
              HeaderCheck: 1
            },
            Type: 'Bool',
            Name: 'CheckData',
            Align: 'Center',
            CanEdit: 1,
            Width: 100
          }
        ]
      },
      el: 'modalContainer',
      id : 'modalSheet'
    }
  ]
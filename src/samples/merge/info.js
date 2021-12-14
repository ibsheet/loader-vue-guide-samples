// ibsheet sample data
export const MergeOption = 
  // sheet1
  [
			{
			options: {
        Cfg: {
          SearchMode: 0,
          CustomScroll: 1,
          Style: 'IBMT'
        },
				LeftCols: [
					{
						Header: ['No', 'No'],
						Type: 'Int',
						Name: 'SEQ'
					}
				],
				Cols: [
					{
						Header: ['분류', '대분류'],
						Type: 'Text',
						Name: 'cls1',
						Width: 130
					},
					{
						Header: ['분류', '중분류'],
						Type: 'Text',
						Name: 'cls2',
						Width: 130
					},
					{
						Header: ['분류', '소분류'],
						Type: 'Text',
						Name: 'cls3',
						Width: 130
					},
					{
						Header: ['제품', '제품'],
						Type: 'Text',
						Name: 'goods',
						Width: 120,
						Format: '#,##0'
					},
					{
						Header: ['제품','가격'],
						Type: 'Text',
						Name: 'price',
						Width: 120,
						Format: '#,##0 원'
					},
					{
						Header: ['제품','상세설명'],
						Type: 'Text',
						Name: 'etc',
						Width: 180,
						RelWidth: 1
					}
				],
				Events: {}
			},
			el: 'sheetContainer'
		}
	]	
  


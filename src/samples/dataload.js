export const setData = (count) => {
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

	for (let i = 0; i < count; i++) {
		data.push({
			sCompany: company[Math.floor(Math.random() * 10)],
			sCountry: country[Math.floor(Math.random() * 10)],
			sSaleQuantity: Math.floor(Math.random() * 100000),
			sSaleIncrease: Math.floor(Math.random() * 10000),
			sPrice: Math.floor(Math.random() * 10000000),
			sSatisfaction: Math.floor(Math.random() * (100 - 50 + 1) + 50),
		});
	}
	const options = {
    Cfg: {
      SearchMode: 0,
      CustomScroll: 1,
      // Style: 'IBMR'
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
    Events: {}
  };

	return {data, options};
}
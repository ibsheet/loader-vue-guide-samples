const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 8000;
const { info } = require('./data.js');

// sleep 기능
const sleep = (ms) => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
}

/**
 * request : ctx.request (body & query & params)
 * response : ctx.body (String & JSON ...)
 */
/**
 * @path {GET} http://localhost:8000/
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get('/', ctx => {
  ctx.body = 'Hello Koa';
})

/**
 * @path {GET} http://localhost:8000/api/data
 * @description 요청 데이터 값이 없고 반환 값이 있는 GET Method
 */
router.get("/api/data", async ctx => {
  // param 응답 전송 (param 확인 가능)
	// res.send(ctx.request.query.ibpage + ',' + ctx.request.query.data + ',' + ctx.request.query.total + ',' + ctx.request.query.searchMode);
  info.Total = ctx.request.query.total || 15000;
  info.data = info.selectData(ctx.request.query.data);

	// sleep 실행
	await sleep(700);

	// json 정보 반환
  ctx.body = info;
})

// CORS 옵션
// let corsOptions = {
//   origin: process.env.CLIENT_HOST,
//   credentials: true,
// }
// app.proxy = true; // true 일때 proxy 헤더들을 신뢰함

app.use(cors()) // CORS 허용 -> 모든 도메인을 허용한다는 의미
  .use(bodyParser()) // Request Body 연결
  .use(router.routes()) // 라우터 연결
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log('bgs server is listening to port ' + port);
});

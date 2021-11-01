const Router = require('koa-router')
const db = require('../db/connect')
const router = new Router()
// http://localhost:20000/apis/user/getTest
// GET http://localhost:20000/apis/user/getTest?a=1&b=2&c=3
// x-www-form-urlencoded d=4&e=5&f=6
router.get('/getTest', async (ctx)=>{
  //params
  console.log(ctx.request.query)
  //form
  console.log(ctx.request.body)
  return ctx.send({query:ctx.request.query,form:ctx.request.body})
})

module.exports = router.routes()

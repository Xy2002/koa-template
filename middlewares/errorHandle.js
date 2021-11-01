const errorHandle = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 200
      return ctx.errorSend('000004', '未授权，访问被拒绝')
    } else {
      throw err
    }
  })
}

module.exports = errorHandle

const sendHandle = () => {
  const render = ctx => {
    return (detail, desc = '请求成功') => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = {
        code: '200',
        detail,
        desc
      }
    }
  }

  const loginRender = ctx => {
    return (token, desc = '登陆成功') => {
      ctx.set('Content-Type', 'application/json')
      // maxAge: day x hour x min x sec x ms
      ctx.cookies.set('jwt',token,{
        maxAge:  60 * 60 * 1000
      })
      ctx.body = {
        code: 200,
        desc
      }
    }
  }

  const loginErrorRender = ctx => {
    return (code,desc='登陆失败',reason)=>{
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code,
        desc,
        reason
      }
    }
  }

  const errorRender = ctx => {
    return (code, desc = '请求失败',reason) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = {
        code,
        desc,
        reason
      }
    }
  }

  return async (ctx, next) => {
    ctx.loginSend = loginRender(ctx)
    ctx.loginErrorSend = loginErrorRender(ctx)
    ctx.send = render(ctx)
    ctx.errorSend = errorRender(ctx)
    await next()
  }
}

module.exports = sendHandle

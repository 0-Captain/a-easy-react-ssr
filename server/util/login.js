const router = require('koa-router')()// prefix: /api/user
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', async (ctx) => {
  let reqLogin
  try {
    reqLogin = await axios.post(`${baseUrl}/accesstoken`, {
      accesstoken: ctx.request.body.accessToken
    })
  } catch (err) {
    if (err.response) {
      ctx.body = {
        success: false,
        data: err.response
      }
    }
  }

  if (reqLogin.status === 200 && reqLogin.data.success) {
    ctx.session.user = {
      accessToken: ctx.request.body.accessToken,
      loginName: reqLogin.data.loginname,
      id: reqLogin.data.id,
      avatarUrl: reqLogin.data.avatat_url
    }
    ctx.body = {
      success: true,
      data: reqLogin.data
    }
  }
})

module.exports = router.routes()

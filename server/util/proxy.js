const axios = require('axios')
const querystring = require('querystring')
const baseUrl = 'http://cnodejs.org/api/v1/'

module.exports = async (ctx) => {
  const user = ctx.session.user || {}
  const needAccessToken = ctx.query.needAccessToken
  if (!user.accessToken && needAccessToken) {
    ctx.status = 401
    ctx.body = {
      success: false,
      msg: 'need login'
    }
    return
  }

  let path = ctx.path
  path = path.split('/', 7).slice(2).join('/')

  const query = Object.assign({}, ctx.query, {
    accesstoken: (needAccessToken && ctx.method === 'GET') ? user.accessToken : ''
  })
  if (needAccessToken) delete query.needAccessToken

  const proxyRes = await axios(`${baseUrl}${path}`, {
    method: ctx.method,
    params: query,
    data: querystring.stringify(Object.assign({}, { accesstoken: user.accessToken }, ctx.request.body)),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'stream'
  })
  if (proxyRes.status === 200) {
    ctx.status = 200
    ctx.set('Content-Type', 'application/octet-stream')
    ctx.body = proxyRes.data
    // await proxyRes.data.pipe(fs.createWriteStream('./response.js'))
    // ctx.body = fs.createReadStream('./response.js')
  } else {
    ctx.status = proxyRes.status
    ctx.body = proxyRes.data
  }
}

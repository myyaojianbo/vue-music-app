// jsonp封装
// 引入最原始的jsonp
import originJSONP from 'jsonp'

// url表示传给服务端的地址（纯地址）
// data表示参数
// option对应具体的option，参照GitHub/webmodules/jsonp用法
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 封装函数，将url与data拼接
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
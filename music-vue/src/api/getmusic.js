// 抓取、获取歌曲来源数据
// import jsonp from 'src/common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

export function getMusic(mid) {
  const url = '/api/music'
  // const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 1819638027,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    uin: 0,
    cid: 205361747,
    format: 'json'
  })
  // return jsonp(url, data, options)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
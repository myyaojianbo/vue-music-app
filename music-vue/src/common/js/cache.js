// 操作和storage相关的逻辑
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200

// 封装数组插入函数，四个参数：数组、插入值、比较函数、最大长度
function insertArray(arr, val, compare, maxLen) {
  // 先查找数组中有没有val
  const index = arr.findIndex(compare)
  // 要插入的值在第一个的时候，直接返回，不操作
  if (index === 0) {
    return
  }
  // 如果要插入的值不在第一个
  if (index > 0) {
    // 删除检索到的值
    arr.splice(index, 1)
  }
  // 将要插入的值放置第一个位置
  arr.unshift(val)
  // 如果有最大长度限制，而且数组长度大于最大长度限制，删除最后一条记录
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

// 封装删除数组元素方法
function deleteFromArray(arr, compare, query) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 将搜索记录保存到本地searchlist
export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 从本地缓存读取searchlist
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

// 从本地搜索列表中删除记录
export function deleteSearch(query) {
  // 获取缓存中的搜索列表
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 保存数组并返回
  storage.set(SEARCH_KEY, searches)
  return searches
}

// 清除搜索记录
export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

// 播放存储到缓存中
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 从本地缓存读取播放数据
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  import {getMusic} from 'api/getmusic'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avator
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      // console.log(111)
      this._getDetail()
      // console.log(this.singer.id)
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            // console.log(res.data.list)
            this.songs = this._normalizeSongs(res.data.list)
            // console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {
            musicData
          } = item
          // console.log(musicData)
          if (musicData.songid && musicData.albummid) {
            // console.log(createSongLi(musicData))
            getMusic(musicData.songmid).then((res) => {
              if (res.code === ERR_OK) {
                // console.log(res)
                const svkey = res.data.items
                // console.log(vkey[0])
                const songVkey = svkey[0].vkey
                // console.log(songVkey)
                const newSong = createSong(musicData, songVkey)
                // console.log('newSong', newSong)
                ret.push(newSong)
              }
            })
          }
        })
        // console.log('ret', ret)
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  
  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background
    
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
<template>
  <Card>
    <template v-slot:title>
      热门推荐
    </template>
    <template v-slot:content >
      <ul v-for="item in recommendList" :key="item._id">
        <li class="recommend-li"  >
<!--          <a target="_blank" :href="item.link"></a>-->
          <router-link
            :to="{name: 'detail',query:{id: item._id,title: item.title}}"
            target = '_blank'
          >{{item.title}}
          </router-link>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
  import Card from './card'
  import { queryAllRecommend } from '../../api/recommend'
  export default {
    data() {
      return {
        recommendList: [
        ]
      }
    },
    components: {
      Card
    },
    created () {
      this.getAllRecommend()
    },
    methods: {
      getAllRecommend() {
        queryAllRecommend().then(result => {
          if (result.code === 0) {
            this.recommendList = result.data.result
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .recommend-li {
    position: relative;
    width: 220px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    color: #5d5d5d;
    font-size: 13px;
    padding-left: 15px;
    &:before{
      content: "";
      width: 3px;
      height: 3px;
      background-color: #5d5d5d;
      position: absolute;
      left: 5px;
      top: 15px;
    }
    a {
      color: #000;
      text-decoration: none;
    }
  }

</style>

<template>
  <Card>
    <template v-slot:title>
      友情链接
    </template>
    <template v-slot:content >
      <template v-for="item in labelList">
        <div :key="item._id"  class="link-tag"><a target="_blank" :href="item.link">{{item.name}}</a></div>
      </template>
    </template>
  </Card>
</template>

<script>
  import Card from './card'
  import { queryAllLinks } from '../../api/links'
  export default {
    data() {
      return {
        labelList: []
      }
    },
    components: {
      Card
    },
    created () {
      this.getAllLinks()
    },
    methods: {
      getAllLinks() {
        queryAllLinks().then(result => {
          if (result.code === 0) {
            this.labelList = result.data.result
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  .link-tag {
    margin: 5px;
    cursor: pointer;
    font-size: 13px;
    color: #666666;
    a {
      color: #666666;
      text-decoration: none;
    }
  }
</style>

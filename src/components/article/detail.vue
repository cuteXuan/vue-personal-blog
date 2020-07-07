<template>
    <div class="detail-page">
      <div class="title">
        <h1>{{detail.title}}</h1>
        <Introduction :author="detail.author" :date="detail.date_time" :num="detail.amount + 1"/>
      </div>
<!--      <div class="content">-->
<!--      </div>-->
      <mavon-editor class="content" v-html="detail.content_html">
      </mavon-editor>
    </div>
</template>

<script>
  import { getArticle } from '../../api/article'
  import Introduction from './introduction'
  export default {
    data() {
      return {
        detail: {
        }
      }
    },
    props: ['id'],
    watch: {
      id: function (newVal) {
        this.getDetailById(newVal)
      }
    },
    created() {
      this.getDetailById(this.id)
    },
    methods: {
      // 获取文章的信息
      getDetailById(id) {
        if (id) {
          getArticle(id).then(result => {
            console.log(result)
            this.detail = result.data.result[0]
          })
        }
      }
    },
    components: {
      Introduction
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .detail-page {
    /*background-color: #ffffff;*/
    .title {
      padding: 8px 20px 12px;
      background-color: #ffffff;
      margin-bottom: 7px;
      border-radius: 7px;
      h1 {
        font-size: 22px;
        opacity: 0.8;
        line-height: 25px;
      }
    }
    .content {
      padding: 20px;
    }
  }

</style>

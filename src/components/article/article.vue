<!-- 文章列表 -->
<template>
    <article>
      <h1 class="title"><slot></slot></h1>
      <template v-for="item in articleList">
        <div class="article-page" v-bind:key="item._id">
          <router-link
            :to="{name: 'detail',query:{id: item._id,title: item.title}}"
            target = '_blank'
          >
            <img :src="url + item.cover" @click="viewDetail(item)">
          </router-link>
          <div class="content">
            <router-link
              :to="{name: 'detail',query:{id: item._id,title: item.title}}"
              target = '_blank'
            >
            <h4 class="article-title">{{item.title}}</h4>
            </router-link>
            <div class="introduction">{{item.content_summary}} ...</div>
            <Introduction :author="item.author" :date="item.date_time" :num="item.amount"/>
          </div>
        </div>
      </template>
      <Pagination v-if="urlHash !== '#/'" :total="total"  @currentPageEvent="currentPageEvent" @pageSizeEvent="pageSizeEvent"/>
    </article>
</template>

<script>
  import { queryAll, queryByLabel } from '../../api/article'
  import { upPath } from '../../utils/path'
  import Introduction from './introduction'
  // 分页
  import Pagination from '../pagination'
  export default {
    data() {
      return {
        url: '',
        pageSize: 15,
        currentPage: 1,
        total: 0,
        // hash路径
        urlHash: '#/',
        articleList: []
      }
    },
    props: ['group', 'label'],
    components: {
      Introduction,
      Pagination
    },
    watch: {
      pageSize() {
        this.getArticle()
      },
      currentPage() {
        this.getArticle()
      },
      label: function () {
        this.getArticle()
      }
    },
    mounted() {
      this.url = upPath
      this.getUrlHash()
      this.getArticle()
    },
    methods: {
      // 获取当前路径
      getUrlHash() {
        this.urlHash = window.location.hash
        // console.log(window.location.hash)
      },
      // 获取文章列表
      async getArticle() {
        let result = {}
        if (this.label) {
          result = await queryByLabel(this.pageSize, this.currentPage, this.label)
        } else {
          result = await queryAll(this.pageSize, this.currentPage, this.group)
        }
        if (result.code === 0) {
          this.total = result.data.count
          this.articleList = result.data.result
          this.$emit('count', this.total)
        } else {
          this.$message.error('网络有些不好哎')
        }
      },
      // 获取当前的页数
      currentPageEvent(nowPage) {
        this.currentPage = nowPage
      },
      // 当前页面大小
      pageSizeEvent(size) {
        this.pageSize = size
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  article {
    background-color: #fff;
    border-radius: 6px;
    padding-bottom: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 36px;
      color: #333;
      border-bottom: #db6d4c 4px solid;
      margin-bottom: 20px;
      padding-left: 15px;
    }
    .article-page {
      display: flex;
      padding: 15px 20px 15px 10px;
      border-left: 4px solid #fff ;
      border-bottom: 2px solid #F1F1F1;
      img {
        width: 220px;
        height: 150px;
        border-radius: 10px;
        margin-right: 20px;
        cursor: pointer;
      }
      .content {
        a {
          text-decoration: none;
          .article-title {
            color: #555;
            font-size: 16px;
            font-weight: 700;
            padding: 10px 0;
            cursor: pointer;
          }
        }
        .title:hover {
          color: #db6d4c;
        }
        .introduction {
          color: #888;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
    .article-page:hover {
      border-left: 4px solid #db6d4c ;
    }
  }
</style>

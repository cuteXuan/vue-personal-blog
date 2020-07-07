<template>
    <div style="width: 90%;margin: 20px auto;">
      <template v-for="(item, index) in articleList">
          <div class="article_item" v-bind:key="item._id">
            <div class="title_message">
              <div v-if="item.type === '原创'" class="type">原创</div>
              <div v-else class="type zz">转载</div>
              <router-link
                :to="{name: 'detail',query:{id: item._id,title: item.title}}"
                target = '_blank'
              >
                <h4 class="title">{{item.title}}</h4>
              </router-link>
              <span class="recommend" v-if="item.isRecommend">荐</span>
            </div>
            <div class="content_summary">{{item.content_summary}}......</div>
            <div class="message">
              <Introduction :author="item.author" :date="item.date_time" :num="item.amount"/>
              <div class="control">
                <div v-if="!item.isRecommend" @click="recommend(item, index)">推荐</div>
                <div v-else @click="cancelRecommend(item, index)">取消推荐</div>
                <div>
                  <router-link
                    :to="{name: 'write',query:{id: item._id,title: item.title}}"
                    target = '_blank'
                  >
                  编辑
                  </router-link>
                </div>
                <div class="del" @click="articleDel(item, index)">删除</div>
              </div>
            </div>
          </div>
      </template>
      <Pagination :total="total"  @currentPageEvent="currentPageEvent" @pageSizeEvent="pageSizeEvent"/>
    </div>
</template>

<script>
  import Introduction from '../../components/article/introduction'
  import Pagination from '../../components/pagination'
  import { recommendAdd, recommendDelete } from '../../api/recommend'
  import { queryAll, delArticle } from '../../api/article'
  export default {
    data() {
      return {
        pageSize: 15,
        currentPage: 1,
        total: 0,
        articleList: [
        ]
      }
    },
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
      }
    },
    created () {
      this.getArticle()
    },
    methods: {
      // 获取文章列表
      getArticle() {
        queryAll(this.pageSize, this.currentPage, this.group).then(result => {
          this.total = result.data.count
          this.articleList = result.data.result
        })
      },
      // 推荐文章
      async recommend(item, index) {
        const tip = await this.tips('是否推荐这篇文章？')
        if (tip) {
          const data = {
            _id: item._id,
            title: item.title
          }
          const result = await recommendAdd(data)
          if (result.code === 0) {
            this.articleList[index].isRecommend = true
            this.$message.success(result.msg)
          } else {
            this.$message.error(result.msg)
          }
        }
      },
      // 取消推荐文章
      async cancelRecommend(item, index) {
        const tip = await this.tips('是否取消推荐这篇文章？')
        if (tip) {
          const { code, msg } = await recommendDelete(item._id)
          if (code === 0) {
            this.articleList[index].isRecommend = false
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        }
      },
      // 删除文章
      async articleDel(item, index) {
        const tip = await this.tips('是否删除这篇文章？')
        if (tip) {
          const { code } = await delArticle(item._id)
          if (code === 0) {
            this.articleList.splice(index, 1)
            this.total--
          }
        }
      },
      async tips(msg) {
        return this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return 1
        }).catch(() => {
          return 0
        })
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
  .article_item {
    padding: 16px 24px 12px 24px;
    border-bottom: 1px solid #f0f2f5;
    background-color: white;
    &:hover {
      background-color: rgb(249,250,252);
    }
    .title_message {
      display: flex;
      align-items: center;
      .type {
        color: #e33e33;
        background-color: rgba(227,62,51,0.1);
        width: 34px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        border-radius: 2px;
      }
      .zz {
        color: #67bb55;
        background-color: rgba(103,187,85,0.1);
      }
      a {
        color: #000;
        text-decoration: none;
        .title {
          margin-left: 15px;
          cursor: pointer;
          &:hover {
            color: #409EFF;
          }
        }
      }
      .recommend {
        margin-left: 18px;
        color: #e33e33;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid #e33e33;
        font-size: 13px;
        text-align: center;
        line-height: 18px;
      }
    }
    .content_summary {
      color: #888;
      font-size: 14px;
      line-height: 24px;
      margin: 10px 0;
    }
    .message {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .control {
        display: flex;
        font-size: 14px;
        div {
          margin-left: 10px;
          color: #409EFF;
          cursor: pointer;
          a {
            text-decoration: none;
            color: #409EFF;
          }
        }
        .del {
          color: #e33e33;
        }
      }
    }
  }
</style>

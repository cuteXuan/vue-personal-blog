<template>
  <div class="comments-page">
    <!--  留言框  -->
    <MessageBox @addComment="publishComment"/>
    <!--  评论装饰  -->
    <div class="article-comment-title">
      <span class="article-comment-word">评论</span>
      <div class="article-comment-line"></div>
    </div>
    <!--  留言列表  -->
    <div class="comment-content">
      <template v-for="(item,index) in commentList">
        <Contents v-bind:key="item._id" :comment="item" :index="index" class="contents-line"/>
      </template>
    </div>
  </div>
</template>


<script>
  import { commentAdd, queryAllComment } from '../../api/comment'
  import Contents from './content'
  import MessageBox from './messagebox'
  export default {
    data() {
      return {
        commentList: [
          {
            _id: 'vgd',
            state: false,
            nickname: '小轩轩',
            comment: '',
            commentDate: '2020-12-12',
            reply: [
            ]
          }
        ]
      }
    },
    components: {
      Contents,
      MessageBox
    },
    props: {
      commentType: {
        type: String,
        default: 'blogComment'
      }
    },
    created() {
      this.getComment()
    },
    watch: {
      commentType: function (newVal) {
        this.getComment()
      }
    },
    methods: {
      // 获取留言
      getComment() {
        if (this.commentType !== undefined) {
          queryAllComment(this.commentType).then(result => {
            result.data.result.forEach(item => {
              item.state = false
            })
            this.commentList = result.data.result
          })
        }
      },
      // 发布函数
      publishComment(data) {
        commentAdd(data).then(result => {
          result.data.result.state = false
          this.commentList.unshift(result.data.result)
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .comments-page {
    background-color: #ffffff;
    border-radius: 8px;
    .article-comment-title {
      clear: both;
      width: 95%;
      margin: 15% auto 6%;
      padding-bottom: 15px;
      .article-comment-word {
        font-size: 17px;
        color: #db6d4c;
        padding: 6px 15px 5px;
        border-radius: 10px 10px 0 0;
        border-right: 1px solid #db6d4c ;
        border-left: 1px solid #db6d4c ;
        border-top: 1px solid #db6d4c ;
      }
      .article-comment-line {
        left: 65px;
        width: 90%;
        border-bottom: 1px solid #db6d4c;
        margin-top: 3px;
        position: relative;
      }
    }
    .comment-content {
      width: 95%;
      margin: 0 auto 6%;
    }
  }
</style>

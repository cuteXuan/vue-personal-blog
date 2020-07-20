<template>
  <div class="comment-information">
    <Avatar :_id="comment.nickname" class="img"/>
    <div class="information-detail">
      <div class="main-detail">
        <div class="information-top">
          <div>
            {{comment.nickname}}
            <span>第 {{index+1}} 楼</span>
          </div>
          <div class="date">{{comment.commentDate|formatTimeHour}}</div>
        </div>
        <div class="information-content">{{comment.comment}}</div>
        <div class="chat" v-if="comment.state != undefined">
          <span v-if="!comment.state" @click="replyState(comment)"><i class="el-icon-chat-round"> 回复 </i></span>
          <span v-else @click="cancelState(comment)"><i class="el-icon-chat-round" > 取消回复 </i></span>
        </div>
      </div>
      <div v-if="comment.reply && comment.reply.length > 0">
        <contents
          v-for="(tempReply,tempIndex) in comment.reply"
          :key="tempReply.commentDate"
          :comment="tempReply"
          :index="tempIndex"/>
      </div>
      <Message-Box v-if="comment.state" @addComment="publishChildComment"/>
    </div>
  </div>
</template>

<script>
  import { commentAddChildren } from '../../api/comment'
  import Avatar from '../../components/avatar/index'
  import MessageBox from './messagebox'
  export default {
    name: 'contents',
    props: ['comment', 'index'],
    components: {
      Avatar,
      MessageBox
    },
    methods: {
      // 提交回复评论
      publishChildComment(data) {
        data._id = this.comment._id
        commentAddChildren(data).then(result => {
          if (result.code === 0) {
            this.comment.reply.push(data)
            this.comment.state = false
          }
        })
      },
      // 回复
      replyState(comment) {
        this.comment = comment
        comment.state = true
      },
      // 取消回复
      cancelState(comment) {
        this.comment = comment
        comment.state = false
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .comment-content {
    .comment-information {
      display: flex;
      padding: 25px 10px;
      .img {
        width: 42px;
        height: 42px;
        display: block;
        /*border-radius: 50%;*/
      }
      .information-detail {
        margin-left: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .main-detail {
          border-bottom: 1px solid #f1f1f1;
          padding-bottom: 10px;
          .information-top {
            margin-bottom: 10px;
            color: #26709A;
            font-size: 14px;
            font-family: Tahoma,sans-serif;
            display: flex;
            justify-content: space-between;
            span,.date {
              font-size: 12px;
              margin-left: 15px;
              color: #9B9B9B;
            }
            .date {
              margin-right: 15px;
            }
          }
          .information-content {
            line-height: 190%;
            color: #444444;
            letter-spacing: 1.5px;
            font-size: 14px;
          }
          .chat {
            font-size: 12px;
            margin-left: 15px;
            color: #9B9B9B;
            text-align: right;
            padding: 10px 0;
            span {
              margin-right: 15px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>

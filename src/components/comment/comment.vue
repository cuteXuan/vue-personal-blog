<template>
  <div class="comments-page">
    <!--  评论框  -->
    <div class="publish">
      <el-input
        :disabled="!isDisabled"
        type="textarea"
        :rows="5"
        :placeholder="isDisabled?'请输入您的评论':''"
        v-model="comment">
      </el-input>
      <p v-show="!isDisabled" class="tips">您需要登陆，才可以发表评论哦。<a href="" target = '_blank'>点击登陆</a></p>
      <el-button @click="addComment" :disabled="!isDisabled">发表评论</el-button>
    </div>

    <div class="article-comment-title">
      <span class="article-comment-word">评论</span>
      <div class="article-comment-line"></div>
    </div>
    <!--  留言功能  -->
    <div class="content">
      <div class="information" v-for="item in commentList" :key="item._id">
        <img src="/tx/1.jpeg">
        <div class="content-detail">
          <p class="content-floor">{{item.name}}#{{item.floor}}楼</p>
          <p class="content-comment">{{item.comment}}</p>
          <div class="content-replay">
            <p class="replay-date">{{item.date}}</p>
            <div class="replay-box">
              <span class="el-icon-chat-round"></span>
              <p @click="manageState(item._id,item.floor,item.name)">回复</p>
            </div>
          </div>

          <div v-if="item.replays">
<!--            <div class="replays replays-line" v-for="replay in item.replays">-->
<!--              <template>-->
<!--                <div class="replays-relationship">-->
<!--                  <p >{{replay.input}}：</p>-->
<!--                  <p>@{{replay.respondent}}</p>-->
<!--                </div>-->
<!--                <p>{{replay.content}}</p>-->
<!--                <div class="content-replay">-->
<!--                  <p class="replay-date">{{replay.date}}</p>-->
<!--                  <div class="replay-box">-->
<!--                    <span class="el-icon-chat-round"></span>-->
<!--                    <p @click="manageState(item._id,item.floor,replay.input)">回复</p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--            </div>-->
          </div>
          <!--  点击回复后的模块  -->
          <div class="publishBox" v-show="item.state">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入您的评论"
              v-model="publishBoxComment">
            </el-input>
            <div class="btn-box">
              <el-button @click="cancel">取消</el-button>
              <el-button type="success" @click="addChildrenComment">发布</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        comment: '', // 评论的内容
        publishBoxComment: '', // 回复评论的内容
        user: '',
        respondent: '', // 被回复的人
        floor: 0, // 回复的楼层,
        id: null,
        detailToComments: '',
        commentList: []
      }
    },
    props: ['detailToComment'],
    computed: {
      isDisabled: function () {
        const res = ''
        return !!res
        // return !!this.$store.getters.nickname
      }
    },

    async mounted() {
      const { status, data: { user } } = await this.$axios.get('/users/getUser')
      if (status === 200) {
        this.user = window.decodeURIComponent(user)
      }
      if (typeof (this.detailToComment) === 'undefined') {
        this.detailToComments = 'leaveMessage'
      } else {
        this.detailToComments = this.detailToComment
      }

      var that = this
      this.$axios.post('/comment/messageBoard', {
        index: this.detailToComments
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data.code === 0) {
            this.commentList = data.commentList

            console.log(this.commentList)
            this.commentList.map(function (item, index) {
              that.$set(item, 'state', false)
              that.$set(item, 'floor', index + 1)
            })
          }
        }
      })
    },

    methods: {
      // 发布函数
      addComment() {
        // 请求添加评论
        this.$axios.post('/comment/addComment', {
          index: this.detailToComment,
          comment: this.comment,
          name: this.user
        }).then(({ status }) => {
          if (status === 200) {
            alert('发布成功')
          }
        })
      },
      // 回复函数
      addChildrenComment() {
        console.log(this.id, this.user, this.respondent, this.publishBoxComment)
        this.$axios.post('/comment/addChildrenComment', {
          id: this.id,
          input: this.user,
          respondent: this.respondent,
          content: this.publishBoxComment
        }).then(({ status, data }) => {
          if (status === 200) {
            alert('回复成功')
          }
        })
      },
      // 点击回复按钮的操作
      manageState(id, index, name) {
        // 将之前的全部变成false
        this.commentList.map(function (item) {
          item.state = false
        })
        // 弹出回复框
        this.id = id
        this.commentList[index - 1].state = true
        this.floor = index
        this.respondent = name
      },
      // 点击取消按钮
      cancel() {
        this.commentList[this.floor - 1].state = false
      }
    }
  }
</script>


<style lang="scss" scoped>
  .comments-page {
    .publish{
      width: 90%;
      margin: 0 auto;
      position: relative;
      .tips {
        position: absolute;
        left: 30px;
        top: 50px;
        a {
          text-decoration: none;
          color: #3490dc;
        }
      }
      .el-textarea__inner {
        text-align: center;
        vertical-align: middle;
        border: 1px solid #db6d4c ;
        color: #db6d4c;
        font-size: 52px;
      }
      .el-button {
        margin-top: 20px;
        float: right;
        background-color: #db6d4c;
        border-color: #db6d4c;
        color: #fff;
      }
    }
    .article-comment-title {
      clear: both;
      width: 95%;
      margin: 15% auto 6%;
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
        width: 87%;
        border-bottom: 1px solid #db6d4c;
        margin-top: 3px;
        position: relative;
      }
    }
    .content {
      width: 90%;
      margin: 0 auto;
      .information {
        display: flex;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
        .content-detail {
          width: 85%;
          margin: 0 auto;
          .content-replay {
            display: flex;
            margin-bottom: 5px;
            .replay-date {
              color: #969696 ;
              margin: 0;
            }
            .replay-box {
              display: flex;
              span{
                display: inline-block;
                height: 100%;
                vertical-align: bottom;
                line-height: 20.8px;
                padding: 0 5px ;
              }
              p {
                margin: 0;
                font-size: 16px;
                font-family: "微软雅黑";
                padding: 0 10px ;
              }

            }
          }
          .replays {
            padding: 10px;
            .replays-relationship {
              display: flex;
              p {
                margin: 0;
              }
            }
          }
          .replays-line {
            border-left: 2px solid #cccccc;
            border-bottom: 1px dashed #cccccc;
          }
          .publishBox {
            margin: 20px auto;
            .btn-box {
              margin: 20px auto;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }

  }
</style>

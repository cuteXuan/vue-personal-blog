<template>
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
</template>

<script>
  export default {
    data() {
      return {
        comment: ''
      }
    },
    computed: {
      isDisabled: function () {
        // const res = ''
        // return !!res
        return !!this.$store.getters.nickname
      }
    },
    methods: {
      addComment() {
        const data = {
          comment: this.comment,
          nickname: this.$store.getters.nickname
        }
        this.$emit('addComment', data)
        this.comment = ''
        // commentAdd(data).then(result => {
        //   console.log(result)
        // })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .publish{
    width: 90%;
    margin: 0 auto;
    padding-top:50px;
    position: relative;
    .tips {
      position: absolute;
      left: 30px;
      top: 100px;
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
</style>

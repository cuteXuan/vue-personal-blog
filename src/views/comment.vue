<template>
  <div class="comment-page">
    <h1 class="title">博客留言</h1>
    <Comment :commentType="blogComment"/>
  </div>
</template>

<script>
  import Comment from '../components/comment/comments'
  export default {
    components: {
      Comment
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .comment-page {
    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 36px;
      color: #333;
      border-bottom: #db6d4c 4px solid;
      margin-bottom: 20px;
      padding-left: 15px;
    }
  }

</style>

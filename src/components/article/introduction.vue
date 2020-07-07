<!-- 发布人，时间以及阅读数量的 -->
<template>
  <div class="introduction-box">
    <span><i class="el-icon-s-custom"> {{author}} </i></span>
    <span><i class="el-icon-time"> {{date | formatTime}}  </i></span>
    <span><i class="el-icon-view"> {{num}} 浏览</i></span>
  </div>
</template>

<script>
  export default {
    props: ['author', 'date', 'num']
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .introduction-box {
    padding: 10px 0;
    color: #555;
    font-size: 12px;
    font-family: "Microsoft Yahei","Helvetica Neue",Helvetica,Arial,sans-serif;
    line-height: 20px;
    span {
      margin-right: 15px;
    }
  }
</style>

<template>
  <div class="box-card">
    <div  class="label-title">
      <span ><slot name="title"></slot></span>
    </div>
    <div class="content-box">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss" >
  .box-card {
    margin-left: 10px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    padding: 10px;
    .label-title {
      width: 100%;
      height: 40px;
      font-weight: 400;
      font-size: 18px;
      line-height: 40px;
      border-bottom: 2px solid #fbfbfb;
    }
    .content-box {
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap ;
    }
  }
</style>

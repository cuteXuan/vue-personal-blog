<!-- 轮播图 -->
<template>
  <el-carousel height="300px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in carouselList" :key="item._id">
<!--      <h3 class="medium">{{ item }}</h3>-->
      <img :src="url + item.carouselAddress" class="carousel-img">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  import { queryAllCarousel } from '../api/carousel'

  export default {
    data() {
      return {
        url: '',
        carouselList: []
      }
    },
    created () {
      this.url = process.env.VUE_APP_UPLOAD
      this.getCarousel()
    },
    methods: {
      getCarousel() {
        queryAllCarousel().then(result => {
          if (result.code === 0) {
            this.carouselList = result.data.result
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-carousel {
    margin-bottom: 15px;
    .carousel-img {
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

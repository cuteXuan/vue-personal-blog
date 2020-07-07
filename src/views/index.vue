<template>
    <div class="index-page">
      <Carousel/>
      <Article :group="null">最新文章</Article>
    </div>
</template>

<script>
  import Carousel from '../components/carousel'
  import Article from '../components/article/article'
  export default {
    data() {
      return {
        topHeight: 400
      }
    },
    components: {
      Carousel,
      Article
    },
    mounted () {
    }
  }
</script>

<style lang="scss"  scoped>
  .section {
    width: 1150px;
    margin: 80px auto 70px;
  }
</style>

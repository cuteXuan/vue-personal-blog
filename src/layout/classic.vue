<template>
  <div class="index-layout">
    <Header/>
    <section class="section">
      <router-view/>
    </section>
    <Footer/>
    <back-top :topHeight = 'topHeight'/>
  </div>
</template>

<script>
  import Header from '../components/header/index'
  import Footer from '../components/footer/index'
  import backTop from '../components/backtop'
  export default {
    data () {
      return {
        topHeight: 400
      }
    },
    components: {
      Footer,
      Header,
      backTop
    }
  }
</script>

<style lang="scss"  scoped>
  .section {
    width: 1150px;
    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 70px;
  }
</style>

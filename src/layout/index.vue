<template>
    <div class="index-layout">
      <Header/>
      <section class="section">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="16" :lg="17" :xl="17">
            <router-view/>
<!--            <Carousel/>-->
<!--            <Article>最新文章</Article>-->
          </el-col>
          <el-col :md="7" :lg="7" :xl="7" class="hidden-sm-and-down">
            <aside>
              <Label/>
              <Recommend/>
              <Link/>
            </aside>
          </el-col>
        </el-row>
      </section>
      <Footer/>
      <back-top :topHeight = 'topHeight'/>
    </div>
</template>

<script>
  import Header from '../components/header/index'
  import Footer from '../components/footer/index'
  import Label from '../components/aside/label'
  import Recommend from '../components/aside/recommend'
  import Link from '../components/aside/link'
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
      backTop,
      Label,
      Recommend,
      Link
    },
    mounted () {
      // console.log(this.$store.state.count)
      // this.$store.commit('add', 0)
      // this.$store.commit('add', 100)
      // console.log(this.$store.state.count)
    }
  }
</script>

<style lang="scss"  scoped>
  .section {
    width: 1150px;
    margin: 80px auto 70px;
    min-height: 600px;
  }
</style>

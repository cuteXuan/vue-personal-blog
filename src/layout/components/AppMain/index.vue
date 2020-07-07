<template>
    <section class="app-main">
<!--      <transition>-->
<!-- :include="cachedViews"  :key="key"     -->
        <keep-alive >
          <router-view />
        </keep-alive>
<!--      </transition>-->
    </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
    },
    created () {
      console.log(this.$store)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .app-main {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

</style>

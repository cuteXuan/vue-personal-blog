<template>
    <div class="sidebar">
      <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        mode="vertical"
      >
        <SidebarItem v-for="route in addRoute" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
      </el-scrollbar>
    </div>
</template>

<script>
  import SidebarItem from './SidebarItem'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'toggleStatus',
        'addRoute'
      ]),
      // 默认激活状态
      activeMenu() {
         const route = this.$route
         const { path, meta } = route
         if (meta.activeMenu) {
           return meta.activeMenu
         }
         return path
      },
      // 当前
      isCollapse() {
        return !this.toggleStatus
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>

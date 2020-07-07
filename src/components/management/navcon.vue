<!-- 顶部菜单 -->
<template>
  <el-menu mode="horizontal" background-color="#334157" text-color="#fff">
    <el-button>
      <img class="show-img"  @click="toggle(collapsed)">
    </el-button>
    <el-submenu index="2">
      <template slot="title">欢迎您：{{user}}</template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item @click="person" index="2-2">个人中心</el-menu-item>
      <el-menu-item @click="exit" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        collapsed: true,
        user: ''
      }
    },
    mounted() {
      this.user = this.$store.state.loginInInfo.lvUserName
    },
    methods: {
      // 切换显示
      toggle(showtype) {
        this.collapsed = !showtype
        this.$root.Bus.$emit('toggle', this.collapsed)
      },
      // 个人中心
      person() {
        this.$router.push({ path: '/person/person' })
      },
      // 退出登录
      exit() {
        this.$store.commit('removeLoginInfo')
        this.$router.push({ path: '/login' })
        this.informationPrompt('success', '退出成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-menu {
    .el-button {
      height: 60px;
      background-color: transparent;
      border: none;
      .show-img {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 17px;
        left: 17px;
      }
    }
    .el-submenu {
      float: right;
    }
  }
</style>

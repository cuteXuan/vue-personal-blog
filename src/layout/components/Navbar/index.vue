<template>
    <div class="navBar" >
      <Hamburger class="hamburger-container" :is-active="toggleStatus" @toggleClick="toggleClickBar"/>
      <div class="navBar-right">
        <el-button type="danger"><a href="#/essays/write" target="_blank">写文章</a></el-button>
        <div class="dropout" @click="handleDropOut">
          <i class="el-icon-caret-bottom"></i>
          <span>退出登录</span>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '../../../components/Hamburger/index'
  export default {
    components: {
      Hamburger
    },
    computed: {
      ...mapGetters([
        'toggleStatus'
      ]),
      classObj() {
        return {
          hideSidebar: !this.toggleStatus,
          openSidebar: this.toggleStatus
        }
      }
    },
    methods: {
      // 修改状态
      toggleClickBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      // 退出登录
      handleDropOut() {
      }
    }
  }
</script>

<style lang="scss"  scoped>
  .navBar {
    height: 50px;
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .hamburger-container {
      line-height: 50px;
      cursor: pointer;
    }
    .navBar-right {
      margin-right: 20px;
      display: flex;
      align-items: center;
      .el-button {
        margin-right: 20px;
        a {
          text-decoration: none;
          color: white;
        }
        &:hover {
          cursor: pointer;
        }
      }
      .dropout {
        cursor: pointer;
      }
    }
  }
</style>

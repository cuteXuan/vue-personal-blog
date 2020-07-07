<template>
  <div class="wrapper" :class="classObj">
    <Sidebar class="sidebar-container"/>
    <div class="main-container">
      <NavBar/>
      <AppMain class="management-container"/>
    </div>
  </div>
</template>

<script>
  import AppMain from './components/AppMain/index'
  import NavBar from './components/Navbar/index'
  import Sidebar from './components/Sidebar/index'
  import { mapGetters } from 'vuex'
  export default {
    name: 'Management',
    components: {
      AppMain,
      NavBar,
      Sidebar
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
    }
  }
</script>


<style lang="scss">
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .sidebar-container {
      transition: width 0.3s;
      width: 210px !important;
      background-color: #304156;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
    .main-container {
      position: relative;
      /*min-width: 100%;*/
      margin-left: 210px;
      transition: margin-left 0.3s;
      .management-container {
        margin: 20px 0;
      }
    }
  }

  .hideSidebar {
    .sidebar-container {
      width: 54px !important;
    }

    .main-container {
      margin-left: 54px;
    }

    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
        .svg-icon {
          margin-left: 20px;
        }
        i {
          margin-left: 18px;
        }
      }
    }

    .el-submenu {
      overflow: hidden;
      &>.el-submenu__title {
        padding: 0 !important;
        .svg-icon {
          margin-left: 20px;
        }
        i {
          margin-left: 18px;
        }
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

    .el-menu--collapse {
      .el-submenu {
        &>.el-submenu__title {
          &>span {
            height: 0;
            width: 0;
            overflow: hidden;
            visibility: hidden;
            display: inline-block;
          }
        }
      }
    }
  }
  .el-menu--collapse .el-menu .el-submenu {
    min-width: 210px !important;
  }
  // mobile responsive
  .mobile {
    .main-container {
      margin-left: 0px;
    }

    .sidebar-container {
      transition: transform 0.3s;
      width: 210px !important;
    }

    &.hideSidebar {
      .sidebar-container {
        pointer-events: none;
        transition-duration: 0.3s;
        transform: translate3d(-210px, 0, 0);
      }
    }
  }
  .withoutAnimation {

    .main-container,
    .sidebar-container {
      transition: none;
    }
  }
  // when menu collapsed
  .el-menu--vertical {
    &>.el-menu {
      .svg-icon {
        margin-right: 16px;
      }
      i {
        margin-left: 18px;
      }
    }

    .nest-menu .el-submenu>.el-submenu__title,
    .el-menu-item {
      &:hover {
        // you can use $subMenuHover
        background-color: #263445 !important;
      }
    }

    // the scroll bar appears when the subMenu is too long
    >.el-menu--popup {
      max-height: 100vh;
      overflow-y: auto;

      &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
      }

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
      }
    }
  }

</style>

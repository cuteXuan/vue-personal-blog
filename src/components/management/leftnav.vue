<!-- 左边导航条 -->
<template>
  <el-menu :default-active="$route.path" :collapse="collapsed" collapse-transition router unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="title-box">
      <p>文鸟食堂系统</p>
    </div>
    <el-submenu v-for="item in allMenu" :key="item.menuName" :index="item.menuName">
      <template slot="title">
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.menuName}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item  v-for="items in item.menus" :index="'/'+items.url" :key="items.menusName">
          <i class="iconfont" :class="items.icon"></i>
          <span>{{items.menusName}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false,
        allMenu: []
      }
    },
    // 创建完毕状态(里面是操作)
    created() {
      const res = {
        success: true,
        data: [
          {
            icon: 'icon-bird-order',
            menuName: '订单管理',
            menus: [
              {
                menusName: '配餐管理',
                url: 'order/catering'
              },
              {
                menusName: '订单管理',
                url: 'order/order'
              }
            ]
          },
          {
            icon: 'icon-bird-commodity',
            menuName: '商品管理',
            menus: [
              {
                menusName: '价格管理',
                url: 'commodity/price'
              },
              {
                menusName: 'Banner管理',
                url: 'commodity/banner'
              }
            ]
          },
          {
            icon: 'icon-bird-lunch',
            menuName: '午餐管理',
            menus: [
              {
                menusName: '菜单管理',
                url: 'lunch/menu'
              },
              {
                menusName: '套餐管理',
                url: 'lunch/lunch'
              },
              {
                menusName: '午餐日期配置',
                url: 'lunch/date'
              }
            ]
          },
          {
            icon: 'icon-bird-user',
            menuName: '用户管理',
            menus: [
              {
                menusName: '用户钱包',
                url: 'user/wallet'
              },
              {
                menusName: '星座卡',
                url: 'user/constellation'
              },
              {
                menusName: '发票管理',
                url: 'user/invoice'
              }
            ]
          },
          {
            icon: 'icon-bird-system',
            menuName: '系统管理',
            menus: [
              {
                menusName: '系统设置',
                url: 'system/system'
              }
            ]
          }
        ],
        msg: 'success'
      }
      this.allMenu = res.data
      // 监听
      this.$root.Bus.$on('toggle', value => {
        this.collapsed = !value
      })
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }
  .el-menu {
    border: none;
    .title-box {
      height: 40px;
      line-height: 40px;
      color: #9d9d9d;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      padding: 20px 0px;
    }
    .el-submenu {
      .iconfont {
        margin-right: 7px;
      }
      .el-menu-item-group {
        .el-menu-item-group__title {
          padding: 0;
        }
      }
    }
    .el-menu-item-group {
      .el-menu-item-group__title {
        padding: 0;
      }
    }
  }
</style>

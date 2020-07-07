<template>
    <header class="header">
      <div class="header-box">
        <h1 class="logo">LZXPer博客</h1>
        <nav class="nav">
          <template v-for="item in navList">
            <router-link
              class="nav-item"
              :to="item.path"
              v-bind:key="item.name"
              exact
              >
              {{item.name}}
            </router-link>
          </template>
        </nav>
      </div>
    </header>
</template>

<script>
  export default {
    data() {
      return {
        navList: [
          {
            path: '/',
            name: '首页'
          },
          {
            path: '/document',
            name: '技术文档'
          },
          {
            path: '/essay',
            name: '随笔'
          },
          {
            path: '/process',
            name: 'Blog发展'
          },
          {
            path: '/comment',
            name: '留言'
          },
          {
            path: '/about',
            name: '关于我'
          }
        ]
      }
    }
  }
</script>

<style lang="scss"  scoped>
  .header {
    width: 100%;
    background-color: #2C2C2C;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    .header-box {
      width: 1000px;
      margin: 0 auto;
      display: flex;
      .logo {
        line-height: 52px;
        color: white;
        font-size: 26px;
        text-align: right;
        cursor: pointer;
        margin-right: 10px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
      }
      .nav {
        flex: 1;
        height: 52px;
        line-height: 52px;
        display: flex;
        /*justify-content: space-between;*/
        .nav-item {
          padding: 0 30px;
          margin-right: 10px;
        }
        .nav-item:link,:visited  {
          color: white;
          text-decoration: none;
        }
        .nav-item:hover {
          background-color: #404040;
        }
      }
    }
    .router-link-active {
      background-color: #404040;
    }
  }

</style>

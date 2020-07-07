<template>
  <div class="block timeTem">
    <h1 class="title">博客更新日志</h1>
    <el-timeline >
      <template v-for="item in versionList">
        <el-timeline-item :key="item._id" :timestamp="item.data_time | formatTime" placement="top">
          <el-card>
            <h4 class="timeline_title">{{item.version_name}}</h4>
            <p>{{item.version_content}}</p>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>
  </div>
</template>

<script>
  import { queryAllVersion } from '../api/version'
  export default {
    data() {
      return {
        versionList: []
      }
    },
    created () {
      this.getAllVersion()
    },
    methods: {
      getAllVersion() {
        queryAllVersion().then(result => {
          if (result.code === 0) {
            this.versionList = result.data.result
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .timeTem {
    background-color: #fff;
    border-radius: 6px;
    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 36px;
      color: #333;
      border-bottom: #db6d4c 4px solid;
      margin-bottom: 20px;
      padding-left: 15px;
    }
    .el-timeline {
      padding: 15px 20px 15px 10px;
      border-left: 4px solid #fff ;
      border-bottom: 2px solid #F1F1F1;
      .timeline_title {
        padding-bottom: 15px;
        font-size: 15px;
      }
    }
  }
</style>

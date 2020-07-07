<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[1,15, 20, 25, 30]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
  export default {
    data() {
      return {
        pageSize: 15,
        currentPage: 1
      }
    },
    props: ['total'],
    mounted() {
      this.handleCurrentChange(this.currentPage)
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('currentPageEvent', val)
        this.$emit('pageSizeEvent', this.pageSize)
      },
      handleSizeChange(val) {
        console.log(`当前页: ${val}`)
        this.pageSize = val
        this.handleCurrentChange(this.currentPage)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .el-pagination {
    text-align: right;
    margin-top: 40px;
    margin-right: 20px;
  }
</style>

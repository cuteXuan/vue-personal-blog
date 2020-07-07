<template>
  <div class="index-page">
    <Detail :id="id"></Detail>
  </div>
</template>

<script>
  import Detail from '../components/article/detail'
  export default {
    data() {
      return {
        id: ''
      }
    },
    components: {
      Detail
    },
    created () {
      const { id, title } = this.$route.query
      document.title = title
      this.getDetailById(id)
    },
    methods: {
      // 获取详情
      getDetailById(id) {
        this.id = id
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .section {
    width: 1150px;
    margin: 80px auto 70px;
  }

</style>

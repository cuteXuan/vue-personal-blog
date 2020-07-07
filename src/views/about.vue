<template>
    <div>
      <Detail :id="id"/>
    </div>
</template>

<script>
  import { getAboutId } from '../api/article'
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
      this.getAboutId()
    },
    methods: {
      // 获取关于我的id
      getAboutId() {
        getAboutId().then(result => {
          this.id = result.data[0]._id
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>

<template>
  <div class="index-page">
    <Article :label="label" @count="getCount">“ {{label}} ” 查询,共查询到 {{count}} 条数据</Article>
  </div>
</template>

<script>
  import Article from '../components/article/article'
  export default {
    data() {
      return {
        label: '',
        count: 0
      }
    },
    components: {
      Article
    },
    created () {
      const { label } = this.$route.query
      this.label = label
    },
    watch: {
      '$route.query': function(newVal) {
        this.label = newVal.label
      }
    },
    methods: {
      getCount(val) {
        this.count = val
      }
    }
  }
</script>

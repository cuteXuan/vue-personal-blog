<template>
  <Card>
    <template v-slot:title>
      热门标签
    </template>
    <template v-slot:content >
      <template v-for="item in labelList">
        <el-tag :key="item._id" :type="item.colorType">
          <router-link
            tag="span"
            :to="{name: 'label',query:{label: item.label}}"
          >
          {{item.label}}
          </router-link>
        </el-tag>
      </template>
    </template>
  </Card>
</template>

<script>
  import Card from './card'
  import { queryAllLabel } from '../../api/label'
  export default {
    data() {
      return {
        labelList: [
        ]
      }
    },
    components: {
      Card
    },
    mounted() {
      this.getLabelList()
    },
    methods: {
      getLabelList() {
        const colorType = ['', 'success', 'info', 'warning', 'danger']
        queryAllLabel().then(result => {
          result.data.result.forEach(item => {
            item.colorType = colorType[Math.floor(Math.random() * 4)]
          })
          this.labelList = result.data.result
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  .el-tag {
    margin: 5px;
    cursor: pointer;
  }
</style>



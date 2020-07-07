<template>
  <div style="width: 90%;margin: 20px auto;">
    <el-table
      ref="singleTable"
      :data="linksData"
      highlight-current-row
     >
      <el-table-column
        label="编号"
        type="index"
        width="100"
      >
      </el-table-column>
      <el-table-column
        property="name"
        label="友链名称">
      </el-table-column>
      <el-table-column
        property="link"
        label="链接">
      </el-table-column>
      <el-table-column
        property="create_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="linkDialog = true,linksForm = scope.row ,isAdd=false">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add" @click="linkDialog = true,isAdd=true" >+添加友情链接</div>
    <el-dialog
      title="添加友情链接"
      :visible.sync="linkDialog"
      width="30%">
      <el-form :model="linksForm" label-width="80px">
        <el-form-item label="友链名字">
          <el-input v-model="linksForm.name"></el-input>
        </el-form-item>
        <el-form-item label="友链链接">
          <el-input v-model="linksForm.link"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkDialog = false,linksForm = {}">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryAllLinks, linksAdd, linksDelete, linksUpdate } from '../../api/links'
  export default {
    data() {
      return {
        linksData: [],
        linksForm: {
          name: '',
          link: ''
        },
        linkDialog: false,
        isAdd: true
      }
    },
    created() {
      this.getAllLinks()
    },
    methods: {
      confirmSubmit() {
        if (this.isAdd) {
          this.addLinks()
        } else {
          this.handleEdit()
        }
        this.linkDialog = false
        this.linksForm = {}
      },
      getAllLinks() {
        queryAllLinks().then(result => {
          if (result.code !== 0) {
            this.$message({
              type: 'error',
              message: result.msg || '网络有点慢'
            })
          } else {
            this.linksData = result.data.result
          }
        })
      },
      addLinks() {
        linksAdd(this.linksForm).then(result => {
          if (result.code === 0) {
            this.linksData.push(result.data.result)
            this.tip('success', result.msg)
          } else {
            this.tip('error', result.msg)
          }
        })
      },
      handleEdit() {
        linksUpdate(this.linksForm).then(result => {
          if (result.code === 0) {
            this.tip('success', result.msg)
          } else {
            this.tip('error', result.msg)
          }
        })
      },
      handleDelete(index, row) {
        linksDelete(row._id).then(result => {
          if (result.code === 0) {
            console.log(index)
            this.linksData.splice(index, 1)
            this.tip('success', result.msg)
          } else {
            this.tip('error', result.msg)
          }
        })
      },
      tip(type, msg) {
        this.$message({
          type: type,
          message: msg
        })
      }
    }
  }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
  .add {
    width: 300px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,.65);
    border: 1px #ccc dashed;
    cursor: pointer;
    margin: 50px auto;
  }

</style>

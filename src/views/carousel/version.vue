<template>
  <div style="width: 90%;margin: 20px auto;">
    <el-table
      ref="singleTable"
      :data="versionData"
      highlight-current-row
    >
      <el-table-column
        label="编号"
        type="index"
        width="100"
      >
      </el-table-column>
      <el-table-column
        property="version_name"
        label="版本编号">
      </el-table-column>
      <el-table-column
        property="data_time"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        property="version_content"
        label="版本内容">
      </el-table-column>
      <el-table-column
        property="address"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="versionDialog = true,versionForm = scope.row ,isAdd=false">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add" @click="versionDialog = true,isAdd=true" >+添加新的版本</div>
    <el-dialog
      title="添加友情链接"
      :visible.sync="versionDialog"
      width="30%">
      <el-form :model="versionForm" label-width="80px">
        <el-form-item label="版本时间">
          <el-date-picker
            v-model="versionForm.data_time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="版本名字">
          <el-input v-model="versionForm.version_name"></el-input>
        </el-form-item>
        <el-form-item label="版本描述">
          <el-input v-model="versionForm.version_content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="versionDialog = false,versionForm = {}">取 消</el-button>
        <el-button type="primary" @click="confirmSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { queryAllVersion, versionAdd, versionDelete, versionUpdate } from '../../api/version'
  export default {
    data() {
      return {
        versionData: [
        ],
        versionForm: {
          version_name: '',
          version_content: '',
          data_time: ''
        },
        versionDialog: false,
        isAdd: true
      }
    },
    created() {
      this.getAllVersion()
    },
    methods: {
      // 确认提交
      confirmSubmit() {
        if (this.isAdd) {
          this.addVersion()
        } else {
          this.handleEdit()
        }
        this.versionDialog = false
        this.versionForm = {}
      },
      getAllVersion() {
        queryAllVersion().then(result => {
          if (result.code !== 0) {
            this.$message({
              type: 'error',
              message: result.msg || '网络有点慢'
            })
          } else {
            this.versionData = result.data.result
          }
        })
      },
      addVersion() {
        versionAdd(this.versionForm).then(result => {
          if (result.code === 0) {
            this.versionData.unshift(result.data.result)
            this.tip('success', result.msg)
          } else {
            this.tip('error', result.msg)
          }
        })
      },
      handleEdit() {
        versionUpdate(this.versionForm).then(result => {
          if (result.code === 0) {
            this.tip('success', result.msg)
          } else {
            this.tip('error', result.msg)
          }
        })
      },
      handleDelete(index, row) {
        versionDelete(row._id).then(result => {
          if (result.code === 0) {
            this.versionData.splice(index, 1)
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

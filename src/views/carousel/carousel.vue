<template>
  <div class="banner-page">
    <el-dialog
      title="添加Banner"
      :visible.sync="dialogVisible"
      width="35%">
      <el-form ref="addBannerObj" :model="addCarouseObj" label-width="90px">
        <el-form-item label="Banner图片">
          <UploadImg
            :action="action"
            :size="size"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="addCarouseObj.linkAddress"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model="addCarouseObj.weights"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addOrEditBanner">确 定</el-button>
        </span>
    </el-dialog>
    <el-table
      :data="carouselList"
      style="width: 100%">
      <el-table-column
        label="编号"
        type="index"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="carouselAddress"
        label="图片"
        width="380">
        <template slot-scope="props">
          <img :src="url+props.row.carouselAddress" class="lbBook">
        </template>
      </el-table-column>
      <el-table-column
        prop="weights"
        label="权重">
      </el-table-column>
      <el-table-column
        prop="linkAddress"
        label="链接地址">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <div class="operating">
            <p class="edit" @click="editBanner(props.row)">编辑</p>
            <p class="del" @click="deleteBanner(props.row._id,index)">删除</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <p class="add" @click="dialogVisible = true" >+添加Banner</p>
  </div>
</template>

<script>
  import { queryAllCarousel, carouselAdd, carouselDelete, carouselUpdate } from '../../api/carousel'
  import UploadImg from '../../components/uploadImg/index'
  export default {
    data() {
      return {
        url: '',
        // 收购的新增新的Banner 轮播图
        isBanner: true,
        dialogVisible: false,
        // 编辑时候的临时变量对象
        addCarouseObj: {},
        // 轮播图列表
        carouselList: [
          {
            carouselAddress: '',
            weights: 999,
            linkAddress: '是否玩儿'
          }
        ],
        // 文件上传
        // action: 'http://192.168.1.6:5001/upload/cover',
        action: '',
        size: 5
      }
    },
    components: {
      UploadImg
    },
    created() {
      this.url = process.env.VUE_APP_UPLOAD
      this.action = process.env.VUE_APP_API + 'upload/carousel'
      this.getAllCarousel()
    },
    methods: {
      // 获取所有的轮播图
      getAllCarousel() {
        queryAllCarousel().then(result => {
          if (result.code === 0) {
            this.carouselList = result.data.result
          }
        })
      },
      // 添加Banner
      async addOrEditBanner() {
        // 进行判断是新增还是编辑
        // 这是新增加的
        let result = null
        if (this.isBanner) {
          //  这是进行增加的
          result = await carouselAdd(this.addCarouseObj)
          if (result.code === 0) {
            // console.log(result.data.result)
            this.carouselList.push(result.data.result)
          }
        } else {
          // 这是进行编辑修改的
          result = await carouselUpdate(this.addCarouseObj)
        }
        if (result.code === 0) {
          this.$message.success(result.msg)
        }
        this.cancel()
        // 在所有的都结束以后
        this.isBanner = true
      },
      // 编辑Banner
      editBanner(item) {
        this.isBanner = false
        this.addCarouseObj = item
        this.dialogVisible = true
      },
      // 删除Banner
      async deleteBanner(id, index) {
        const result = await carouselDelete(id)
        if (result.code === 0) {
          this.carouselList.splice(index, 1)
          this.$message.success('轮播图删除成功')
        }
      },
      // 取消按钮
      cancel() {
        this.dialogVisible = false
        this.addCarouseObj = {}
      },
      onUploadSuccess(file) {
        this.addCarouseObj.carouselAddress = file
      },
      onUploadRemove() {
        console.log('移除了')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .banner-page {
    /*padding: 20px;*/
    width: 90%;margin: 20px auto;
    .avatar-uploader  {
      .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      border: 1px dashed #d9d9d9;
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    .lbBook {
      width: 200px;
      height: 100px;
    }
    .operating {
      display: flex;
      cursor: pointer;
      .edit {
        color: #1890ff;
      }
      .del {
        margin-left: 10px;
        color: red;
      }
    }
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
  }

</style>

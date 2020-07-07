<template>
    <div class="upload-container">
      <el-upload
        :action="action"
        :headers="headers"
        :multiple="false"
        :limit="1"
        :before-upload="beforeUpload"
        :on-success="onSuccess"
        :on-error="onError"
        :on-remove="onRemove"
        :on-exceed="onExceed"
        accept=""
        list-type="picture-card"
      >
        <i class="el-icon-plus"></i>
<!--        <i class="el-icon-plus"></i>-->
<!--        <i class="el-icon-upload"></i>-->
<!--        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--        <div class="el-upload__text" >请将图片拖入或<em>点击上传</em></div>-->
      </el-upload>
    </div>
</template>

<script>
  import { getToken } from '../../utils/auth'
  export default {
    data() {
      return {
        imageUrl: ''
      }
    },
    props: {
      action: {
        type: String
      },
      size: {
        type: Number,
        default: 2
      }
    },
    computed: {
      headers() {
        return {
          Authorization: `Bearer ${getToken()}`
        }
      }
    },
    methods: {
      beforeUpload(file) {
        const isFormat = file.type === ('image/jpeg' || 'image/png' || 'image/gif')
        const isExceedSize = file.size / 1024 / 1024 < this.size

        if (!isFormat) {
          this.$message.error('图片只能是格式错误!')
        }
        if (!isExceedSize) {
          this.$message.error(`图片大小不能超过 ${this.size}MB!`)
        }
        return isFormat && isExceedSize
      },
      // 成功
      onSuccess(response, file) {
        const { code, msg, data } = response
        console.log(URL.createObjectURL(file.raw))
        if (code === 0) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.$emit('onSuccess', data)
        } else {
          this.$message({
            type: 'error',
            message: ((msg && `上传失败，失败原因：${msg}`) || '上传失败')
          })
          this.imageUrl = file
          this.$emit('onError', file)
        }
      },
      // 错误
      onError(err) {
        const errMsg = err.message && JSON.parse(err.message)
        this.$message({
          type: 'error',
          message: (errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败'
        })
      },
      // 移除
      onRemove() {
        this.$message({
          message: '图片删除成功',
          type: 'success'
        })
        this.$emit('onRemove')
      },
      // 超出
      onExceed() {
        this.$message({
          message: '每次只能上传一个文件',
          type: 'warning'
        })
      }
    }
  }
</script>

<style  lang="scss">
  .upload-container {
    .el-upload {
      margin: 8px;
    }
  }
</style>

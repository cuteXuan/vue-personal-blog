<template>
  <div class="page-login">
    <el-form :model="user" :rules="userRules" ref="userForm"  label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="user.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="user.nickname"  placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin('userForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { register } from '../../api/user'
  export default {
    data() {
      const checkSpace = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('输入框不能为空'))
        } else {
          callback()
        }
      }
      return {
        user: {
          username: '',
          password: '',
          nickname: ''
        },
        // 规则验证
        userRules: {
          username: [
            { validator: checkSpace, trigger: 'blur' }
          ],
          password: [
            { validator: checkSpace, trigger: 'blur' },
            { min: 3, max: 20, message: '密码长度在3到20个字符', trigger: 'blur' }
          ],
          nickname: [
            { validator: checkSpace, trigger: 'blur' },
            { min: 2, max: 4, message: '昵称长度在2到4个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 处理登录
      handleLogin(userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            const that = this
            register(this.user).then(result => {
              if (result.code === 0) {
                this.$message.success(result.msg)
                setTimeout(function () {
                  that.$router.push({ path: '/user/login' })
                }, 1000)
              } else {
                this.$message.error(result.msg)
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" >
  body {
    background-color: white;
    .el-form {
      margin-top: 30vh;
      width: 50%;
      margin-left: 25%;
    }
  }
</style>

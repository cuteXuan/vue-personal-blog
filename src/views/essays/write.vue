<template>
  <div style="width:100%;">
    <!--  标题   -->
    <div class="write-top">
      <div class="left-input">
        <el-input v-model="title" maxlength="25" placeholder="输入文章标题" class="title-input" focus></el-input>
        <span>{{old}} / 25</span>
      </div>
      <el-button type="danger" @click="dialogVisible=true">发布文章</el-button>
    </div>
    <!-- 编辑器主体 -->
    <mavon-editor class="markdown-body"  :toolbars="toolbars" v-model="content_md" @change="handleHtml"/>
    <!-- 弹窗 -->
    <el-dialog
      title="发布文章"
      :visible.sync="dialogVisible"
      width="45%"
     >
      <el-form :model="articleForm" label-width="80px">
        <el-form-item label="添加封面">
          <div class="check-border">
            <UploadImg
              :action="action"
              :size="size"
              @onSuccess="onUploadSuccess"
              @onRemove="onUploadRemove"
            />
          </div>
        </el-form-item>
        <el-form-item label="文章标签">
          <div class="check-border">
            <el-checkbox-group v-model="articleForm.label" size="mini" >
              <el-checkbox
                v-for="item in labelCheck"
                :key="item._id"
                :label="item.label"
                border></el-checkbox>
            </el-checkbox-group>
            <div class='add_label'>
              <el-input
                placeholder="请输入添加的标签名字"
                v-model="add_label"
                clearable>
              </el-input>
              <el-button @click="addLabel">确认添加</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="发布版块">
          <el-select v-model="articleForm.group" placeholder="请选择发布版块">
            <el-option
              v-for="item in groupOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章类型">
          <el-radio-group v-model="articleForm.type" placeholder="请选择文章类型">
            <el-radio
              v-for="item in typeRadio"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  plain @click="dialogVisible = false">取消发布</el-button>
        <el-button type="danger" @click="handlePublish">确认发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { reqPath } from '../../utils/path'
  import { publishArticle, getArticle, upArticle } from '../../api/article'
  import { queryAllLabel, labelAdd } from '../../api/label'
  import UploadImg from '../../components/uploadImg/index'
  export default {
    name: 'addRelease',
    data() {
      return {
        /* eslint-disable */
        _id: '', // 更新时候用到的id
        add_label: '', // 添加的标签名
        dialogVisible: false,
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: false, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          navigation: true, // 导航目录
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          subfield: true, // 单双栏模式
          preview: true // 预览
        },
        title: '', // 题目
        old: 0, // 控制题目的字数
        author: '',
        date_time: '',
        cover: '',
        typeRadio: [
          {
            value: 0,
            label: '原创'
          },
          {
            value: 1,
            label: '转发'
          }
        ], // 文章类型
        groupOption: [
          {
            value: 0,
            label: '技术文章'
          },
          {
            value: 1,
            label: '随笔'
          },
          {
            value: 2,
            label: '个人介绍'
          }
        ], // 文章分组
        content_md: '# 请输入内容 ',
        content_html: '', // 文章HTML格式
        content_summary: '', // 文章摘要
        articleForm: {
          group: '',
          label: [],
          type: ''
        }, // 弹窗
        labelCheck: [], // 标签集合
        isUpdate: false, // 是否是更新资源
        // 文件上传
        // action: 'http://192.168.1.6:5001/upload/cover',
        action: '',
        size: 2
      }
    },
    components: {
      UploadImg
    },
    watch: {
      title (newName) {
        this.old = newName.length
      }
    },
    created() {
      // action 地址
      this.action = reqPath + 'upload/cover'
      const { id, title } = this.$route.query
      console.log(id, title)
      if (id) {
        this.isUpdate = true
        document.title = title
        this.getDetailById(id)
      }
      this.getAllLabel()
    },
    methods: {
      // 修改文章的时候获取文章详情
      getDetailById(id) {
        getArticle(id).then(result => {
          if (result.code === 0) {
            /* eslint-disable */
            const {
              type, group, label, _id, title, author, cover, content_md,
              content_html, content_summary, date_time } = result.data.result[0]
            this._id = _id
            this.articleForm.type = type
            this.articleForm.label = label
            this.articleForm.group = group
            this.title = title
            this.author = author
            this.cover = cover
            this.content_md = content_md
            this.content_html = content_html
            this.content_summary = content_summary
            this.date_time = date_time
          }
        })
      },
      // 文章更新
      updateArticle() {
        let isSuccess = true
        const data = this.getData()
        data._id = this._id
        data.data_time = this.date_time
        upArticle(data).then(result => {
          if(result.code ===0) {
            this.$message.success(result.msg)
          } else {
            this.$message.error(result.msg)
            isSuccess  = false
          }
        }).then(() => {
          if(isSuccess) {
            this.$router.push('/essays/view')
          }
        })
      },
      // 获取所有的标签
      getAllLabel() {
        queryAllLabel().then(result => {
          if (result.code === 0) {
            this.labelCheck = result.data.result
          }
        })
      },
      // 添加标签
      addLabel() {
        const data = {
          label: this.add_label
        }
        this.$confirm('是否添加该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          labelAdd(data).then(result => {
            if (result.code === 0) {
              this.$message.success(result.msg)
              this.labelCheck.push(result.data.result)
            } else {
              this.$message.error(result.msg)
            }
          })
        }).catch(() => {
          this.add_label = ''
        })
        this.add_label = ''
      },
      handleHtml(value, render) {
        this.content_html = render
      },
      // 处理文章发布
      handlePublish() {
        this.dialogVisible = false
        // 转换为 html格式
        // var parser = new DOMParser()
        // var doc = parser.parseFromString(this.content_html, 'text/xml')
        const end = Math.random() * 60 + 60
        this.content_summary = this.content_html.replace(/<[^>]*>|/g, '').substring(0, end)
        if(this.isUpdate) {
          this.updateArticle()
        } else {
          const data = this.getData()
          let isSuccess = true
          publishArticle(data).then(result => {
            if(result.code ===0) {
              this.$message.success(result.msg)
            } else {
              this.$message.error(result.msg)
              isSuccess = false
            }
          }).then(() => {
            if(isSuccess) {
              this.$router.push('/essays/view')
            }
          })
        }
      },
      onUploadSuccess(file) {
        this.cover = file
      },
      onUploadRemove() {
        console.log('移除了')
      },
      getData() {
        return {
          title: this.title,
          author: this.$store.getters.nickname,
          data_time: new Date(),
          cover: this.cover,
          type: this.articleForm.type,
          group: this.articleForm.group,
          content_md: this.content_md,
          content_html: this.content_html,
          content_summary: this.content_summary,
          label: this.articleForm.label
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .write-top {
    display: flex;
    padding:10px 15px;
    .left-input {
      flex: 1;
      position: relative;
      span {
        position: absolute;
        right: 10px;
        top: 13px;
      }
    }
    .el-button {
      margin-left: 15px;
    }
  }
  .markdown-body {
    position: relative;
    min-height: 680px;
  }
  .el-form {
    .check-border {
      border: 1px solid #e8e8ee;
      padding: 5px;
      border-radius: 4px;
      .add_label {
        display: flex;
        .el-button {
          margin-left: 10px;
        }
      }
    }

  }
</style>

<template>
    <div class="rgb">
      <div class="rgbTo16">
        <div class="tips">RGB转化成十六进制颜码：</div>
        <el-form :model="rgbModel" label-width="80px">
          <el-form-item label="R">
            <el-input v-model="rgbModel.r"></el-input>
          </el-form-item>
          <el-form-item label="G">
            <el-input v-model="rgbModel.g"></el-input>
          </el-form-item>
          <el-form-item label="B">
            <el-input v-model="rgbModel.b"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="handleHexadecimal"><i class="el-icon-refresh"></i>  转换 </el-button>
        <div class="res">
          <div class="hexadecimal">
            <span>16进制颜色：</span>
            <el-input v-model="hexadecimal" ></el-input>
          </div>
          <div class="hexadecimal">
            <span>颜色：</span>
            <div class="show" v-bind:style="{backgroundColor:hexadecimal}"></div>
          </div>
        </div>
      </div>

      <div class="rgbTo16">
        <div class="tips">十六进制颜码转化成RGB：</div>
        <div class="res2">
          <div class="rgbBox">
            <span>进制颜色：</span>
            <el-input v-model="input" placeholder="#开头"></el-input>
          </div>
          <el-button type="success" @click="handleRgb"><i class="el-icon-refresh"></i>  转换 </el-button>
          <div class="rgbBox">
            <span>rgb：</span>
            <el-input v-model="rgb" class="hexadecimal-button"></el-input>
          </div>
          <div class="hexadecimal">
            <span>颜色：</span>
            <div class="show" v-bind:style="{backgroundColor:newOutput}"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        // rgb转换 16进制
        rgbModel: {
          r: 0,
          g: 0,
          b: 0
        },
        hexadecimal: '#000000',
        // 16进制转换 rgb
        input: '#7d7d7d',
        rgb: '125,125,125',
        newOutput: '#7d7d7d'
      }
    },
    methods: {
      handleHexadecimal() {
        const rgb = this.rgbModel
        let res = '#'
        for (const item in rgb) {
          const quotient = Math.floor(rgb[item] / 16)
          const remainder = rgb[item] % 16
          res += (quotient.toString(16) + remainder.toString(16))
        }
        this.hexadecimal = res
      },
      test(str) {
        const rule = /^#([\da-f]{3}$|[\da-f]{6})$/
        return rule.test(str)
      },
      handleRgb() {
        let hexadecimal = this.input
        if (this.test(hexadecimal)) {
          let res = ''
          hexadecimal = hexadecimal.replace('#', '')
          if (hexadecimal.length === 3) {
            let arr = hexadecimal.split('')
            arr = arr.map(item => {
              return item + item
            })
            hexadecimal = arr.join('')
          }
          const resArr = hexadecimal.split('')
          for (let i = 0; i < resArr.length; i += 2) {
            res += parseInt(resArr[i], 16) * 16 + parseInt(resArr[i + 1], 16) + ','
          }
          this.rgb = res
          this.newOutput = this.input
        } else {
          alert('输入形式不符合规则')
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .hexadecimal {
    display: flex;
    justify-items: center;
    align-items: center;
    span {
      width: 150px;
      text-align: right;
    }
    .show {
      width: 200px;
      height: 40px;
    }
  }
  .rgb {
    width: 100%;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    padding: 10px;
    .rgbTo16 {
      width: 900px;
      padding-bottom: 30px;
      /*border-bottom: 1px solid #F1F1F1;*/
      /*border-bottom: 1px solid white;*/
      .tips {
        padding: 35px 0 25px;
        font-size: 16px;
        font-weight: 550;
      }
      .el-form {
        display: flex;
      }
      .el-button {
        text-align: center;
        margin-left: 43%;
      }
      .res {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
      }
      .res2 {
        display: flex;
        align-items: center;
        .el-button {
          margin-left: 50px;
        }
        .rgbBox {
          display: flex;
          align-items: center;
          span {
            width: 150px;
            text-align: right;
          }
        }
      }
    }
  }
</style>

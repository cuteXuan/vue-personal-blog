<template>
    <div>
      <img src="" v-if="avatar">
      <div v-else class="word">{{nickname}}</div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        avatar: '',
        nickname: '轩轩'
      }
    },
    props: ['_id'],
    created() {
      console.log(this._id)
    },
    methods: {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  .word {
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 14px;
    /*background-color: #409EFF;*/
    background-color: rgba(219,109,76,0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>

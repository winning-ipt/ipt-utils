<template>
  <div class="box">
    <win-pic
      :pic="pic"
      :width="width"
      :text="text"
    />
  </div>
</template>

<script>
// http://172.16.6.214/winex/#/basic-component/win-pic
export default {
  name: 'Occupation',
  props: {
    width: {
      type: String,
      default: '200px'
    },
    pic: {
      type: String,
      default: 'no_data'
    },
    text: {
      type: String,
      default: '数据为空...'
    }
  }
}
</script>

<style scoped lang="scss">
  .box{
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }
  .text{
    margin-top: 15px;
  }
</style>

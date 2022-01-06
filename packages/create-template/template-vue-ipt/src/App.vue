<template>
  <div class="ipt-micro-container">
    <router-view v-if="isDev" />
    <IptQianKunView v-else />
  </div>
</template>

<script>
import { IptQianKunView } from '@winning-plugin/win-ipt-qiankun-utils'
export default {
  name: 'App',
  components: {
    IptQianKunView
  },
  data () {
    return {
      isDev: !window.__POWERED_BY_QIANKUN__,
    }
  }
}
</script>

<style>
   html,body {
     width: 100%;
     height: 100%;
   }
  .ipt-micro-container{
    width: 100%;
    height: 100%;
  }
</style>

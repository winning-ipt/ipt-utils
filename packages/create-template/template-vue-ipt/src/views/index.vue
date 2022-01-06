<template>
  <div class="test-container">
    session:
    {{ patients && patients.fullName }}
  </div>
</template>

<script>
import { getCurrentPatient } from '../utils/opreate'
export default {
  name: '',
  data() {
    return {
      patients: null
    }
  },
  created () {
    // 事件名与对应域对接
    this.$eventBus.$on('SET_CURRENT_PATIENT_INFO', this.dealPatient, getCurrentPatient())
  },
  methods: {
    dealPatient (patients) {
      this.patients = patients
    }
  }
}
</script>

<style lang="scss" scoped>
  .test-container {
    background-color: var(--COLOR-NORMAL);
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
</style>

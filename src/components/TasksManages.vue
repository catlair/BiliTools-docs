<template>
  <div>
    <el-form-item label-width="40px">
      <el-transfer
          @change="changeFunction"
          v-model="form.closeFunValues"
          :data="form.allFunctions"
          :titles="['开启任务', '关闭任务']"
      ></el-transfer>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "TasksManages",
  props: ['form', 'useAddCoin'],
  model: {
    prop: 'useAddCoin',
    event: 'update:useAddCoin'
  },
  data() {
    return {}
  },
  methods: {
    changeFunction() {
      this.$emit(
          'update:useAddCoin', !this.form.closeFunValues.includes('addCoins')
      );
    }
  }
}
</script>

<style scoped>

</style>

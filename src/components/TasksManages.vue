<template>
  <div>
    <el-form ref="form" label-width="140px">
      <el-form-item label-width="40px">
        <el-transfer
            v-model="closeFunValues"
            :data="allFunctions"
            :titles="['开启任务', '关闭任务']"
        ></el-transfer>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import allFunctions from "@/data/allFunctions";

export default {
  name: "TasksManages",
  props: ['saveKey'],
  data() {
    return {
      allFunctions,
    }
  },
  computed: {
    closeFunValues: {
      get() {
        return this.$store.state.temp[this.saveKey].closeFunValues
      },
      set(closeValue) {
        const use = closeValue.includes('addCoins')
        this.$store.commit('update', {v: closeValue, k: 'closeFunValues', saveKey: this.saveKey});
        this.$store.commit('switch', {v: !use, k: 'addCoins', saveKey: this.saveKey})
      }
    }
  }
}
</script>

<style scoped>

</style>

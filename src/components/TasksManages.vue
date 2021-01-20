<template>
  <div>
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label-width="40px">
        <el-transfer
            @change="changeFunction"
            v-model="form.closeFunValues"
            :data="form.allFunctions"
            :titles="['开启任务', '关闭任务']"
        ></el-transfer>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import functionConfig from "@/data/functionConfig";

export default {
  name: "TasksManages",
  props: ['useAddCoin', 'form'],
  model: {
    prop: 'useAddCoin',
    event: 'update:useAddCoin'
  },
  data() {
    return {
      config: {
        function: {}
      }
    }
  },
  methods: {
    changeFunction() {
      this.$emit(
          'update:useAddCoin', !this.form.closeFunValues.includes('addCoins')
      )
    },
    setFunction() {
      const fun = JSON.parse(JSON.stringify(functionConfig));
      this.form.closeFunValues.forEach(el => {
        fun[el] = false;
      })
      this.config.function = fun
    },
  },
}
</script>

<style scoped>

</style>

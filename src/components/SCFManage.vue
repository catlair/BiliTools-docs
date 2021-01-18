<template>
  <div>
    <el-form-item label="使用腾讯云函数">
      <el-switch @change="changeUseSCF" :value="useSCF"></el-switch>
    </el-form-item>
    <el-collapse-transition>
      <div v-show="useSCF">
        <el-form-item label="组件app名">
          <el-input placeholder="app名" v-model="form.scf.appName"></el-input>
        </el-form-item>
        <el-form-item required label="云函数名">
          <el-input placeholder="一个区域的唯一值(区别函数)" v-model="form.scf.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input placeholder="让自己更好分辨函数是干嘛的" v-model="form.scf.description"></el-input>
        </el-form-item>
        <el-form-item label="函数区域">
          <el-select v-model="form.scf.region" placeholder="请选择函数区域">
            <el-option v-for="re in region" :key="re[0]" :label="re[1]" :value="re[0]"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="每日任务执行时间">
          <el-time-picker
              is-range
              v-model="form.dailyRunTime"
              value-format="HH:mm:ss"
              range-separator="至"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "SCFManage",
  props: ['useSCF', 'region', 'form'],
  model: {
    prop: 'useSCF',
    event: 'update:useSCF'
  },
  methods: {
    changeUseSCF() {
      this.$emit('update:useSCF', !this.useSCF)
    }
  }
}
</script>

<style scoped>

</style>

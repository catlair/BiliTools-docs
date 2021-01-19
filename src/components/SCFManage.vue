<template>
  <div>
    <el-form ref="form" :model="scf" :rules="useSCF ? rules : nullRules" label-width="140px">
      <el-form-item label="使用腾讯云函数">
        <el-switch v-model="useSCF"></el-switch>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="useSCF">
          <el-form-item label="组件app名" prop="appName">
            <el-input placeholder="app名" v-model.trim="scf.appName"></el-input>
          </el-form-item>
          <el-form-item label="云函数名" prop="name">
            <el-input placeholder="一个区域的唯一值(区别函数)" v-model.trim="scf.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="让自己更好分辨函数是干嘛的" v-model.trim="scf.description"></el-input>
          </el-form-item>
          <el-form-item label="函数区域">
            <el-select v-model="scf.region" placeholder="请选择函数区域">
              <el-option v-for="re in region" :key="re[0]" :label="re[1]" :value="re[0]"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每日任务执行时间">
            <el-time-picker
                is-range
                v-model="dailyRunTime"
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
    </el-form>
  </div>
</template>

<script>
import region from '@/data/scf-region'


export default {
  name: "SCFManage",
  data() {
    return {
      region,
      useSCF: false,
      scf: {
        appName: 'catlair_Bilibili',
        name: '',
        description: '',
        region: 'ap-chengdu',
      },
      dailyRunTime: ['19:19:19', '23:23:23'],
      config: {dailyRunTime: '', sls: {}},
      rules: {
        name: [
          {required: true, message: '用于区分和识别函数', trigger: 'blur'},
          {pattern: /^\w+$/, message: '只能是字母数字和下划线', trigger: 'blur'}
        ],
        appName: {pattern: /^\w+$/, message: '只能是字母数字和下划线', trigger: 'blur'}
      },
      nullRules: {}
    }
  },
  methods: {
    setSCF() {
      if (!this.useSCF) {
        this.config.sls = null;
        return true;
      }
      this.config.sls = this.scf;
      this.config.dailyRunTime = this.dailyRunTime[0] + '-' + this.dailyRunTime[1]
      let formValid = true;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return formValid = false;
        }
      });
      return formValid;
    },
  }
}
</script>

<style scoped>

</style>

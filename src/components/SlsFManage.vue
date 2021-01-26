<template>
  <div>
    <el-form ref="form" :model="form.scf" :validate-on-rule-change="false" :rules="useSCF ? rules : nullRules"
             label-width="140px">
      <el-form-item label="使用腾讯云函数">
        <el-switch v-model="useSCF"></el-switch>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="useSCF">
          <el-form-item label="组件app名" prop="appName">
            <el-input placeholder="app名" v-model.trim="form.scf.appName"></el-input>
          </el-form-item>
          <el-form-item label="云函数名" prop="name">
            <el-input placeholder="一个区域的唯一值(区别函数)" v-model.trim="form.scf.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input placeholder="让自己更好分辨函数是干嘛的" v-model.trim="form.scf.description"></el-input>
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
    </el-form>
  </div>
</template>

<script>
import region from '@/data/scf-region'


export default {
  name: "SCFManage",
  props: ['saveKey'],
  data() {
    return {
      region,
      form: {},
      rules: {
        name: [
          {required: true, message: '用于区分和识别函数', trigger: 'blur'},
          {pattern: /^[A-Za-z][\w-_]{0,58}[A-Za-z0-9]$/, message: '字母开头,只能包含字母数字和-_', trigger: 'blur'}
        ],
        appName: {pattern: /^\w+$/, message: '只能是字母数字和下划线', trigger: 'blur'}
      },
      nullRules: {}
    }
  },
  computed: {
    useSCF: {
      get() {
        return this.$store.state.temp[this.saveKey].switch.scf
      },
      set(v) {
        this.$store.commit('switch', {v, k: 'scf', saveKey: this.saveKey})
      }
    }
  },
  created() {
    this.form = Object.copy(this.$store.state.temp[this.saveKey].slsConfig)
  },
  methods: {
    validForm() {
      let formValid = true;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return formValid = false;
        }
      });
      return formValid;
    }
  },
  watch: {
    form: {
      handler(value) {
        this.$store.commit('update', {
          k: 'slsConfig',
          value,
          saveKey: this.saveKey
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>

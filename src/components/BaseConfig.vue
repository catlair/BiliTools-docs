<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="api随机延时(s)">
        <el-input-number size="mini" :min="0" :max="form.apiDelay[1] - 1" v-model="form.apiDelay[0]"
                         style="margin-right: 20px;"></el-input-number>
        <el-input-number size="mini" :min="form.apiDelay[0] + 1" :max="100"
                         v-model="form.apiDelay[1]"></el-input-number>
      </el-form-item>
      <el-form-item label="User-Agent" prop="userAgent">
        <el-input type="textarea" v-model.trim="form.userAgent"></el-input>
        <el-button size="mini" @click="getUserAgent">获取浏览器UA</el-button>
      </el-form-item>
      <el-form-item label="cookie" prop="cookie">
        <el-input type="textarea" v-model.trim="form.cookie"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BaseConfig",
  props: ['saveKey'],
  data() {
    return {
      form: {},
      rules: {
        cookie: [
          {required: true, message: '授权登录必须内容', trigger: 'blur'},
          {pattern: /(?:^|)DedeUserID=([^;]*)(?:;|$)/, message: '该cookie没有用户id', trigger: 'blur'},
          {pattern: /(?:^|)bili_jct=([^;]*)(?:;|$)/, message: '该cookie没有bili_jct', trigger: 'blur'},
          {pattern: /(?:^|)SESSDATA=([^;]*)(?:;|$)/, message: '该cookie没有SESSDATA', trigger: 'blur'},
        ],
      }
    }
  },
  created() {
    this.form = Object.copy(this.$store.state.temp[this.saveKey].baseConfig)
  },
  methods: {
    getUserAgent() {
      this.form.userAgent = window.navigator.userAgent;
    },
    validForm() {
      let formValid = true;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return formValid = false;
        }
      });
      return formValid
    }
  },
  watch: {
    form: {
      handler(value) {
        this.$store.commit('update', {
          k: 'baseConfig',
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

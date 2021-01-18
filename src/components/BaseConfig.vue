<template>
  <div>
      <el-form-item label="api随机延时(s)">
        <el-input-number size="mini" :min="0" :max="form.apiDelay[1] - 1" v-model="form.apiDelay[0]"
                         style="margin-right: 20px;"></el-input-number>
        <el-input-number size="mini" :min="form.apiDelay[0] + 1" :max="100"
                         v-model="form.apiDelay[1]"></el-input-number>
      </el-form-item>
      <el-form-item label="User-Agent">
        <el-input type="textarea"  v-model="form.userAgent"></el-input>
        <el-button size="mini" @click="getUserAgent">获取浏览器UA</el-button>
      </el-form-item>
      <el-form-item label="cookie" required>
        <el-input type="textarea" v-model="form.cookie"></el-input>
      </el-form-item>
  </div>
</template>

<script>
export default {
  name: "BaseConfig",
  props: ['form'],
  methods: {
    getUserAgent() {
      this.form.userAgent = window.navigator.userAgent;
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-form ref="form" :model="form" label-width="140px">
      <el-form-item label="投币功能">
        <el-switch @change="changeUseAddCoin" :value="useAddCoin"></el-switch>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="useAddCoin">
          <el-form-item label="保留硬币">
            <el-input-number size="mini" :min="0" v-model="form.stayCoins"></el-input-number>
          </el-form-item>
          <el-form-item label="投币目标">
            <el-input-number size="mini" :min="0" :max="20" v-model="form.targetCoins"></el-input-number>
          </el-form-item>
          <el-form-item label="目标等级">
            <el-input-number size="mini" :min="0" :max="6" v-model="form.targetLevel"></el-input-number>
          </el-form-item>
          <el-form-item label="视频搜索重试次数">
            <el-input-number size="mini" :min="0" :max="10" v-model="form.coinRetryNum"></el-input-number>
          </el-form-item>
          <el-form-item
              v-for="(up, index) in form.customizeUp"
              :label="'自定义UP' + (index + 1)"
              :key="up.key"
              :prop="`customizeUp.${index}.value`"
              :rules="{pattern: /^\d*$/, message:'up主id为数字',trigger:'blur'}"
          >
            <el-input size="small" v-model.number="up.value"
                      style="width: 180px; margin-right: 20px;"></el-input>
            <el-button size="mini" @click.prevent="removeUp(up)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="addCustomizeUp">新增up</el-button>
          </el-form-item>
          <el-form-item label="投币精准匹配">
            <el-switch @change="changeUpperAccMatch" v-model="form.upperAccMatch" active-color="#13ce66"
                       inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "AddCoins",
  props: ['useAddCoin', 'form'],
  model: {
    prop: 'useAddCoin',
    event: 'update:useAddCoin'
  },
  data() {
    return {
      config: {}
    }
  },
  methods: {
    changeUseAddCoin() {
      this.$emit('update:useAddCoin', !this.useAddCoin);
    },
    addCustomizeUp() {
      this.form.customizeUp.push({
        value: '',
        key: Date.now().toString()
      });
    },
    removeUp(item) {
      const index = this.form.customizeUp.indexOf(item)
      if (index !== -1) {
        this.form.customizeUp.splice(index, 1)
      }
    },
    changeUpperAccMatch() {
      if (!this.form.upperAccMatch) {
        this.$notify({
          title: '关闭up视频精准匹配',
          message: '你关闭了up视频精准匹配,这将导致为合作视频投币时可能投币对象不是自定义的up主',
          duration: 6000
        });
      }
    },
    setCustomizeUp() {
      this.config = JSON.parse(JSON.stringify(this.form));
      this.config.customizeUp = this.form.customizeUp.map(up => up.value).filter(up => up !== '')
      let formValid = true;
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return formValid = false;
        }
      });
      return formValid
    }
  }
}
</script>

<style>

</style>

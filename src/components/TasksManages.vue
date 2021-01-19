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
export default {
  name: "TasksManages",
  props: ['useAddCoin'],
  model: {
    prop: 'useAddCoin',
    event: 'update:useAddCoin'
  },
  data() {
    return {
      form: {
        allFunctions: [
          {
            key: 'addCoins',
            label: '每日投币',
          },
          {
            key: 'shareAndWatch',
            label: '分享/观看视频',
          },
          {
            key: 'supGroupSign',
            label: '应援团签到',
          }, {
            key: 'judgement',
            label: '风纪委员任务',
          },
          {
            key: 'mangaSign',
            label: '漫画签到'
          },
          {
            key: 'silver2Coin',
            label: '银瓜子换硬币',
          },
          {
            key: 'liveSignTask',
            label: '直播签到'
          }
        ],
        closeFunValues: ['judgement'],
      },
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
      const functionConfig = {
        "silver2Coin": true,
        "liveSignTask": true,
        "addCoins": true,
        "mangaSign": true,
        "shareAndWatch": true,
        "supGroupSign": true,
        "judgement": true
      }
      this.form.closeFunValues.forEach(el => {
        functionConfig[el] = false;
      })
      this.config.function = functionConfig
    },
  },
}
</script>

<style scoped>

</style>

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
export default {
  name: "TasksManages",
  data() {
    return {
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
        },
        {
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
      index: -1,
    }
  },
  created() {
    this.index = this.$route.params.index;
  },
  computed: {
    closeFunValues: {
      get() {
        return this.$store.state.account[this.index].closeFunValues
      },
      set(closeValue) {
        const index = this.index, use = closeValue.includes('addCoins')
        this.$store.commit('update', {i: index, v: closeValue, k: 'closeFunValues'});
        this.$store.commit('switch', {i: index, v: !use, k: 'addCoins'})
      }
    }
  }
}
</script>

<style scoped>

</style>

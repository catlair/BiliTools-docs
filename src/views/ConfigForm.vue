<template>
  <div class="config-form">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <tasks-manages ref="tasksManages" :save-key="saveKey"></tasks-manages>
          <base-config ref="baseConfig" :save-key="saveKey"></base-config>
          <div style="margin-left: 140px;margin-bottom: 20px">
            <el-button type="primary" @click="onSubmit">{{ $route.name === 'Add' ? '创建账号' : '更新账号' }}</el-button>
            <el-button @click="onCancel">取消</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <add-coins ref="addCoins" :save-key="saveKey"></add-coins>
          <sls-manage ref="slsManage" :save-key="saveKey"></sls-manage>
          <message-push ref="messagePush" :save-key="saveKey"></message-push>
        </div>
      </el-col>
    </el-row>
    <div>
    </div>
  </div>
</template>

<script>
import TasksManages from "@/components/TasksManages";
import AddCoins from "@/components/AddCoins";
import SlsManage from "@/components/SlsFManage";
import MessagePush from "@/components/MessagePush";
import BaseConfig from "@/components/BaseConfig";
import {mapState} from "vuex";
import {getUserId} from "@/utils";

export default {
  name: "ConfigForm",
  components: {
    TasksManages,
    AddCoins,
    SlsManage,
    MessagePush,
    BaseConfig
  },
  data() {
    return {
      routeName: this.$route.name,
      saveKey: this.$route.name === 'Add' ? 'createAccount' : this.$route.params.id
    }
  },
  computed: {
    ...mapState(['temp', 'account'])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.validForm()) {
        this.$message.error('请检查没有填写的必填项')
        return;
      }
      if (this.$route.name === 'Add') {
        this.addAccount()
      } else {
        this.updateAccount()
      }
    },
    onCancel() {
      if (this.routeName === 'Edit') {
        this.$store.commit('cancelUpdateAccount', {
          userId: this.$route.params.id
        })
        //vuex不规范的使用的亡羊补牢之策
        this.$router.go(0)
        return;
      }
      this.$store.commit('cancelCreateAccount')
      //vuex不规范的使用的亡羊补牢之策
      this.$router.go(0)
    },
    addAccount() {
      const cookie = this.temp.createAccount.baseConfig.cookie
      const userId = getUserId(cookie)
      if (this.include(userId)) {
        this.$message.warning('该账户已存在')
        return
      }
      this.$message.success('添加账号成功')
      this.$store.commit('addAccount', {userId})
      this.$router.push('/users')
    },
    updateAccount() {
      const cookie = this.temp[this.$route.params.id].baseConfig.cookie
      const userId = getUserId(cookie)
      if (userId !== this.$route.params.id) {
        this.$message.warning('你更改了用户id')
        return
      }
      this.$message.success('更新账号成功')
      this.$store.commit('updateAccount', {
        userId: this.$route.params.id
      })
      this.$router.push('/users')
    },
    validForm() {
      const slsManage = this.$refs.slsManage.validForm(),
          messagePush = this.$refs.messagePush.validForm(),
          addCoins = this.$refs.addCoins.validForm(),
          baseConfig = this.$refs.baseConfig.validForm();
      console.log(slsManage, messagePush, addCoins, baseConfig)
      return slsManage && messagePush && addCoins && baseConfig;
    },
    include(userId) {
      return Object.keys(this.account).includes(userId);
    }
  }
}
</script>

<style>
</style>

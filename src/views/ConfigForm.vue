<template>
  <div class="config-form">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <tasks-manages ref="tasksManages" v-model="useAddCoin"></tasks-manages>
          <base-config ref="baseConfig"></base-config>
          <div style="margin-left: 140px;margin-bottom: 20px">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <add-coins ref="addCoins" @update:useAddCoin="changeCloseFunction" v-model="useAddCoin"></add-coins>
          <s-c-f-manage ref="SCFManage"></s-c-f-manage>
          <message-push ref="messagePush"></message-push>
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
import SCFManage from "@/components/SCFManage";
import MessagePush from "@/components/MessagePush";
import BaseConfig from "@/components/BaseConfig";

export default {
  name: "ConfigForm",
  components: {
    TasksManages,
    AddCoins,
    SCFManage,
    MessagePush,
    BaseConfig
  },
  data() {
    return {
      useAddCoin: true,
    }
  },
  methods: {
    setData() {
      this.$refs.tasksManages.setFunction()
      this.$refs.SCFManage.setSCF();
      this.$refs.messagePush.setMessage();
      this.$refs.addCoins.setCustomizeUp()
      this.$refs.baseConfig.setBaseConfig()
    },
    onSubmit() {
      this.setData();
      let data = {
        ...this.$refs.tasksManages.config,
        ...this.$refs.SCFManage.config,
        ...this.$refs.messagePush.config,
        ...this.$refs.addCoins.config,
        ...this.$refs.baseConfig.config,
      };
      console.log(data)
      this.$store.commit("pushAccount", data);
      this.$router.push('/users')
    },
    changeCloseFunction() {
      const value = this.$refs.tasksManages.form.closeFunValues
      if (this.useAddCoin) {
        value.splice(value.indexOf('addCoins'), 1)
      } else {
        value.push('addCoins')
      }
    }
  },
}
</script>

<style>
</style>

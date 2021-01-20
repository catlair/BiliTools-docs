<template>
  <div class="config-form">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <tasks-manages ref="tasksManages" v-model="useAddCoin" :form="form.functionConfig"></tasks-manages>
          <base-config ref="baseConfig" :form="form.baseConfig"></base-config>
          <div style="margin-left: 140px;margin-bottom: 20px">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <add-coins ref="addCoins" :form="form.coinsConfig" @update:useAddCoin="changeCloseFunction"
                     v-model="useAddCoin"></add-coins>
          <s-c-f-manage ref="SCFManage" :form="form.slsConfig"></s-c-f-manage>
          <message-push ref="messagePush" :message="form.message"></message-push>
        </div>
      </el-col>
    </el-row>
    <div>
    </div>
  </div>
</template>

<script>
import form from '@/data/form'

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
      form,
    }
  },
  methods: {
    onSubmit() {
      this.$refs.tasksManages.setFunction();
      const SCFManage = this.$refs.SCFManage.setSCF(),
          messagePush = this.$refs.messagePush.setMessage(),
          addCoins = this.$refs.addCoins.setCustomizeUp(),
          baseConfig = this.$refs.baseConfig.setBaseConfig();

      console.log(SCFManage, messagePush, addCoins, baseConfig)

      if (SCFManage && messagePush && addCoins && baseConfig) {
        let data = {
          ...this.$refs.tasksManages.config,
          ...this.$refs.SCFManage.config,
          ...this.$refs.messagePush.config,
          ...this.$refs.addCoins.config,
          ...this.$refs.baseConfig.config,
        };
        console.log(data)
        this.$store.commit("pushAccount", data);
        this.$message.success('添加账号成功')
        this.$router.push('/users')
      } else {
        this.$message.warning('请检查表单是否有误')
      }
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

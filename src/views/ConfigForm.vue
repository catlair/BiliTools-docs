<template>
  <div class="config-form">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <tasks-manages ref="tasksManages" v-model="useAddCoin" :form="form.functionConfig"></tasks-manages>
          <base-config ref="baseConfig" :form="form.baseConfig"></base-config>
          <div style="margin-left: 140px;margin-bottom: 20px">
            <el-button type="primary" @click="onSubmit">{{ $route.name === 'Add' ? '立即创建' : '更新用户' }}</el-button>
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
import TasksManages from "@/components/TasksManages";
import AddCoins from "@/components/AddCoins";
import SCFManage from "@/components/SCFManage";
import MessagePush from "@/components/MessagePush";
import BaseConfig from "@/components/BaseConfig";

import data2form from "@/utils/data2form";
import form from '@/data/form'

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
      form: form(),
      index: -1
    }
  },
  created() {
    if (this.$route.name === 'Edit') {
      this.index = +this.$route.query.index;
      this.form = data2form(this.$store.state.config.account[this.index], this.$store.state)
      this.form.functionConfig.closeFunValues.includes('addCoins') && (this.useAddCoin = false)
    }
  },
  mounted() {
    if (this.$route.name !== 'Edit') return;
    if (this.form.slsConfig.scf?.name) {
      this.$refs.SCFManage.useSCF = true;
    }
    if (this.form.message === true) {
      this.$refs.messagePush.use = true;
      this.form.message = form().message;
      return;
    }
    if (this.form.message.serverChan) {
      this.$refs.messagePush.useServerChan = true;
    }
    if (this.form.message.email.from) {
      this.$refs.messagePush.useEamil = true;
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
        if (this.$route.name === 'Edit') {
          this.$store.commit("updateAccount", {
            data, index: this.index
          });
          this.$message.success('更新账号成功')
        } else {
          this.$store.commit("pushAccount", data);
          this.$message.success('添加账号成功')
        }
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

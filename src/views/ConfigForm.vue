<template>
  <div class="config-form">
    <el-form ref="form" :model="form" label-width="140px">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <tasks-manages v-model="useAddCoin" :form="form"></tasks-manages>
            <base-config :form="form"></base-config>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <add-coins v-model="useAddCoin" :form="form"></add-coins>
            <s-c-f-manage v-model="useSCF" :form="form" :region="region"></s-c-f-manage>
            <message-push :form="form" :message-push="messagePush"></message-push>
          </div>
        </el-col>
      </el-row>
      <div>
      </div>
    </el-form>
  </div>
</template>

<script>
import form from '@/data/form'

import region from '@/data/scf-region'
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
      useSCF: false,
      useAddCoin: true,
      form,
      messagePush: {
        use: false,
        useEmail: true,
        useServerChan: true,
        useEmailCustom: false,
        useServerChanCustom: false
      },
      region,
      user: {}
    }
  },
  methods: {
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
      this.user.function = functionConfig
      delete this.user.allFunctions
      delete this.user.closeFunValues
    },
    setSCF() {
      delete this.user.scf;
      if (!this.useSCF) {
        this.user.sls = null;
        return;
      }
      this.user.sls = this.form.scf
    },
    setMessage() {
      let message = {
        email: true,
        serverChan: true
      }
      if (this.messagePush.use === false) {
        message = false
        return;
      }
      if (this.messagePush.useServerChan === false) {
        message.serverChan = false
      } else {
        if (this.messagePush.useServerChanCustom) {
          message.serverChan = this.form.message.serverChan
        }
      }
      if (this.messagePush.useEmail === false) {
        message.email = false
      } else {
        if (this.messagePush.useEmailCustom) {
          message.email = this.form.message.email
        }
      }
      const allTrue =  Object.values(message).every(el => el === true);
      if (allTrue){
        this.user.message = true;
        return;
      }
      this.user.message = message;
    },
    setCustomizeUp() {
      this.user.customizeUp = this.form.customizeUp.map(up => up.value).filter(up => up.trim() !== '');
    },
    onSubmit() {
      this.user = JSON.parse(JSON.stringify(this.form));
      this.setFunction()
      this.setSCF()
      this.setMessage()
      this.setCustomizeUp()
      this.user.dailyRunTime = this.form.dailyRunTime[0] + '-' + this.form.dailyRunTime[1]
      console.log(this.user)
      this.$store.commit("pushAccount", this.user);
      this.$router.push('/users')
    },
    getUserAgent() {
      this.form.userAgent = window.navigator.userAgent;
    }
  },
  created() {
    this.useAddCoin = !this.form.closeFunValues.includes('addCoins');
  }
}
</script>

<style>
</style>

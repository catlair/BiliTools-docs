<template>
  <div class="config-form">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <tasks-manages ref="tasksManages"></tasks-manages>
          <base-config ref="baseConfig"></base-config>
          <div style="margin-left: 140px;margin-bottom: 20px">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <add-coins ref="addCoins"></add-coins>
          <sls-manage ref="slsManage"></sls-manage>
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
import SlsManage from "@/components/SlsFManage";
import MessagePush from "@/components/MessagePush";
import BaseConfig from "@/components/BaseConfig";

export default {
  name: "ConfigForm",
  components: {
    TasksManages,
    AddCoins,
    SlsManage,
    MessagePush,
    BaseConfig
  },
  beforeCreate() {
    const name = this.$route.name
    const index = Number(this.$route.params.index)
    if (name === 'Add') {
      if (index < this.$store.state.account.length) return;
      this.$store.commit('addUser', {index})
    }
  },
  methods: {
    onSubmit() {
      console.log('提交')
    }
  }
}
</script>

<style>
</style>

<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee; ">

      <el-menu class="el-menu-vertical-demo" :default-openeds="['1', '2']" :collapse="true">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i><span slot="title">通用配置</span></template>
          <el-menu-item index="1-1" @click="$router.push('/common/message')">消息推送</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-user-solid"></i> <span slot="title">用户配置</span></template>
          <el-menu-item index="2-1" @click="$router.push('/users/')">用户列表</el-menu-item>
          <el-menu-item index="2-2" @click="addUser">添加用户</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-folder"></i><span slot="title">数据管理</span></template>
          <el-menu-item index="3-1" @click="$router.push('/data/format')">数据处理</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-container style="overflow: auto">
        <el-header style="text-align: right; font-size: 18px;margin-bottom: 30px">
        </el-header>
        <router-view :key="$route.path"></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<script>

import {mapState} from "vuex";

export default {
  name: 'app',
  computed: {
    ...mapState(['account'])
  },
  methods: {
    addUser() {
      const index = Object.keys(this.account).length
      this.$router.push(`/users/add/${index}`);
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body, html {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  height: 0 !important;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

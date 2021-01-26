<template>
  <div>
    <el-table :data="users" width="600">
      <el-table-column prop="userId" label="用户id">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleCopy(scope.$index, scope.row)">复制
          </el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px">
      <el-col :span="18">
        <div class="grid-content bg-purple" style="visibility: hidden">1</div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button @click="clearTemp">清空编辑缓存</el-button>
          <el-button type="primary" @click="onSubmit">压缩配置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-input
        type="textarea"
        autosize
        placeholder="这里生成Gzip/或者将Gzip输入到这里"
        style="margin:20px;width: 90%;"
        v-model="gzip">
    </el-input>
  </div>
</template>

<script>
import gzip from '@/utils/gzip'

import {mapState} from "vuex";
import form2data from "@/utils/form2data";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      gzip: '',
      test: ''
    }
  },
  mounted() {
    this.getUsers()
  },
  computed: {
    ...mapState(['temp', 'account'])
  },
  methods: {
    getUsers() {
      this.users = Object.keys(this.account).map(userId => ({userId}))
    },
    handleEdit(index, row) {
      if (this.temp[row.userId]) {
        this.$message.info('检查到未保存的历史记录')
      } else {
        this.$store.commit('copyToTemp', {userId: row.userId})
      }
      this.$router.push(`/users/${row.userId}/edit`);
    },
    handleCopy(index, row){
      this.$store.commit("copyAccount", {userId: row.userId});
      this.$router.push(`/users/add/${Object.keys(this.$store.state.account).length}`);
    },
    handleDelete(index, row) {
      console.log(this.users[index])
      this.$store.commit("deleteAccount", {userId: row.userId});
      this.getUsers();
    },
    onSubmit() {
      const account = this.$store.state.account,
          message = this.$store.state.message;
      if (Object.isEmpty(message))
        if (Object.isEmpty(account)) {
          this.$message.error('没有任何内容需要压缩')
          return;
        }
      const data = form2data(account, message)
      console.log(data)
      this.gzip = gzip.gzipEncode(JSON.stringify(data));
    },
    clearTemp(){
      this.$store.commit('clearTempAccount')
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <el-table :data="users" width="600">
      <el-table-column prop="userId" label="用户id">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
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
      <el-col :span="20">
        <div class="grid-content bg-purple" style="visibility: hidden">1</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="onSubmit">压缩配置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-input
        type="textarea"
        autosize
        placeholder="这里生成Gzip/或者将Gzip输入到这里"
        style="margin:20px;width: 90%;"
        :value="gzip">
    </el-input>
  </div>
</template>

<script>
import gzip from '@/utils/gzip'

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      gzip: ''
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      const account = this.$store.state.config?.account
      this.users = account.map((el, index) => {
        const reg = `(?:^|)DedeUserID=([^;]*)(?:;|$)`;
        return {
          userId: el.cookie?.match(reg)[1],
          index
        }
      })
    },
    handleEdit(index, row) {
      this.$router.push(`/users/${row.userId}/edit?index=${index}`);
    },
    handleDelete(index, row) {
      console.log(this.users[index])
      this.$store.commit("deleteAccount", this.users[index]);
      this.getUsers();
    },
    onSubmit() {
      const config = this.$store.state.config;
      const configString = JSON.stringify(config);
      const gzipString = gzip.gzipEncode(configString);
      console.log(gzipString);
      console.log(configString);
      console.log(config)
      this.$message.success('生成成功,按f12在控制台获取')
      this.gzip = gzipString
    }
  }
}
</script>

<style scoped>

</style>

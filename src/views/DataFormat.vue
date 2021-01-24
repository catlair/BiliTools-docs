<template>
  <el-row style="margin-top: -20px">
    <el-col :span="12">
      <div class="grid-content bg-purple">
        输入gzip加密数据
        <el-button type="primary" @click="getGzip" style="margin: 0 0 6px 46%;"
          >从表单获取</el-button
        >
        <el-input
          type="textarea"
          :autosize="{ minRows: 30 }"
          v-model="gzipText"
        >
        </el-input>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        输入json数据
        <el-button
          type="primary"
          style="margin: 0 0 6px 46%;"
          @click="restoreForm"
          >还原设置到表单</el-button
        >
        <el-input
          type="textarea"
          :autosize="{ minRows: 20, maxRows: 30 }"
          v-model="jsonText"
        >
        </el-input>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import data2form from '@/utils/data2form';
import gzip from '@/utils/gzip';
import form2data from '@/utils/form2data';

export default {
  name: 'DataFormat',
  data() {
    return {
      json: '',
      gzip: '',
    };
  },
  computed: {
    gzipText: {
      get() {
        return this.gzip;
      },
      set(value) {
        this.gzip = value;
        this.gzip2json(value);
      },
    },
    jsonText: {
      get() {
        return this.json;
      },
      set(value) {
        this.json = value;
        if (value === '') {
          this.gzip = '';
          return;
        }
        //string,parse一下是去掉空格,让数据
        try {
          this.gzip = gzip.gzipEncode(JSON.stringify(JSON.parse(value)));
        } catch (error) {
          this.gzip = '非正确json';
        }
      },
    },
  },
  methods: {
    gzip2json(value) {
      try {
        this.json = JSON.stringify(JSON.parse(gzip.gzipDecode(value)), null, 3);
      } catch (error) {
        //无效
        this.json = '非json数据';
      }
    },
    restoreForm() {
      if (!this.json) return;
      const data = data2form(JSON.parse(this.json));
      this.$message.success('还原成功');
      this.$store.commit('restoreForm', data);
    },
    getGzip() {
      const account = this.$store.state.account,
        message = this.$store.state.message;
      if (Object.isEmpty(message))
        if (Object.isEmpty(account)) {
          this.$message.error('没有任何内容需要压缩');
          return;
        }
      const data = form2data(account, message);
      this.gzip = gzip.gzipEncode(JSON.stringify(data));
      this.gzip2json(this.gzip);
    },
  },
};
</script>

<style scoped></style>

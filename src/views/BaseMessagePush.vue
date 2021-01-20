<template>
  <div class="base-message-push">
    <el-form ref="emailForm" :model="message.email" :rules="rules" label-width="140px">
      <el-form-item label="使用邮箱推送">
        <el-switch v-model.trim="messagePush.useEmail"></el-switch>
      </el-form-item>
      <el-form-item label="发件邮箱" prop="from">
        <el-input type="email" placeholder="from email"
                  v-model.trim="message.email.from"></el-input>
      </el-form-item>
      <el-form-item label="邮箱授权码" prop="pass">
        <el-input placeholder="邮箱授权码" v-model.trim="message.email.pass"
                  show-password></el-input>
      </el-form-item>
      <el-form-item label="接收邮箱" prop="to">
        <el-input type="email" placeholder="to email"
                  v-model.trim="message.email.to"></el-input>
      </el-form-item>
      <el-form-item label="服务器地址" prop="host">
        <el-input placeholder="发送邮件的服务器地址" v-model.trim="message.email.host"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input placeholder="安全信息默认465" v-model.number="message.email.port"></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <el-form ref="serverChanForm" :model="message" :rules="rules" label-width="140px">
      <el-form-item label="使用server酱">
        <el-switch v-model.trim="messagePush.useServerChan"></el-switch>
      </el-form-item>
      <el-form-item label="server酱" prop="serverChan">
        <el-input
            type="textarea"
            autosize
            placeholder="请输入server酱的key"
            v-model="message.serverChan">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">配置完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BaseMessagePush",
  data() {
    return {
      nullRules: {},
      timer: null,
      messagePush: {
        useEmail: false,
        useServerChan: false,
      },
      message: {
        email: {
          from: '',
          to: '',
          pass: '',
          host: '',
          port: 465
        },
        serverChan: ''
      },
      rules: {
        from: [{required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur'}],
        pass: [{required: true, message: '授权码不能为空', trigger: 'blur'}],
        host: [{required: true, message: '服务器地址复制下呗', trigger: 'blur'}],
        to: [{type: 'email', message: '邮箱格式不正确', trigger: 'blur'}],
        port: [{type: 'number', message: '端口为数字', trigger: 'blur'}],
        serverChan: [{required: true, message: '密钥不能为空', trigger: 'blur'}],
      }
    }
  },
  methods: {
    async onSubmit() {
      let emailValid = true, serverChanValid = true, message = {};
      if (this.messagePush.useEmail) {
        emailValid = await this.validateForm('useEmail', 'emailForm', 'email表单未完成');
        message.email = this.message.email;
      }
      if (this.messagePush.useServerChan) {
        serverChanValid = await this.validateForm('useServerChan', 'serverChanForm', 'serverChan表单未完成');
        message.serverChan = this.message.serverChan;
      }
      if (emailValid && serverChanValid) {
        this.$store.commit("updateMessage", message);
        this.$message.success('消息配置成功')
        await this.$router.push('/users')
      }
    },
    validateForm(useName, formName, warning) {
      if (!this.messagePush[useName]) return true;
      let validTemp = true;
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          this.$message.warning(warning)
          return validTemp = false;
        }
      });
      return validTemp;
    }
  }
}
</script>

<style>
.base-message-push input,
.base-message-push .el-input--suffix,
.base-message-push textarea {
  width: 300px;
}

.base-message-push .el-divider {
  width: 500px;
}
</style>

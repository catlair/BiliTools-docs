<template>
  <div class="message-push">
        <el-form ref="emailForm" :model="message.email" :rules="rules" label-width="140px">
          <el-form-item label="使用消息推送">
            <el-switch v-model="messagePush.use"></el-switch>
          </el-form-item>
          <el-collapse-transition>
            <div v-show="messagePush.use">
              <el-form-item label-width="20px">
                <el-form-item label="email">
                  <el-switch @change="changeMessageEmail" v-model="messagePush.useEmail"
                             style="margin-right: 60px"></el-switch>
                  自定义设置
                  <el-switch @change="changeMsgEmailCustom" v-model="messagePush.useEmailCustom" active-color="#13ce66"
                             style="margin-left: 10px"></el-switch>
                  <el-collapse-transition>
                    <div class="email" v-show="messagePush.useEmailCustom" style="margin-left: -140px;">
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
                    </div>
                  </el-collapse-transition>
                </el-form-item>
              </el-form-item>
            </div>
          </el-collapse-transition>
        </el-form>
        <div v-show="messagePush.use">
          <el-form ref="serverChanForm" :model="message" :rules="rules" label-width="160px">
            <el-form-item label="server酱">
              <el-switch @change="changeMessageServerChan" v-model="messagePush.useServerChan"
                         style="margin-right: 60px"></el-switch>
              自定义设置
              <el-switch @change="changeMsgServerChanCustom" v-model="messagePush.useServerChanCustom"
                         active-color="#13ce66"
                         style="margin-left: 10px"></el-switch>
              <el-collapse-transition>
                <div v-show="messagePush.useServerChanCustom">
                  <el-form-item prop="serverChan" style="margin-bottom: 30px">
                    <el-input
                        type="textarea"
                        autosize
                        placeholder="请输入server酱的key"
                        v-model.trim="message.serverChan">
                    </el-input>
                  </el-form-item>
                </div>
              </el-collapse-transition>
            </el-form-item>
          </el-form>
        </div>
      </div>
</template>

<script>
export default {
  name: "MessagePush",
  props: ['message'],
  data() {
    return {
      messagePush: {
        use: false,
        useEmail: true,
        useServerChan: true,
        useEmailCustom: false,
        useServerChanCustom: false
      },
      config: {
        message: {}
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
    changeMessageEmail() {
      !this.messagePush.useEmail && (this.messagePush.useEmailCustom = false)
    },
    changeMessageServerChan() {
      !this.messagePush.useServerChan && (this.messagePush.useServerChanCustom = false)
    },
    changeMsgEmailCustom() {
      this.messagePush.useEmailCustom && (this.messagePush.useEmail = true)
    },
    changeMsgServerChanCustom() {
      this.messagePush.useServerChanCustom && (this.messagePush.useServerChan = true);
      this.$refs['serverChanForm'].clearValidate('serverChan')
    },
    setMessage() {
      let message = {
        email: true,
        serverChan: true
      }
      if (this.messagePush.use === false) {
        this.config.message = false
        return true;
      }
      if (this.messagePush.useServerChan === false) {
        message.serverChan = false
      } else {
        if (this.messagePush.useServerChanCustom) {
          message.serverChan = this.message.serverChan
        }
      }
      if (this.messagePush.useEmail === false) {
        message.email = false
      } else {
        if (this.messagePush.useEmailCustom) {
          message.email = this.message.email
        }
      }
      const allTrue = Object.values(message).every(el => el === true);
      if (allTrue) {
        this.config.message = true;
        return true;
      }
      this.config.message = message;

      let emailFormValid = true, serverChanValid = true;
      this.$refs['emailForm'].validate((valid) => {
        if (!valid) {
          return emailFormValid = false;
        }
      });
      this.$refs['serverChanForm'].validate((valid) => {
        if (!valid) {
          return serverChanValid = false;
        }
      });
      return emailFormValid && serverChanValid
    }
  }
}
</script>

<style>
.message-push .email .el-form-item {
  margin: 20px auto;
}
</style>

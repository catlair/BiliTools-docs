<template>
  <div class="message-push">
    <el-form ref="emailForm" :model="message.email" :rules="rules" label-width="140px">
      <el-form-item label="使用消息推送">
        <el-switch v-model="messagePush.use"></el-switch>
        <div v-show="messagePush.use" style="display: inline-block;margin-left: 60px">
          自定义设置
          <el-switch @change="changeMessageCustom" v-model="messagePush.custom" active-color="#13ce66"></el-switch>
        </div>
      </el-form-item>
      <el-collapse-transition>
        <div v-show="messagePush.use && messagePush.custom">
          <el-form-item label-width="20px">
            <el-form-item label="email">
              <el-switch @change="changeMessageEmail" v-model="messagePush.email.use"
                         style="margin-right: 60px"></el-switch>
              自定义设置
              <el-switch @change="changeMsgEmailCustom" v-model="messagePush.email.custom" active-color="#13ce66"
                         style="margin-left: 10px"></el-switch>
              <el-collapse-transition>
                <div class="email" v-show="messagePush.email.custom" style="margin-left: -140px;">
                  <el-form-item label="发件邮箱" prop="from">
                    <el-input type="email" placeholder="from email" size="small"
                              v-model.trim="message.email.from"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱授权码" prop="pass">
                    <el-input placeholder="邮箱授权码" v-model.trim="message.email.pass" size="small"
                              show-password></el-input>
                  </el-form-item>
                  <el-form-item label="接收邮箱" prop="to">
                    <el-input type="email" placeholder="to email" size="small"
                              v-model.trim="message.email.to"></el-input>
                  </el-form-item>
                  <el-form-item label="服务器地址" prop="host">
                    <el-input placeholder="发送邮件的服务器地址" size="small" v-model.trim="message.email.host"></el-input>
                  </el-form-item>
                  <el-form-item label="端口" prop="port">
                    <el-input placeholder="安全信息默认465" size="small" v-model.number="message.email.port"></el-input>
                  </el-form-item>
                </div>
              </el-collapse-transition>
            </el-form-item>
          </el-form-item>
        </div>
      </el-collapse-transition>
    </el-form>
    <div v-show="messagePush.use && messagePush.custom">
      <el-form ref="serverChanForm" :model="message" :rules="rules" label-width="160px">
        <el-form-item label="server酱">
          <el-switch @change="changeMessageServerChan" v-model="messagePush.serverChan.use"
                     style="margin-right: 60px"></el-switch>
          自定义设置
          <el-switch @change="changeMsgServerChanCustom" v-model="messagePush.serverChan.custom"
                     active-color="#13ce66"
                     style="margin-left: 10px"></el-switch>
          <el-collapse-transition>
            <div v-show="messagePush.serverChan.custom">
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
  props: ['saveKey'],
  data() {
    return {
      message: {},
      messagePush: {},
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
  created() {
    this.message = Object.copy(this.$store.state.temp[this.saveKey].message)
    this.messagePush = Object.copy(this.$store.state.temp[this.saveKey].switch.message)
  },
  methods: {
    changeMessageEmail() {
      !this.messagePush.email.use && (this.messagePush.email.custom = false)
      if (this.messagePush.email.use) return;
      this.messagePush.email.custom = false
      if (!this.messagePush.serverChan.use) {
        this.messagePush.custom = false;
      }
    },
    changeMessageServerChan() {
      if (this.messagePush.serverChan.use) return;
      this.messagePush.serverChan.custom = false
      if (!this.messagePush.email.use) this.messagePush.custom = false;
    },
    changeMsgEmailCustom() {
      this.messagePush.email.custom && (this.messagePush.email.use = true)
    },
    changeMsgServerChanCustom() {
      this.messagePush.serverChan.custom && (this.messagePush.serverChan.use = true);
      this.$refs['serverChanForm'].clearValidate('serverChan')
    },
    changeMessageCustom() {
      const msg = Object.keys(this.messagePush).filter(el => typeof this.messagePush[el] === 'object')
      //如果全部都是false,那么打开时全部都设置成true
      if (msg.every(el => this.messagePush[el].use === false)) {
        msg.forEach(el => {
          if (typeof this.messagePush[el] === 'object') {
            this.messagePush[el].use = true;
          }
        })
      }
    },
    validForm() {
      if (!this.$store.state.temp[this.saveKey].switch.message.use) return true;
      let emailFormValid = true, serverChanValid = true;
      this.$refs['emailForm'].validate((valid) => {
        if (!valid && this.messagePush.email.custom) {
          return emailFormValid = false;
        }
      });
      this.$refs['serverChanForm'].validate((valid) => {
        if (!valid && this.messagePush.serverChan.custom) {
          return serverChanValid = false;
        }
      });
      return emailFormValid && serverChanValid
    }
  },
  watch: {
    messagePush: {
      handler(value) {
        this.$store.commit('switch', {
          k: 'message',
          value,
          saveKey: this.saveKey
        })
      },
      deep: true
    },
    message: {
      handler(value) {
        this.$store.commit('update', {
          k: 'message',
          value,
          saveKey: this.saveKey
        })
      },
      deep: true
    }
  }
}
</script>

<style>
.message-push .email .el-form-item {
  margin: 16px auto;
}
</style>

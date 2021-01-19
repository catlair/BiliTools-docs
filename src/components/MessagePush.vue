<template>
  <div>
    <el-collapse-transition>
      <div>
        <el-form ref="form" :model="message.email" label-width="140px">
          <el-form-item label="使用消息推送">
            <el-switch v-model="messagePush.use"></el-switch>
          </el-form-item>
          <div v-show="messagePush.use">
            <el-form-item label-width="20px">
              <el-form-item label="email">
                <el-switch @change="changeMessageEmail" v-model="messagePush.useEmail"
                           style="margin-right: 60px"></el-switch>
                自定义设置
                <el-switch @change="changeMsgEmailCustom" v-model="messagePush.useEmailCustom" active-color="#13ce66"
                           style="margin-left: 10px"></el-switch>
                <el-collapse-transition>
                  <div v-show="messagePush.useEmailCustom">
                    <el-form-item required label="发件邮箱">
                      <el-input size="mini" type="email" placeholder="from email"
                                v-model="message.email.from"></el-input>
                    </el-form-item>
                    <el-form-item required label="邮箱授权码">
                      <el-input size="mini" placeholder="邮箱授权码" v-model="message.email.pass"
                                show-password></el-input>
                    </el-form-item>
                    <el-form-item label="接收邮箱">
                      <el-input size="mini" type="email" placeholder="to email"
                                v-model="message.email.to"></el-input>
                    </el-form-item>
                    <el-form-item required label="服务器地址">
                      <el-input size="mini" placeholder="发送邮件的服务器地址" v-model="message.email.host"></el-input>
                    </el-form-item>
                    <el-form-item required label="端口">
                      <el-input size="mini" placeholder="安全信息默认465" v-model="message.email.port"></el-input>
                    </el-form-item>
                  </div>
                </el-collapse-transition>
              </el-form-item>
            </el-form-item>
          </div>
        </el-form>
        <div v-show="messagePush.use">
          <el-form ref="form2" :model="message" label-width="160px">
            <el-form-item label="server酱">
              <el-switch @change="changeMessageServerChan" v-model="messagePush.useServerChan"
                         style="margin-right: 60px"></el-switch>
              自定义设置
              <el-switch @change="changeMsgServerChanCustom" v-model="messagePush.useServerChanCustom"
                         active-color="#13ce66"
                         style="margin-left: 10px"></el-switch>
              <el-collapse-transition>
                <div v-show="messagePush.useServerChanCustom">
                  <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入server酱的key"
                      v-model="message.serverChan">
                  </el-input>
                </div>
              </el-collapse-transition>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "MessagePush",
  data() {
    return {
      messagePush: {
        use: false,
        useEmail: true,
        useServerChan: true,
        useEmailCustom: false,
        useServerChanCustom: false
      },
      message: {
        serverChan: '',
        email: {
          from: '',
          to: '',
          pass: '',
          host: '',
          port: 465
        },
      },
      config: {
        message: {}
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
      this.messagePush.useServerChanCustom && (this.messagePush.useServerChan = true)
    },
    setMessage() {
      let message = {
        email: true,
        serverChan: true
      }
      if (this.messagePush.use === false) {
        this.config.message = false
        return;
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
        return;
      }
      this.config.message = message;
    }
  }
}
</script>

<style scoped>

</style>

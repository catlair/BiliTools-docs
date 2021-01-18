<template>
  <div>
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
              <div v-show="messagePush.useEmailCustom">
                <el-form-item required label="发件邮箱">
                  <el-input size="mini" type="email" placeholder="from email"
                            v-model="form.message.email.from"></el-input>
                </el-form-item>
                <el-form-item required label="邮箱授权码">
                  <el-input size="mini" placeholder="邮箱授权码" v-model="form.message.email.pass"
                            show-password></el-input>
                </el-form-item>
                <el-form-item label="接收邮箱">
                  <el-input size="mini" type="email" placeholder="to email"
                            v-model="form.message.email.to"></el-input>
                </el-form-item>
                <el-form-item required label="服务器地址">
                  <el-input size="mini" placeholder="发送邮件的服务器地址" v-model="form.message.email.host"></el-input>
                </el-form-item>
                <el-form-item required label="端口">
                  <el-input size="mini" placeholder="安全信息默认465" v-model="form.message.email.port"></el-input>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form-item>
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
                    v-model="form.message.serverChan">
                </el-input>
              </div>
            </el-collapse-transition>
          </el-form-item>
        </el-form-item>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: "MessagePush",
  props: ['messagePush', 'form'],
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
  }
}
</script>

<style scoped>

</style>

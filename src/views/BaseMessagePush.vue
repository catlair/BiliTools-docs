<template>
  <div class="base-message-push">
    <el-form ref="form" :model="message" label-width="140px">
      <el-form-item label="使用邮箱推送">
        <el-switch v-model="messagePush.useEmail"></el-switch>
      </el-form-item>
      <el-form-item label="发件邮箱" prop="from">
        <el-input type="email" placeholder="from email"
                  v-model="message.email.from"></el-input>
      </el-form-item>
      <el-form-item required label="邮箱授权码">
        <el-input placeholder="邮箱授权码" v-model="message.email.pass"
                  show-password></el-input>
      </el-form-item>
      <el-form-item label="接收邮箱">
        <el-input type="email" placeholder="to email"
                  v-model="message.email.to"></el-input>
      </el-form-item>
      <el-form-item required label="服务器地址">
        <el-input placeholder="发送邮件的服务器地址" v-model="message.email.host"></el-input>
      </el-form-item>
      <el-form-item required label="端口">
        <el-input placeholder="安全信息默认465" v-model="message.email.port"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="使用server酱">
        <el-switch v-model="messagePush.useServerChan"></el-switch>
      </el-form-item>
      <el-form-item label="server酱">
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
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit("updateMessage",this.message);
      this.saveDate();
      this.$router.push('/users')
    },
    saveDate() {
      window.localStorage.setItem('globalConfig', JSON.stringify({
        message: this.message,
        messagePush: this.messagePush
      }))
    },
    getDate() {
      let data = window.localStorage.getItem('globalConfig')
      if (!data) return;
      data = JSON.parse(data);
      this.message = data.message;
      this.messagePush = data.messagePush;
    }
  },
  mounted() {
    this.getDate();
    this.timer = setInterval(() => {
      this.saveDate()
    }, 5000)
  },
  beforeDestroy() {
    this.saveDate()
    clearInterval(this.timer)
    console.log('销毁')
  }
}
</script>

<style>
.base-message-push input, .base-message-push textarea {
  width: 300px;
}

.base-message-push .el-divider {
  width: 500px;
}
</style>

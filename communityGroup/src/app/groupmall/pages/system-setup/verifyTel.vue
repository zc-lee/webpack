<template>
  <div>
    <Modal
      :title    = "isEdit?'编辑商户信息':'查看商户秘钥'"
        v-model = "show"
        width   = "420px"
      footer-hide
      @on-visible-change = "isValid=true;varCode=''"
    >
      <!-- 验证 -->
      <template v-if="isValid">
        <div class="ml-40 mt-30 box fc-4f627b">
          <div class>管理员手机号：{{userInfo.userTel}}</div>
        </div>
        <div class="ml-40 mt-30 box fc-4f627b">
          <Input class="w-160" v-model="varCode" maxlength="6" placeholder="6位数字验证码"/>
          <Button
              class   = "ml-10"
            :disabled = "timeout!=60"
              type    = "primary"
              @click  = "getVarCode"
          >{{timeout!=60?'重新发送 '+timeout:'获取验证码'}}</Button>
        </div>
        <div class="mt-40 center">
          <Button type @click="show=false">取消</Button>
          <Button class="ml-20" type="primary" @click="save">确定</Button>
        </div>
      </template>
      <!-- 查看商户秘钥 -->
      <template v-else></template>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    parent: {
      type: Object
    }
  },
  data() {
    return {
      show    : false,
      isEdit  : false,   // edit or check
      timeout : 60,
      interval: null,
      isValid : true,
      varCode : "",
      secret  : ""
    };
  },
  computed: {
    ...mapGetters(["userInfo", "systemSetMsg"])
  },
  methods: {
    ...mapActions(["getValidCode", "validTel", "checkSecret"]),
    /**
     * @method
     * @description 确定
     */
    async save() {
      if (!this.varCode) {
        return this.$Message.warning("请输入验证码");
      }
      let res = await this.validTel({
        userTel: this.userInfo.userTel,
        smsCode: this.varCode
      });
      if (!res) {
        return;
      }
      let param = {
          appId: this.systemSetMsg.appid,
          code : this.varCode
        },
        secret = await this.checkSecret(param);
      if (this.isEdit) {
        this.show             = false;
        this.parent.isEdit    = true;
        this.parent.secretKey = secret.data;
      } else {
        this.isValid = false;
        this.secret  = secret.data;
      }
    },
    async getVarCode() {
      let res = await this.getValidCode();
      if (res.code == 100) {
        this.interval = setInterval(_ => {
          if (this.timeout != 0) {
            this.timeout -= 1;
          } else {
            this.clearInterval();
          }
        }, 1000);
      }
    },
    clearInterval() {
      clearInterval(this.interval);
      this.interval = null;
      this.timeout  = 60;
    },
    /**
     * @method
     * @description 复制秘钥
     */
    copySecret() {
      var Url2 = document.getElementById("secretId");
      Url2.select(); // 选择对象 1231231
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$Message.success("复制商户秘钥");
    }
  },
  mounted() {}
};
</script>
<style>
</style>
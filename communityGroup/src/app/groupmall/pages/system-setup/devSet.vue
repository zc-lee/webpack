<template>
  <div>
    <div class="between">
      <div class="box">
        <div>AppId（小程序ID）</div>
        <div>{{systemSetMsg.appid}}</div>
      </div>
      <Poptip placement="bottom" trigger="click" width="180" word-wrap>
        <div class="mt-20 middle pointer">
          <Icon class="fs-16" type="md-apps"/>
          <span class="ml-10">点击生成小程序体验码</span>
        </div>
        <div slot="content" class="text-center">
          <img class="wh-140" :src="imgPlat+systemSetMsg.expcode" alt>
          <div class="fs-10 fs-10 mt-10">用微信扫一扫，如果提示没有体验权限，请在下方输入微信号，添加体验者</div>
        </div>
      </Poptip>
    </div>
    <!-- 商户号 -->
    <div class="box">
      <div class="required">商户号</div>
      <Input v-if="isEdit" class="w-300" v-model="mchId"/>
      <div v-else>{{systemSetMsg.mchId}}</div>
    </div>
    <!-- 商户秘钥 -->
    <div class="box">
      <div class="required">商户秘钥</div>
      <Input v-if="isEdit" class="w-300" v-model="secretKey" placeholder/>
      <div v-else>* * * * * * * * * * * * * * * * * * * * * * *</div>
      <Button
        class  = "ml-40"
        type   = "text"
        @click = "$refs.varifyTel.show=true;$refs.varifyTel.isEdit=false;"
      >查看</Button>
      <Poptip placement="bottom" trigger="hover" width="430" :offset="5" word-wrap>
        <Icon class="fs-16 ml-10" type="md-help-circle"/>
        <div slot="content">出于安全考虑，商户秘钥不再被明文保存，查看需验证身份</div>
      </Poptip>
    </div>
    <div class="box">
      <div class="required">支付证书</div>
      <Upload
          v-if            = "isEdit"
        :action           = "uploadUrl(4001)"
          name            = "files"
        :show-upload-list = "false"
        :on-success       = "onSuccess"
        :on-error         = "onError"
        :before-upload    = "beforeUpload"
      >
        <Button icon="ios-cloud-upload-outline">上传文件</Button>
      </Upload>
      <Button icon="ios-cloud-upload-outline" v-else>已上传</Button>
    </div>
    <div class="box">
      <div class></div>
      <div>
        <div class="mb-20 fs-10">微信商户平台，微信支付API证书apiclient_cert.p12</div>
        <Button type="primary" @click="edit">{{isEdit?'保存':'编辑'}}</Button>
      </div>
    </div>
    <hr class="mt-40 mb-30">
    <div class="box">
      <div class>添加体验者
        <Poptip placement="bottom-start" trigger="hover" width="430" word-wrap :offset="-15">
          <Icon class="fs-16" type="md-help-circle"/>
          <div slot="content">个人主体小程序可添加15个体验者，企业主体可添加50个体验者</div>
        </Poptip>
      </div>
      <Input class="mr-10 w-260" v-model="weChat"/>
      <Button type="primary" @click="sureAdd">确认添加</Button>
    </div>
    <div class="box">
      <div class></div>
      <div class="b w-690 p-20 mt-20">
        <div>成员管理</div>
        <div class="flex wrap">
          <div class="mr-10 mt-10" v-for="(item,i) in systemSetMsg.experiencersTemp" :key="i">
            <div class="text-center mt-10 flex">
              <div class="mt-10">{{item}}</div>
              <Icon @click="sureDel(item)" type="md-close-circle"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <varifyTel ref="varifyTel" :parent.sync="that"></varifyTel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import varifyTel from "./verifyTel";
export default {
  components: {
    varifyTel
  },
  data() {
    return {
      that              : null,
      weChat            : "",
      isEdit            : false,
      mchId             : "",      //商户号
      secretKey         : "",      // 秘钥
      payCertificatePath: "",
      visible           : false
    };
  },
  computed: {
    ...mapGetters(["systemSetMsg", "imgPlat", "uploadUrl", "userInfo"])
  },
  mounted() {
    this.that = this;
  },
  methods: {
    ...mapActions(["getSystemSetMsg", "updateBusinessMsg", "setExperience"]),
    edit() {
      if (this.isEdit) {
        this.save();
      } else {
        this.$refs.varifyTel.show   = true;
        this.$refs.varifyTel.isEdit = true;
        this.mchId                  = this.systemSetMsg.mchId;
      }
    },
    /**
     * @method
     * @description 保存
     */
    async save() {
      this.isEdit = false;
      return;
      if (!this.mchId) {
        return this.$Message.warning("请输入商户号");
      }
      if (!this.secretKey) {
        return this.$Message.warning("请输入商户秘钥");
      }
      if (!this.certificatePath) {
        return this.$Message.warning("请上传支付证书");
      }
      let param = {
          appid          : this.systemSetMsg.appid,
          certificatePath: this.payCertificatePath,
          mchId          : this.mchId,
          mchKey         : this.secretKey
        },
        res = await this.updateBusinessMsg(param);
      if (res.code == 100) {
        this.getSystemSetMsg();
        this.$Message.success("修改成功");
        this.isEdit = false;
      } else {
        this.$Message.warning(res.message);
      }
    },
    /**
     * @method
     * @description 上传支付证书
     */
    onSuccess(res) {
      this.payCertificatePath = res.data;
    },
    onError(file) {
      console.log(file);
    },
    beforeUpload(file) {
      if (file.type != "application/x-pkcs12") {
        this.$Message.warning("请上传微信支付API证书apiclient_cert.p12");
        return false;
      }
    },
    /**
     * @method
     * @description 确认添加体验者
     */
    async sureAdd() {
      if (!this.weChat) {
        return this.$Message.warning("请输入微信号");
      }
      let param = {
          authorizerAppid: this.systemSetMsg.appid,
          type           : "add",
          userwx         : this.weChat
        },
        res = await this.setExperience(param);
      if (res.result == "85001") {
        this.$Message.warning(res.object);
      } else {
        this.weChat = "";
        this.$Message.success(res.object);
        this.getSystemSetMsg();
      }
    },
    /**
     * @method
     * @description 删除添加体验者
     */
    sureDel(userwx) {
      this.$Modal.confirm({
        title  : "提示",
        content: "成员删除后将没有体验权限，确认删除？",
        onOk   : async _ => {
          let param = {
              authorizerAppid: this.systemSetMsg.appid,
              type           : "del",
              userwx
            },
            res = await this.setExperience(param);
          if (res.code == 100) {
            this.$Message.success(res.object);
          } else {
            this.$Message.info(res.object);
          }
          this.getSystemSetMsg();
        },
        onCancel: res => {
          this.$Message.info("取消删除");
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  margin-top : 20px;
  display    : flex;
  align-items: center;
  color      : #4f627b;
  margin-left: 16px;
}
.box > :first-child {
  color: #7f7f7f;
  width: 130px;
}
.required::before {
  content: "* ";
  color  : #ff0036;
}
</style>


<template>
  <div>
    <div class="box">
      <div>小程序名称</div>
      <div>{{systemSetMsg.miniName}}</div>
    </div>
    <div class="box">
      <div>小程序头像</div>
      <Poptip placement="right" trigger="hover">
        <img class="avat" :src="systemSetMsg.logo">
        <img class="mini-code" slot="content" :src="systemSetMsg.logo">
      </Poptip>
    </div>
    <div class="box">
      <div>小程序码</div>
      <div class="code-box">
        <img class="mini-code" :src="systemSetMsg.qrcode">
        <Button class="down-code" type="text" @click="downCode">下载小程序码</Button>
      </div>
    </div>
    <div class="box">
      <div>小程序介绍</div>
      <div>{{systemSetMsg.signature}}</div>
    </div>
    <div class="box">
      <div>主体信息</div>
      <div>{{systemSetMsg.principalName}}</div>
    </div>
    <div class="box">
      <div>服务类目</div>
      <div class="type-box">
        <div
              v-for = "item in systemSetMsg.auditData"
            :key    = "item"
        >{{item.firstClass }} > {{item.secondClass}};</div>
      </div>
    </div>
    <div class="box">
      <div>更新授权</div>
      <Button type="primary" @click="syncBaseMsg">同步基本信息</Button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["systemSetMsg"])
  },
  mounted() {},
  methods: {
    ...mapActions(["refreshAuthorizerInfo",'syncBaseMsg']),
    /**
     * @method
     * @description 下载二维码
     */
    downCode(src) {
      console.log("down code");
              src          = this.systemSetMsg.qrcode;
          let tag          = document.createElement("a");
              tag.href     = src;
              tag.download = "";
      tag.click();
    },
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
.avat {
  width : 60px;
  height: 60px;
}
.mini-code {
  width : 160px;
  height: 160px;
}
.code-box {
  display    : flex;
  align-items: flex-end;
}
.down-code {
  color        : #1e83d3;
  margin-bottom: 20px;
  margin-left  : 30px;
}
.down-code:hover {
  color: #1eafd3;
}
.type-box {
  display: flex;
}
</style>


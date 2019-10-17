<template>
  <div>
    <div class="box">
      <div>授权托管状态</div>
      <div class="fc-danger" v-if="!systemSetMsg.authorizerFlag">未授权</div>
      <div class="fc-1e83d3" v-else>已授权</div>
      <Poptip placement="bottom-start" trigger="hover" word-wrap width="730" :offset="-5">
        <Icon type="md-help-circle fs-16 ml-10"/>
        <div
          class = "tip"
          slot  = "content"
        >小程序授权托管后，使用第三方授权码获取小程序相关的API信息，代您完成小程序开发相关事宜直至代码上传。如您中途取消托管，为了不影响小程序正常更新使用，需点击重新授权即可正常使用。</div>
      </Poptip>
      <Button class="ml-20" type="primary" v-if="!systemSetMsg.authorizerFlag" @click="reauth">重新授权</Button>
    </div>
    <div class="box">
      <div class>运行状态</div>
      <div v-if="systemSetMsg.runFlag" class="fc-1e83d3">运行中</div>
      <div v-else>已关闭</div>
    </div>
    <div class="box">
      <div class>小程序状态</div>
      <div class="fc-success" v-if="systemSetMsg.currentVersionNumName!=null">已上线</div>
      <div v-else class="fc-danger">未上线</div>
    </div>
    <div class="box">
      <div class>当前版本</div>
      <template v-if="systemSetMsg.currentVersionNumName!=null">
        <div class>{{systemSetMsg.currentVersionNumName}}</div>
        <div class="fc-7f fs-12">（发布时间：{{systemSetMsg.currentVersionSendTime}}）</div>
      </template>
      <div v-else>无</div>
    </div>
    <div class="box">
      <div class>审核中版本</div>
      <template v-if="systemSetMsg.auditStatus==2">
        <div class="fc-1e83d3">{{systemSetMsg.auditingVersionNumName}}</div>
        <div class="fc-7f fs-12">（提交审核时间：{{systemSetMsg.auditingVersionSummitTime}}）</div>
        <Button :loading="isClick" class="ml-20" type="primary" @click="cancelCheck">撤销审核</Button>
      </template>
      <template v-else-if="systemSetMsg.auditStatus==1">
        <div class="fc-danger">
          <Poptip placement="bottom-start" trigger="hover" width="730">
            <Icon type="ios-information-circle fs-16 ml-10"/>
            <div class="tip" slot="content">
              <div>你的小程序"超级棱镜程序体验"代码发布审核未通过，原因如下：</div>
              <div>{{systemSetMsg.auditingComeToNothingReason}}</div>
            </div>
          </Poptip>
          {{systemSetMsg.auditingVersionNumName}}审核失败
        </div>
        <div class="fc-7f fs-12">（审核完成时间：{{systemSetMsg.auditingVersionTime}}）</div>
        <Button :loading="isClick" class="ml-20" type="primary" @click="reSubmitCheck">重新提交审核</Button>
      </template>
      <div v-else>无</div>
    </div>
    <div class="box">
      <div class>版本更新</div>
      <template v-if="systemSetMsg.versionUpdateNumId!=null &&　systemSetMsg.auditStatus==2">
        <div class="fc-danger">已有新版本{{systemSetMsg.versionUpdateNumName}}</div>
        <div class="fc-7f fs-12">（更新时间：{{systemSetMsg.versionUpdateTime}}）</div>
        <div class="fc-1e83d3">当前有审核中版本，请撤销后重新提交审核</div>
      </template>
      <template v-else-if="systemSetMsg.versionUpdateNumId">
        <div class="fc-danger">已有新版本{{systemSetMsg.versionUpdateNumName}}</div>
        <div class="fc-7f fs-12">（更新时间：{{systemSetMsg.versionUpdateTime}}）</div>
        <Button :loading="isClick" class="ml-20" type="primary" @click="updateVersion">更新</Button>
      </template>
      <div class v-else>当前为最新版本</div>
    </div>
    <div class="box">
      <div class>服务时长</div>
      <div class>{{systemSetMsg.endDate}}到期</div>
      <div class="fc-7f fs-12" v-if="systemSetMsg.endNum>15">（剩余{{systemSetMsg.endNum}}天）</div>
      <template v-else>
        <div class="flex middle">
          <div class="fc-danger fs-12">（剩余{{systemSetMsg.endNum}}天）</div>
          <Button type="primary ml-20" @click="$Message.info('续费')">续费</Button>
        </div>
      </template>
    </div>
    <div class="box">
      <div class>使用空间</div>
      <div class="w-200">
        <Progress :percent="systemSetMsg.capacityPercent"></Progress>
      </div>
      <Poptip v-model="showCapacity" placement="top" trigger="click" width="730">
        <Button type="primary">申请扩容</Button>
        <div class="p-20" slot="content">
          <div class="fw-bold mb-20">申请扩容（请设置容量大小）</div>
          <div class="middle">
            <div class="w-690">
              <Slider
                class
                v-model       = "capacity"
                tooltip-class = "bc-9"
                show-input
                show-stops
                :max  = "1024"
                :step = "256"
              ></Slider>
            </div>
            <div class="ml-10">M</div>
          </div>
          <div class="center mt-20">
            <Button type @click="showCapacity=false">取消</Button>
            <Button class="ml-20" type="primary" @click="confirmExtend">确认</Button>
          </div>
        </div>
      </Poptip>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      showCapacity: false,
      isClick     : false,
      capacity    : 256 * 4
    };
  },
  computed: {
    ...mapGetters(["systemSetMsg", "userInfo"])
  },
  mounted() {},
  methods: {
    ...mapActions([
      "reauth",
      "cancelAudit",
      "getSystemSetMsg",
      "updateVersion"
    ]),
    /**
     * @method
     * @description 撤销审核
     */
    async cancelCheck() {
          this.isClick = true;
      let res          = this.cancelAudit();
      if (res.code == 99) {
        this.$Message.warning(res.result);
      } else {
        this.getSystemSetMsg();
        this.isClick = false;
      }
    },
    /**
     * @method
     * @description 更新
     */
    async updateVersion() {
          this.isClick = true;
      let res          = await this.updateVersion({
        authorizerAppid: this.userInfo.appid,
        appmodelId     : this.userInfo.appmodelId,
        versionId      : this.systemSetMsg.versionUpdateNumId
      });
      this.$Message.warning(res.result);
      this.getSystemSetMsg();
      this.isClick = false;
    },
    /**
     * @method
     * @description 重新提交审核
     */
    async reSubmitCheck() {
      this.isClick = true;
      // this.$message.warning("重新提交审核");
      let res = await this.updateVersion({
        authorizerAppid: this.systemSetMsg.appid,
        appmodelId     : this.userInfo.appmodelId,
        versionId      : this.systemSetMsg.auditingVersionNumId
      });
      this.$Message.warning(res.result);
      this.getSystemSetMsg();
      this.isClick = false;
    },
    /**
     * @method
     * @description 确定扩容
     */
    confirmExtend() {
      if (this.capacity == 0) {
        this.$Message.warning("请选择扩容的内存");
      } else {
        this.showCapacity = false;
        this.$Message.success("申请中，请耐心等候");
      }
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
.fc-danger {
  color: #fa5555;
}
.fc-success {
  color: #67c23a;
}
.fc-1e83d3 {
  color: #1e83d3;
}
.fc-7f {
  color: #7f7f7f;
}
.fs-12 {
  font-size: 12px;
}
.fs-16 {
  font-size: 16px;
}
.fw-bold {
  font-weight: bold;
}
.ml-10 {
  margin-left: 10px;
}
.ml-20 {
  margin-left: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mt-20 {
  margin-top: 20px;
}
.mt-30 {
  margin-top: 30px;
}
.p-20 {
  padding: 20px;
}
.w-200 {
  width: 200px;
}
.w-690 {
  width: 690px;
}
.middle {
  display    : flex;
  align-items: center;
}
.center {
  display        : flex;
  justify-content: center;
}
</style>


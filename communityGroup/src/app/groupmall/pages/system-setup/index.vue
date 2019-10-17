<template>
  <div class="box">
    <Tabs v-model="tab">
      <TabPane v-for="(v,i) in tabList" :key="i" :label="v" :name="String(i)"></TabPane>
    </Tabs>
    <serve-msg v-if="tab==0"></serve-msg>
    <base-msg v-if="tab==1"></base-msg>
    <dev-set v-if="tab==2"></dev-set>
    <test v-if="tab==3"></test>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import serveMsg from "./serveMsg";
import baseMsg from "./baseMsg";
import devSet from "./devSet";
import test from "./test";
export default {
  components: {
    serveMsg,
    baseMsg,
    devSet,
    test
  },
  data() {
    return {
      tab    : "0",
      tabList: ["服务信息", "基本信息", "开发设置", "test"]
    };
  },
  computed: {},
  created() {
    // this.getSystemSetMsg();
  },
  methods: {
    ...mapActions(["getSystemSetMsg"])
  }
};
</script>

<style scoped>
.box {
  background-color: #fff;
  min-height      : 722px;
  padding         : 15px;
  margin-top      : 10px;
}
</style>
<template>
  <div class="box">
    <img src="https://www.superprism.cn/imgcomm/baseMall/pc/limitbg.png">
    <div class="content">
      <Tabs :animated="false">
        <TabPane label="所有拼团活动">
          <activies></activies>
        </TabPane>
        <TabPane label="活动说明">
          <div>{{intro}}</div>

          <div class="title">一、适用场景</div>
          <div v-for="(v,i) in sence" :key="i">{{v}}</div>

          <div class="title">二、活动规则</div>
          <div v-for="(v,i) in activeRules" :key="i">{{i+1}}.{{v}}</div>

          <div class="title">三、使用方法</div>
          <div v-for="(v,i) in useWays" :key="i">{{i+1}}.{{v}}</div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
import activies from "./activies";
export default {
  components: {
    activies
  },
  computed: {},
  data() {
    return {
      intro: 
        "特价拼团是超级棱镜平台推出的一款抢购类营销工具，即用户以开拼团形式参与购物，享受拼团商品的折扣优惠福利。",
      sence      : ["小程序拼团功能可适用于多行业多场景，例如生鲜行业和百货行业如水果、鸡蛋、饮品等等。"],
      activeRules: [
        "在同一时间范围内未参加优享套餐、团购活动的所有上架商品均可参加此活动。",
        "活动时间只能为整时，如1小时、2小时、3小时等，多个拼团活动不能同时进行",
        "未开始的活动可以编辑、关闭和删除。",
        "进行中的活动不可编辑，但可以关闭并删除。",
        "已关闭的活动可以编辑重新发布，也可以删除。",
        "关闭、删除活动或从活动中移出商品，已经生成的订单不受影响。",
        "删除活动，将同时删除活动中的所有统计数据；从活动中移出商品，将同时删除该商品在活动中的统计数据。"
      ],
      useWays: [
        "新增拼团活动：填写活动名称、简介和备注，设置活动封面、时间范围、未付款订单关闭时间，添加商品并设定优惠价，预计提货时间。",
        "活动开启后，进入预热阶段，用户可在小程序端看到活动开始倒计时，但不能下单购买。",
        "倒计时结束，小程序前端拼团模块进入抢购倒计时，用户可以在倒计时结束前下单购买活动中的商品，商家可以在活动列表中实时查看该活动的交易信息。",
        "活动结束，商家根据后台的显示的订单信息发货。"
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.box {
  background-color: #fff;
  min-height      : 722px;
  margin-top      : 10px;
  color           : #4f627b;
}
.content {
  padding: 15px;
}
.title {
  font-weight: bold;
  margin-top : 15px;
}
</style>
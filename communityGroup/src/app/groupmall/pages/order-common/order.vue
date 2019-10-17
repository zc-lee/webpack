<template>
    <div>
        <div class="bc-white mt-20 py-40 px-20 " style="height:330px ">
            <div v-if="!searchType">
                <div class="pl-10 bb_dashed flex middle">
                    <div >分拣线路:</div>
                    <div v-for="item in line" :key="item" class="ml-40 fc-b2">
                        <div style="width:60px;height:24px;background-color:#d7e9f7" class="center middle" v-if="item.state==true">
                            {{item.lineName}}
                        </div>
                        <div v-else>{{item.lineName}}</div>
                    </div>
                </div>
                <div class="pl-10 bb_dashed flex mt-40 middle">
                    <div >区域:</div>
                    <div v-for="item in area" :key="item" class="ml-40 fc-b2">
                        <div style="width:60px;height:24px;background-color:#d7e9f7" class="center middle" v-if="item.state==true">
                            {{item.areaName}}
                        </div>
                        <div v-else>{{item.areaName}}</div>
                    </div>
                </div>
                <div class="pl-10 flex mt-40 middle">
                    <div >下单时间:</div>
                    <div v-for="item in timeList" :key="item" class="ml-40 fc-b2">
                        <div style="width:60px;height:24px;background-color:#d7e9f7" class="center middle" v-if="item.state==true">
                            {{item.time}}
                        </div>
                        <div v-else>{{item.time}}</div>
                    </div>
                </div>
                <div class="pl-10 flex mt-40 middle">
                    <div >活动:</div>
                    <div v-for="item in activeList" :key="item" class="ml-40 fc-b2">
                        <div style="width:60px;height:24px;background-color:#d7e9f7" class="center middle" v-if="item.state==true">
                            {{item.activeName}}
                        </div>
                        <div v-else>{{item.activeName}}</div>
                    </div>
                </div>
                <div class="middle center mt-20 px-10 bb">
                    <div style="color:#b3b3b3" @click="changeSearch">搜索</div>
                    <Icon type="md-arrow-dropup" style="color:#b3b3b3;font-size:20px"/>
                </div>
            </div>

            <div v-else>
                <div class="middle center px-10 bb">
                    <div style="color:#b3b3b3" @click="changeSearch">筛选</div>
                    <Icon type="md-arrow-dropdown" style="color:#b3b3b3;font-size:20px"/>
                </div>
                <div class="bc-f8" style="padding-left:65px;padding-right:16px;margin-top:16px;padding-top:20px;padding-bottom:36px">
                    <div class="flex between">
                        <div class="middle">商品种数:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                        <div class="middle">买家昵称:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                        <div class="middle">收货人姓名:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                    </div>
    
                    <div class="flex between mt-20">
                        <div class="middle">分拣线路:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                        <div class="middle">订单号:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                        <div class="middle">取货地点:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                    </div>

                    <div class="flex  mt-20">
                        <div class="middle">下单时间:
                            <Col span="12">
                            <TimePicker confirm type="timerange" placement="bottom-end"  style="width: 300px" class="ml-10"></TimePicker>
                            </Col>
                        </div>
                    </div>
                    <div class="mt-20" style="margin-left:60px">
                        <Button type="primary">搜索</Button>
                    </div>
                </div>
            </div>

        </div>
        <div class="bc-white mt-10 pl-10">
            <orderDetail ref="orderDetail"></orderDetail>
            <Poptip v-model="visible" placement="bottom-end"   class="absolute" style="top:516px;left:690px;" >
                <Icon type="ios-arrow-down" @click="timeSet"/>
                <div slot="content" >
                    <div @click="close">近三个月订单</div>
                    <div @click="close" class="mt-10">所有订单</div>
                </div>
            </Poptip>
        </div>


    
    
        
        
    </div>
</template>
<script>
import orderDetail from "../order-common/orderDetail.vue"
export default {
  data() {
    return {
      searchType: true,
      visible: false,
      line: [
        { lineName: "全部", state: true },
        { lineName: "线路一", state: false },
        { lineName: "线路二", state: false },
        { lineName: "线路三", state: false },
        { lineName: "线路四", state: false },
        { lineName: "线路五", state: false },
        { lineName: "线路六", state: false },
        { lineName: "线路七", state: false },
        { lineName: "线路八", state: false }
      ],
      area: [
        { areaName: "全部", state: true },
        { areaName: "洪塘", state: false },
        { areaName: "慈城", state: false },
        { areaName: "孔浦", state: false },
        { areaName: "庄市", state: false }
      ],
      timeList: [
        { time: "今日", state: true },
        { time: "昨日", state: false },
        { time: " 月  日", state: false },
        { time: " 月  日", state: false },
        { time: " 月  日", state: false },
        { time: " 月  日", state: false },
        { time: " 月  日", state: false }
      ],
      activeList: [
        { activeName: "大家一起团", state: true },
        { activeName: "今天来秒杀", state: false },
        { activeName: "明天来秒杀", state: false },
        { activeName: "大家一起团", state: false },
        { activeName: "大家明天团", state: false }
      ],
     
    };
  },
  mounted() {},
  components:{
      orderDetail,
  },
  methods: {
    changeSearch() {
      this.searchType = !this.searchType;
    },
    timeSet(){
        console.log(";a;;a")
    },
    close(){
        this.visible = !this.visible
    }
  }
};
</script>


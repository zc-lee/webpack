<template>
    <div class="goods-config">
        <div class="bc-f8" style="padding-left:65px;padding-right:16px;margin-top:16px;padding-top:20px;padding-bottom:36px">
            <div class="flex">
                <div class="middle">订单号:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                <div class="middle" style="margin-left:200px">小区名称:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
            </div>
            <div class="flex mt-20">
                <div class="flex middle">
                    <div>清单生成时间：</div>
                    <div class="flex middle">
                        <Col span="12">
                            <TimePicker v-model="serachStartTime" format="HH点mm分ss秒" style="width: 150px"></TimePicker>
                        </Col>
                        <div class=" mr-10">-</div> 
                        <Col span="12">
                            <TimePicker v-model="serachEndTime" format="HH点mm分ss秒"  style="width: 150px"></TimePicker>
                        </Col> 
                    </div>
                </div>
                <div class="middle" style="margin-left:50px">团长名称:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>   
            </div>
            
            <div class="mt-20" style="margin-left:80px">
                <Button type="primary" style="width:100px">搜索</Button>
            </div>
        </div>
        <div class="mt-40">
            <Button >批量备注</Button>
            <Button type="primary" class="ml-10" @click="showExport">导出分拣单</Button>
        </div>

        <div class="flex middle " style="margin-top:15px;height:30px;background-color:#f6f8fa">
            <Checkbox  v-model="seletAll" class=" ml-10" style="width:13%"></Checkbox>
            <div style="width:25%">商品</div>
            <div style="width:25%">生成时间</div>
            <div style="width:20%">数量</div>
            <div >小区名称</div>
        </div>

        <div class="mt-10  mb-10" v-for="item in orderList" :key="item" >
            <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                <Checkbox></Checkbox>
                <div style="margin-left:45px">手机电话:{{item.number}}</div>
                <div style="margin-left:76px">司机名称: {{item.driver}}</div>
                <div style="margin-left:76px">线路分拣单: {{item.route[0]}}  {{item.route[1]}}</div>
            </div>
            <div  v-for="v in item.shopList" :key="v">
                <div class="ml-40 mt-10">
                    订单号：{{v.shopNumber}}
                </div>
                <div class="flex mt-10">
                    <div style="height:100px;width:30%" class="middle b pl-30">
                        <img :src="v.shopImg" alt="" style="width:70px;height:70px" class="">
                        <div style="height:70px;" class="ml-10">
                            <div>{{v.shopName}}</div>
                            <div class="between  mt-10 w-100"> 
                                <div class="fs-10 flex">
                                    <div class="fc-danger">￥{{v.priceNew}}</div>
                                    <div style="text-decoration:line-through;margin-left:4px" >￥{{v.price}}</div>
                                </div>
                                <div class="fs-10">X1</div>
                            </div>
                        </div>
                    </div>
                    <div style="height:100px;width:28%" class="b middle center ">
                        {{v.createTime}}
                    </div>
                    <div style="height:100px;width:20%" class="b middle center column">
                        <div>{{v.total}}</div>
                    </div>
                    <div style="height:100px;;width:22%" class="b middle center column ">
                        <div>{{v.communityName}}</div>
                    </div>
                </div>
                
              
            </div>
        </div>
        <div class="mt-40 between">
            <div class="flex">
                <Button >批量备注</Button>
                <Button type="primary" class="ml-10" @click="showExport">导出分拣单</Button>
            </div>
            <Page :total="100" show-elevator />
        </div>

        <Modal v-model="exportFlag" title="线路分拣单导出" width="800px;" @on-ok="ok" @on-cancel="cancel" footer-hide>
            <div class="flex middle">
                <div>请选择时间：</div>
                <div class="flex middle">
                <Col span="12">
                            <TimePicker v-model="startTime" format="HH点mm分ss秒" placeholder="请选择开始时间" style="width: 168px"></TimePicker>
                </Col>
                <div class=" mr-10">-</div> 
                <Col span="12">
                            <TimePicker v-model="endTime" format="HH点mm分ss秒" placeholder="请选择结束时间" style="width: 168px"></TimePicker>
                </Col> 
                </div>
            </div>
            <div class="mt-20 flex">
                <div>选择线路：</div>
                <div>
                    <Checkbox v-model="single">全选</Checkbox>
                </div>
            </div>
            <div style="margin-left:60px;margin-top:35px" class="flex start wrap relative" >
                <div style="width:110px;height:44px" class=" middle b"  v-for="item in exportRouteList" :key="item">
                    <Checkbox v-model="single" class="ml-20"></Checkbox>
                    <div>{{item.routeName}}</div>
                    <Icon type="ios-arrow-down" @click="showCom(item.routeState)"/>
                    <Poptip v-model="visible" placement="bottom-end"  v-if="item.routeState == routeState" >
                        <div slot="content" >
                            <div>{{item.routeName}}  ({{item.placeList.length}})</div>
                            <div class="flex start wrap" style="width:300px">
                                <div style="width:30%;height:30px" class="middle" v-for="v in item.placeList" :key="v">
                                    <Checkbox v-model="single" ></Checkbox>
                                    <div class="mr-10">{{v.placeName}}</div>
                                </div>
                            </div>
                        </div>
                    </Poptip>
                </div>
            </div>

            <div class="center mb-20 mt-40">
                <Button>取消</Button>
                <Button type="primary" class="ml-20" @click="exportSure">一键导出</Button>
            </div>
            
        </Modal>

    </div>
</template>
<script>
export default {
  data() {
    return {
      exportFlag: false,
      visible:false,
      routeState:"",    //显示对应区域下的小区
      startTime: "",
      endTime: "",
      totalNumber: "",
      orderList: [
        {
          number: 15958075907,
          driver: "Medusa",
          route: ["洪塘-庄桥-孔浦", "十三号线"],
          shopList: [
            {
              shopNumber: 1547895632,
              shopName: "勿忘我",
              priceNew: "20",
              price: "30",
              createTime: "208-12-20 13:13:13",
              shopImg:
                "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
              total:"8",
              communityName:"三和家园"
            },
            {
              shopNumber: 1547895632,
              shopName: "勿忘我",
              priceNew: "20",
              price: "30",
              createTime: "208-12-20 13:13:13",
              shopImg:
                "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
              total:"8",
              communityName:"三和家园"
            }
          ]
        },
        {
          number: 15958075907,
          driver: "Medusa",
          route: ["洪塘-庄桥-孔浦", "十三号线"],
          shopList: [
            {
              shopNumber: 1547895632,
              shopName: "勿忘我",
              priceNew: "20",
              price: "30",
              createTime: "208-12-20 13:13:13",
              shopImg:
                "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
              total:"8",
              communityName:"三和家园"
            },
            {
              shopNumber: 1547895632,
              shopName: "勿忘我",
              priceNew: "20",
              price: "30",
              createTime: "208-12-20 13:13:13",
              shopImg:
                "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
              total:"8",
              communityName:"三和家园"
            }
          ]
        },
        {
          number: 15958075907,
          driver: "Medusa",
          route: ["洪塘-庄桥-孔浦", "十三号线"],
          shopList:[
            {
              shopNumber: 1547895632,
              shopName: "勿忘我",
              priceNew: "20",
              price: "30",
              createTime: "208-12-20 13:13:13",
              shopImg:
                "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
              total:"8",
              communityName:"三和家园"
            }
          ]
        }
      ],
      exportRouteList: [
        { routeName: "线路一",routeState:1,placeList:[
            {placeName:"A小区"},
            {placeName:"A小区"},
            {placeName:"A小区"},
          
        ]},
        { routeName: "线路六",routeState:2,placeList:[
            {placeName:"V小区"},
            {placeName:"D小区"},
        ]},
         { routeName: "线路二",routeState:3,placeList:[
            {placeName:"A小区"},
            {placeName:"A小区"},
            {placeName:"A小区"},
            {placeName:"A小区"},
            {placeName:"A小区"},
        ]},
         { routeName: "线路三",routeState:4,placeList:[
            {placeName:"A小区"},
            {placeName:"A小区"},
        ]},
         { routeName: "线路四",routeState:5,placeList:[
            {placeName:"A小区"},
            {placeName:"A小区"},
            {placeName:"B小区"},
            {placeName:"V小区"},
            {placeName:"R小区"},
        ]},
      ]
    };
  },
  mounted() {
  },
  methods: {
    showExport() {
      this.exportFlag = true;
    },
    /**
     * 确认导出
     */
    exportSure() {
      if (this.startTime == "" && this.endTime == "") {
        this.$Message.error("请选择时间");
      } else if (this.startTime == "" || this.endTime == "") {
        this.$Message.error("时间不能为空");
      }
    },
    showCom(routeState){
        this.routeState = routeState
        this.visible = true
    }
  }
};
</script>
<style lang="less">
.goods-config {
  background-color: #fff;
  padding: 15px;
  margin-top: 10px;
  .serch-type {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    font-weight: bold;
    li {
      height: 38px;
      display: flex;
      align-items: center;
      margin-right: 40px;
      cursor: pointer;
      span {
        line-height: 38px;
        display: block;
        padding: 0 5px;
      }
      &.active span {
        border-bottom: #2d8cf0 2px solid;
        color: #2d8cf0;
      }
    }
  }
}
</style>


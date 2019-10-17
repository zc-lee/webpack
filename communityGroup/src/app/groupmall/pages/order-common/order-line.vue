<template>
    <div class="goods-config">
        <div class="bc-f8" style="padding-left:65px;padding-right:16px;margin-top:16px;padding-top:20px;padding-bottom:36px">
            <div class="flex">
                <div class="middle">分拣线路:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
                <div class="middle" style="margin-left:200px">司机名称:<Input v-model="value" style="width:200px;height:30px" class="ml-10" /></div>
            </div>
            <div class="flex  mt-20">
                <div class="middle">清单生成时间:
                    <Col span="12">
                    <TimePicker confirm type="timerange" placement="bottom-end"  style="width: 300px" class="ml-10"></TimePicker>
                    </Col>
                </div>
            </div>
            <div class="mt-20" style="margin-left:80px">
                <Button type="primary" style="width:100px">搜索</Button>
            </div>
        </div>
        <div class="mt-40">
            <Button >批量备注</Button>
            <Button type="primary" class="ml-10">导出分拣单</Button>
        </div>

        <div class="flex middle " style="margin-top:15px;height:30px;background-color:#f6f8fa">
            <Checkbox  v-model="seletAll" class=" ml-10" style="width:13%"></Checkbox>
            <div style="width:30%">商品</div>
            <div style="width:30%">生成时间</div>
            <div style="width:18%">分拣线路</div>
            <div >操作</div>
        </div>

        <div class="mt-10  mb-10" v-for="item in orderList" :key="item" >
            <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                <Checkbox></Checkbox>
                <div style="margin-left:45px">订单号：{{item.number}}</div>
                <div style="margin-left:76px">司机名称: {{item.driver}}</div>
            </div>
            <div class="flex">
                <div style="height:100px;width:30%" class="middle b pl-30">
                    <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                    <div style="height:70px;" class="ml-10">
                        <div>{{item.shopName}}</div>
                        <div class="between  mt-10 w-100"> 
                            <div class="fs-10 flex">
                                <div class="fc-danger">￥{{item.priceNew}}</div>
                                <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                            </div>
                            <div class="fs-10">X1</div>
                        </div>
                    </div>
                </div>
                <div style="height:100px;width:35%" class="b middle center ">
                {{item.createTime}}
                </div>
                <div style="height:100px;width:24%" class="b middle center column">
                    <div>{{item.route[0]}}</div>
                    <div>{{item.route[1]}}</div>
                </div>
                
                <div style="height:100px;;width:11%" class="b middle center column ">
                    <Button type="primary"  @click="showDeatil"> 明细</Button>
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
            <div style="margin-left:60px;margin-top:35px" class="flex start wrap" >
                <div style="width:110px;height:44px" class=" middle b"  v-for="item in exportRouteList" :key="item">
                    <Checkbox v-model="single" class="ml-20"></Checkbox>
                    <div>{{item.routeName}}</div>
                </div>
            </div>

            <div class="center mb-20 mt-40">
                <Button>取消</Button>
                <Button type="primary" class="ml-20" @click="exportSure">一键导出</Button>
                
            </div>
            
        </Modal>

        <Modal v-model="messageFlag" title="线路分拣单详情" width="800px" @on-ok="ok" @on-cancel="cancel" >
            <div class="p-20 bb">
                <div class="fw-bold">订单信息</div>
                <div class="mt-20 flex">
                    <div class="flex">
                        <img src="https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg" alt="" class="wh-50">
                        <span class="ml-10">
                            测试商品名称
                        </span>    
                    </div>
                    <div class="flex" style="margin-left:100px">
                        分拣线路: A - B - C - D - E - F 
                    </div>
                </div>
                <div class="flex">
                    <div>生成时间：12-20-20 13:13:13</div>
                    <div style="margin-left:60px">司机：Medusa</div>
                    <div style="margin-left:100px">手机号码：15958075907</div>
                </div>
            </div>

            <div class="py-20 flex start wrap">
                <div style="width:18%" class="mb-20 ml-10" v-for="item in community" :key="item">
                    <div class="flex">
                        <div class="b center middle" style="width:70px;height:50px;background-color:#d2ecff">小区名称</div>
                        <div class="b center middle" style="width:100px;height:50px;">{{item.communityName}}</div>
                    </div>
                    <div class="flex">
                        <div class="b center middle" style="width:70px;height:50px;background-color:#d2ecff">数量</div>
                        <div class="b center middle" style="width:100px;height:50px;">{{item.communityNumber}}</div>
                    </div>
                </div>
            </div>
            <div class="flex between pr-30">
                <Button type="primary" class="ml-10">一键导出</Button>
                <div class="flex middle">
                    总数量：<div style="color:#1f87d9;" class="fw-bold fs-20">{{totalNumber}}</div> 件
                </div>
            </div>
        </Modal>


    </div>
</template>
<script>
export default {
    data(){
        return{
        messageFlag:false,
        exportFlag:false,
        startTime:'',
        endTime:'',
        totalNumber:"",
        orderList: 
            [
                {
                    number: 15958075907,
                    driver: "Medusa",
                    shopImg:
                        "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
                    shopName: "勿忘我",
                    priceNew: "20",
                    price: "30",
                    createTime:"208-12-20 13:13:13",
                    route:["洪塘-庄桥-孔浦","十三号线"]
                },
                {
                    number: 15958075907,
                    driver: "Medusa",
                    shopImg:
                        "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
                    shopName: "勿忘我",
                    priceNew: "20",
                    price: "30",
                    createTime:"208-12-20 13:13:13",
                    route:["洪塘-庄桥-孔浦","十三号线"]
                },
                {
                    number: 15958075907,
                    driver: "Medusa",
                    shopImg:
                        "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
                    shopName: "勿忘我",
                    priceNew: "20",
                    price: "30",
                    createTime:"208-12-20 13:13:13",
                    route:["洪塘-庄桥-孔浦","十三号线"]
                },
            ],
        community:
            [
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                {communityName:"丰华驿淘企业",communityNumber:"2"},
                
            ],
        exportRouteList:
            [
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
                {routeName:"线路一"},
            ]
        }
    },
    mounted(){
        this.totalNumber = this.community.length
    },
    methods:{
        showDeatil(){
            this.messageFlag = true
        },
        showExport(){
            this.exportFlag = true
        },
        /**
         * 确认导出
         */
        exportSure(){
            if(this.startTime == '' && this.endTime == ''){
                this.$Message.error('请选择时间');
            }else if(this.startTime == ''|| this.endTime == ''){
                this.$Message.error('时间不能为空');
            }
        }
    }
}
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


<template>
    <div>
        <div class="goods-config" style=" padding: 15px;">
            <div class="bc-f8" style="padding-left:65px;padding-right:16px;margin-top:16px;padding-top:20px;padding-bottom:36px">
                <div class="flex">
                    <div class="middle">交易订单:<Input v-model="value" placeholder="输入订单号" style="width:200px;height:30px" class="ml-10" /></div>
                    <div class="middle" style="margin-left:160px">团长名称:<Input v-model="value" placeholder="团长名称" style="width:200px;height:30px" class="ml-10" /></div>
                </div>
                <div class="flex mt-20">
                    <div class="flex middle">
                        <div>提交时间：</div>
                        <div class="flex middle">
                            <Col span="12">
                                <TimePicker v-model="serachStartTime" placeholder="开始日期" format="HH点mm分ss秒" style="width: 150px"></TimePicker>
                            </Col>
                            <div class=" mr-10">-</div> 
                            <Col span="12">
                                <TimePicker v-model="serachEndTime" placeholder="结束日期" format="HH点mm分ss秒"  style="width: 150px"></TimePicker>
                            </Col> 
                        </div>
                    </div>
                    <div class="flex middle" style="margin-left:45px">
                        <div>到账时间：</div>
                        <div class="flex middle">
                            <Col span="12">
                                <TimePicker v-model="serachStartTime" placeholder="开始日期" format="HH点mm分ss秒" style="width: 150px"></TimePicker>
                            </Col>
                            <div class=" mr-10">-</div> 
                            <Col span="12">
                                <TimePicker v-model="serachEndTime" placeholder="开始日期" format="HH点mm分ss秒"  style="width: 150px"></TimePicker>
                            </Col> 
                        </div>
                    </div>
                </div>
                <div class="mt-20" style="margin-left:80px">
                    <Button type="primary" style="width:100px">搜索</Button>
                </div>
            </div>
        </div>
        <div class="flex  goods-config bb pl-20" >
            <ul class="serch-type" v-for="item in signList" :key ="item" >
                <li @click="selectType(item.type)"  :class="{'active':item.type==sign}"><span>{{item.signType}}</span></li>
            </ul>
        </div>

        <div class="bc-white px-20 pt-40">
            <div class="flex between bottom">
                <div>
                    <Button type="primary" class="mr-20" v-if="sign!=2">一键导出</Button>
                    <Button >批量备注</Button> 
                </div>
                <div > 提现记录共 500 条</div>
            </div>
            <div v-if="sign==0">
                <div class="flex middle mt-20 " style="height:30px;background-color:#f6f8fa" >
                    <Checkbox  v-model="seletAll" class="ml-10" style="width:3%"></Checkbox>
                    <div style="width:15%">团长名称</div>
                    <div style="width:17%">手机号码</div>
                    <div style="width:15%">提交时间</div>
                    <div style="width:16%" >提现方式</div>
                    <div style="width:13%" >金额</div>
                    <div style="width:11%">状态</div>
                    <div style="width:8%">操作</div>
                </div>
                <div class="mt-10 mb-20" v-for="item in takeOutList" :key="item" >
                    <div class="middle flex h-40 px-10 " style="background-color:#ebf6ff">
                        <Checkbox></Checkbox>
                        <div style="margin-left:45px">交易订单：{{item.identifier}}</div>
                        <Icon type="ios-bookmark" style="margin-left:670px"/>
                    </div>
                    <div class="flex ">
                        <div style="height:100px;width:14%" class="b middle center ">
                            {{item.leaderName}}
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            {{item.leaderNumber}}
                        </div>
                        <div style="height:100px;width:16%" class="b middle center ">
                            {{item.subTime}}
                        </div>
                        <div style="height:100px;width:15%" class="b middle center ">
                            {{item.takeType}}
                        </div>
                        <div style="height:100px;width:13%" class="b middle center fc-danger">
                            ￥{{item.takePrice}}
                        </div>
                        <div style="height:100px;width:12%" class="b middle center ">
                                待审核
                        </div>
                        <div style="height:100px;width:12%" class="b middle center ">
                            <Button size="small" type="primary">结算</Button>
                            <Button size="small" class="ml-10" style="background-color:#fdebeb;color:red"> 拒绝</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="sign==1">
                <div class="flex middle mt-20 " style="height:30px;background-color:#f6f8fa" >
                    <Checkbox  v-model="seletAll" class="ml-10" style="width:3%"></Checkbox>
                    <div style="width:14%">团长名称</div>
                    <div style="width:18%">手机号码</div>
                    <div style="width:16%">提交时间</div>
                    <div style="width:13%">到账时间</div>
                    <div style="width:14%" >提现方式</div>
                    <div style="width:12%" >金额</div>
                    <div style="width:3%">状态</div>
                </div>
                <div class="mt-10 mb-20" v-for="item in takeOutList" :key="item" >
                    <div class="middle flex h-40 px-10 " style="background-color:#ebf6ff">
                        <Checkbox></Checkbox>
                        <div style="margin-left:45px">交易订单：{{item.identifier}}</div>
                        <Icon type="ios-bookmark" style="margin-left:670px"/>
                    </div>
                    <div class="flex ">
                        <div style="height:100px;width:14%" class="b middle center ">
                            {{item.leaderName}}
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            {{item.leaderNumber}}
                        </div>
                        <div style="height:100px;width:16%" class="b middle center ">
                            {{item.subTime}}
                        </div>
                        <div style="height:100px;width:15%" class="b middle center ">
                            {{item.getTime}}
                        </div>
                        <div style="height:100px;width:13%" class="b middle center fc-danger">
                            {{item.takeType}}
                        </div>
                        <div style="height:100px;width:12%" class="b middle center ">
                                ￥{{item.takePrice}}
                        </div>
                        <div style="height:100px;width:12%" class="b middle center ">
                            已到账
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="sign==2">
                <div class="flex middle mt-20 " style="height:30px;background-color:#f6f8fa" >
                    <Checkbox  v-model="seletAll" class="ml-10" style="width:3%"></Checkbox>
                    <div style="width:15%">团长名称</div>
                    <div style="width:20%">手机号码</div>
                    <div style="width:20%">提交时间</div>
                    <div style="width:18%" >提现方式</div>
                    <div style="width:14%" >金额</div>
                    <div style="width:5%">状态</div>
                </div>
                <div class="mt-10 mb-20" v-for="item in takeOutList" :key="item" >
                    <div class="middle flex h-40 px-10 " style="background-color:#ebf6ff">
                        <Checkbox></Checkbox>
                        <div style="margin-left:45px">交易订单：{{item.identifier}}</div>
                        <Icon type="ios-bookmark" style="margin-left:670px"/>
                    </div>
                    <div class="flex ">
                        <div style="height:100px;width:14%" class="b middle center ">
                            {{item.leaderName}}
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            {{item.leaderNumber}}
                        </div>
                        <div style="height:100px;width:20%" class="b middle center ">
                            {{item.subTime}}
                        </div>
                        <div style="height:100px;width:20%" class="b middle center fc-danger">
                            {{item.takeType}}
                        </div>
                        <div style="height:100px;width:15%" class="b middle center ">
                                ￥{{item.takePrice}}
                        </div>
                        <div style="height:100px;width:13%" class="b middle center ">
                            已关闭
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="flex between bottom pb-40" style="margin-top:60px">
                <div>
                    <Button type="primary" class="mr-20" v-if="sign!=2">一键导出</Button>
                    <Button >批量备注</Button> 
                </div>
                <Page :total="100" show-elevator />
            </div>
        </div>


    </div>
</template>
<script>
export default {
  data() {
    return {
      sign: 0, //默认顶部导航
      signList: [
        { signType: "待审核", type: 0 },
        { signType: "已到账", type: 1 },
        { signType: "已关闭", type: 2 }
      ],
      takeOutList: [
        {
          identifier: 15487986468,
          leaderName: "Medusa",
          leaderNumber: "15598785458",
          subTime: "2018-12-21 12:12:12 ",
          getTime:"2018-12-21 12:12:12 ",
          takeType: "线下核销",
          takePrice: "500.00"
        },
        {
          identifier: 15487986468,
          leaderName: "Medusa",
          leaderNumber: "15598785458",
          subTime: "2018-12-21 12:12:12 ",
          getTime:"2018-12-21 12:12:12 ",
          takeType: "微信转账",
          takePrice: "500.00"
        }
      ]
    };
  },
  methods: {
    selectType(type) {
      this.sign = type;
      console.log(this.sign);
    }
  }
};
</script>
<style lang="less">
.goods-config {
  background-color: #fff;
  margin-top: 10px;
  .serch-type {
    display: flex;
    height: 40px;
    // border-bottom: 1px solid #eee;
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


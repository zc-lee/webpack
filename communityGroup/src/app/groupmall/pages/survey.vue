<template>
    <div class="demo-split">
        <div class="flex mt-10">
            <div style="width:700px;height:420px" class="bc-fff p-20">
                <div style="border:1.5px solid #d8dce5" class="p-20">
                    <div class="fw-bold">今日交易额</div>
                    <div class="fs-30 fw-bold ">{{tTurnover}}</div>
                    <div class="fc-b2 " style="martin-top:10px">昨日交易额: {{yTurnover}}</div>
                </div>
            </div>
            <div style="width:400px;height:420px" class="bc-fff ml-10 p-20">
                <div class="flex between bb" style="height:24px">
                    <div class="fw-bold flex"> 
                        <div style="width:4px;height:20px;background-color:#ff9f4b" class="mr-10"></div>
                        实时概况
                    </div>
                    <!-- <div class="flex">
                        <div class="fs-10  middle bottom" style="color:#6671e4" @click="changeCurrent" >
                            今日
                        </div> 
                        <div class="fs-10 ml-20 middle bottom" style="color:#6671e4">昨日</div> 
                        <div class="fs-10 ml-20 middle bottom" style="color:#6671e4">最近7天</div> 
                    </div> -->
                    <Tabs size="small" @on-click="bindDay">
                        <TabPane label="今日" >今日</TabPane>
                        <TabPane label="昨日">昨日</TabPane>
                        <TabPane label="最近7天">最近7天</TabPane>
                    </Tabs>
                </div>
                <div class="p-20">
                    <div class="flex between mt-40">
                        <div>
                            <div style="color:#f1a864" class="fs-30 fw-bold">{{userCount}}</div>
                            今日访客量: {{userCount}}
                        </div>
                        <div>
                            <div style="color:#5ad286" class="fs-30 fw-bold">{{browseCount}}</div>
                            今日浏览量: {{browseCount}}
                        </div>
                    </div>
                    <div class="flex between mt-80">
                        <div>
                            <div style="color:#58b8fa" class="fs-30 fw-bold">{{tradeCount}}</div>
                            今日交易量: {{tradeCount}}
                        </div>
                        <div>
                            <div style="color:#f98484" class="fs-30 fw-bold">{{tradePrice}}</div>
                            今日交易额: {{tradePrice}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 顶部 -->
        <div class="bc-white mt-10 flex around middle" style="height:150px">
            <div v-for="item in orderList" :key="item" class="middle bc-f4 column center" style="width:240px;height:110px">
                <div class="fs-40">{{item.orderNumber}}</div>
                {{item.orderType}} 
            </div>  
        </div>
        <!-- 订单类型 -->
        <div class="bc-white mt-10 p-20">
            <div class="fw-bold flex"> 
            <div style="width:4px;height:20px;background-color:#ff9f4b" class="mr-10"></div>
                 快速入口
            </div>
            <div class="flex around pt-20 ">
                <div style="width:340px;height:160px;background-color:#f85959" class="middle center relative">
                    <div class=" absolute" style="top:60px;left:150px">
                        <img src="https://www.superprism.cn/imgcomm/baseMall/pc/YX-coupon.png" alt="" >
                    </div>
                    <div style="margin-top:50px" class="fc-white">发布商品</div>
                </div>
                <div style="width:340px;height:160px;background-color:#fec64d" class="middle center relative">
                    <div class=" absolute" style="top:60px;left:150px">
                        <img src="https://www.superprism.cn/imgcomm/baseMall/pc/YX-coupon.png" alt="" >
                    </div>
                    <div style="margin-top:50px" class="fc-white">发布商品</div>
                </div>
                <div style="width:340px;height:160px;background-color:#22a7fe" class="middle center relative">
                    <div class=" absolute" style="top:60px;left:150px">
                        <img src="https://www.superprism.cn/imgcomm/baseMall/pc/YX-coupon.png" alt="" >
                    </div>
                    <div style="margin-top:50px" class="fc-white">发布商品</div>
                </div>
            </div>
        </div>
        <!-- 快速入口 -->
        <div class="relative flex between" style="margin-top:100px" >
                <div style="width:160px;height:160px;background-color:#ed8e20;top:-80px;left:100px" class="radius-all absolute ">
                    <div style="width:140px;height:140px;background-color:white;top:10px;left:10px" class="radius-all absolute middle center">
                        <div>
                            <div class="fs-30 center" style="color:#ed8e20">0</div>
                            <div class="mt-10">团长销售量</div>
                        </div> 
                    </div>
                </div>
                <div style="width:160px;height:160px;background-color:#04c65d;top:-80px;left:480px" class="radius-all  absolute ">
                    <div style="width:140px;height:140px;background-color:white;top:10px;left:10px" class="radius-all absolute middle center">
                        <div>
                            <div class="fs-30 center" style="color:#04c65d">0</div>
                            <div class="mt-10">商品销售额</div>
                        </div> 
                    </div>
                </div>
                <div style="width:160px;height:160px;background-color:#6671e4;top:-80px;left:850px" class="radius-all  absolute ">
                    <div style="width:140px;height:140px;background-color:white;top:10px;left:10px" class="radius-all absolute middle center">
                        <div>
                            <div class="fs-30 center" style="color:#6671e4">0</div>
                            <div class="mt-10">会员消费额</div>
                        </div> 
                    </div>
                </div>
            <div style="width:360px;padding-top:90px" class="px-60 mt-20 bc-white pb-40">
                <div class="between">
                    <div>销售榜单
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>团长名称
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>销售数量
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:360px;padding-top:90px" class="px-60 mt-20 bc-white pb-40">
                <div class="between">
                    <div>销售榜单
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>团长名称
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>销售数量
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:360px;padding-top:90px" class="px-60 mt-20 bc-white pb-40 ">
                <div class="between">
                    <div>销售榜单
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>团长名称
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                    <div>销售数量
                        <div v-for="item in saleSort" :key="item" class="center mt-10">
                            {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    </div>
</template>
<script>
export default {
  data() {
    return {
      tTurnover: 0, //今日交易额
      yTurnover: 0, //昨日交易额
      userCount: 0, //访客量
      browseCount: 0, //浏览量
      tradeCount: 0, //交易量
      tradePrice: 0, //交易额
      orderList: [
        { orderType: "待发货订单", orderNumber: 0 },
        { orderType: "待付款订单", orderNumber: 0 },
        { orderType: "待取货订单", orderNumber: 0 },
        { orderType: "成功订单", orderNumber: 0 }
      ], //订单累类型
      saleSort: [
        { title: "1" },
        { title: "2" },
        { title: "3" },
        { title: "4" },
        { title: "5" }
      ] //团长销售量
    };
  },
  methods: {
    changeCurrent() {
      console.log(":lalla");
    },
    bindDay(e){
        console.log(e)
    }
  }
};
</script>
<style lang="less">
.bottom {
  border-bottom: 1px solid #6671e4;
}

.publicModel {
  .list-line {
    padding: 0 30px;
    .line-item {
      display: flex;
      margin-bottom: 15px;
      align-items: flex-start;
      .lefts {
        width: 80px;
        text-align: right;
        line-height: 30px;
      }

      .rights {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .ivu-select {
          width: 33%;
        }
        .ivu-input-type {
          textarea {
            height: 80px;
          }
        }
      }
    }
  }
}
.business-scope {
  background-color: #fff;
  padding: 15px;
  margin-top: 10px;
  .serch {
    padding: 20px;
    background-color: #f8f8f8;
    table {
      width: 100%;
    }
    td {
      padding: 5px;
      button {
        margin-left: 72px;
      }
    }
  }

  .serch-type {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
    li {
      height: 38px;
      display: flex;
      align-items: center;
      margin-right: 40px;
      cursor: pointer;
      &.active span {
        line-height: 38px;
        display: block;
        border-bottom: #2d8cf0 2px solid;
        padding: 0 5px;
        color: #2d8cf0;
      }
    }
  }

  .btn-line {
    padding: 10px 0;
  }

  .data-list {
    min-height: 500px;
    .list-head,
    .list-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f6f8fa;
      border-bottom: 1px solid #f2f2f2;
      .list-btn {
        text-align: center;
        button {
          margin-right: 5px;
        }
      }
      .flex1 {
        flex: 1;
        padding-right: 20px !important;
        span {
          float: left;
        }
      }
      .list-check {
        width: 30px;
        padding-left: 10px;
      }
      .list-cell {
        padding: 10px 10px;
        width: 15%;
        text-align: center;
      }
    }
    .list-item {
      background-color: #fff;
      .list-check {
        width: 100%;
        padding: 5px;
        padding-left: 10px;
        background-color: #e9f3fb;
        margin-top: 10px;
        display: flex;
        .check-item {
          margin-left: 15px;
          color: #888;
        }
      }
      .list-line {
        background-color: #fff;
        border-left: 1px solid #e9f3fb;
        border-right: #e9f3fb 1px solid;
        min-height: 100px;
        .list-cell {
          // min-height: 80px;
          // height: 100%;
          word-wrap: break-word;
          word-break: break-all;
          // border-right: #e9f3fb 1px solid;
          .ivu-select-dropdown {
            width: 60px !important;
            .ivu-dropdown-menu {
              min-width: auto !important;
              li {
                cursor: pointer;
                line-height: 23px;
                &:hover {
                  color: #2d8cf0;
                }
              }
            }
          }
        }
      }
    }
  }

  .pages {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    .page-btn {
      flex: 1;
      button {
        margin-right: 10px;
      }
    }
  }
}
</style>


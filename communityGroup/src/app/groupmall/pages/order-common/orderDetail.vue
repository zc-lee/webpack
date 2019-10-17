<template>
    <div class="goods-config">
        <div class="flex" >
            <ul class="serch-type" v-for="item in signList" :key ="item" >
                <li @click="selectType(item.type)"  :class="{'active':item.type==sign}"><span>{{item.signType}}</span></li>
            </ul>
        </div>
        <Button class="mt-10 ml-10" v-if="sign==1">批量关闭</Button>
        <Button class="mt-10 ml-10" v-if="sign==2">批量发货</Button>
        <Button class="mt-10 ml-10" v-if="sign==4">批量导出</Button>
        <Button class="mt-10 ml-10" v-if="sign==6">批量删除</Button>
        <Button class="mt-10 ml-10">批量备注</Button>

        <div class="flex middle " style="margin-top:15px;height:30px;background-color:#f6f8fa">
            <Checkbox  v-model="seletAll" class="wp-10 ml-10"></Checkbox>
            <div class="wp-20">商品</div>
            <div class="wp-20">客户</div>
            <div class="wp-20">取货地点</div>
            <div class="wp-10">成交额</div>
            <div class="wp-10" v-if="sign!=5">订单状态</div>
            <div class="wp-10" v-else>评价内容</div>
            
            <div >操作</div>
        </div>
        <div v-if="sign==0">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item" >
                <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                </div>
                <div class="flex">
                    <div style="height:100px;width:24%" class="middle b pl-10">
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
                    <div style="height:100px;width:18%" class="b middle center ">
                        <div class="middle">
                            <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                            {{item.userName}}
                        </div>
                    </div>
                    <div style="height:100px;width:24%" class="b middle center column">
                        <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                        <div>{{item.leaderAdd}}</div>
                    </div>
                    <div style="height:100px;width:12%" class="b  middle center ">
                        ￥ {{item.dealPrice}}
                    </div>
                    <div style="height:100px;width:11%" class="b middle center ">
                        <div v-if="item.state ==1 && item.comment==''" >
                            交易成功
                        </div>
                        <div v-if="item.state ==2" class="fc-danger">
                            待付款
                        </div>
                        <div v-if="item.state ==3" class="middle center column">
                            <div>已付款</div>
                        <Button type="primary">发货</Button>
                        </div>
                        <div v-if="item.state ==4">
                            <div class="column middle center">
                                <div>付款成功</div>
                                <div class="fc-danger" styke="margin-top:4px">等待客户收货</div>
                            </div>
                        </div>
                        <div v-if="item.state ==1 && item.comment!=''">
                            <Tooltip :content="item.comment"  theme="light">
                                <div>已评价</div>
                            </Tooltip>
                        </div>
                        <div v-if="item.state >4">
                            关闭订单
                        </div>
                    </div>
                    <div style="height:100px;;width:11%" class="b middle  column ">
                        <Icon type="ios-bookmark" style="margin-top:30px"/>
                        <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                        <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 全部订单 -->

        <div v-if="sign==1">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state ==2">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div class="fc-danger">
                                待付款
                            </div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 待付款 -->

        <div v-if="sign==2">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state ==3">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div class="column middle center">
                                <div>已付款</div>
                                <Button type="primary">发货</Button>
                            </div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 已付款 -->

        <div v-if="sign==3">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state ==4">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div class="column middle center">
                                <div>付款成功</div>
                                <div class="fc-danger" styke="margin-top:4px">等待客户收货</div>
                            </div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 等待客户收货 -->

        <div v-if="sign==4">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state ==1">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div>交易完成</div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 交易完成订单 -->

        <div v-if="sign==5">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state ==1 && item.comment!=''">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">评价得分：<Rate disabled v-model="score" /></div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div>{{item.comment}}</div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 评价订单 -->

        <div v-if="sign==6">
            <div class="mt-10  mb-10" v-for="item in orderList" :key="item">
                <div  v-if="item.state >4">
                    <div class="middle flex h-40 px-10" style="background-color:#ebf6ff">
                    <Checkbox></Checkbox>
                    <div style="margin-left:45px">订单号：{{item.number}}</div>
                    <div style="margin-left:76px">创建时间：{{item.createTime}}</div>
                    <div style="margin-left:50px">分拣线路：{{item.route[0]}} {{item.route[1]}}</div>
                    </div>
                    <div class="flex">
                        <div style="height:100px;width:24%" class="middle b pl-10">
                            <img :src="item.shopImg" alt="" style="width:70px;height:70px" class="">
                            <div style="height:70px;" class="ml-10">
                                <div>{{item.shopName}}</div>
                                <div class="between  mt-10  w-100"> 
                                    <div class="fs-10 flex">
                                        <div class="fc-danger">￥{{item.priceNew}}</div>
                                        <div style="text-decoration:line-through;margin-left:4px" >￥{{item.price}}</div>
                                    </div>
                                    <div class="fs-10">X1</div>
                                </div> 
                            </div>
                        </div>
                        <div style="height:100px;width:18%" class="b middle center ">
                            <div class="middle">
                                <img :src="item.userImg" alt="" style="width:40px;height:40px" class="radius-all mr-40">
                                {{item.userName}}
                            </div>
                        </div>
                        <div style="height:100px;width:24%" class="b middle center column">
                            <div>{{item.leaderName}} , {{item.leaderPhone}}</div>
                            <div>{{item.leaderAdd}}</div>
                        </div>
                        <div style="height:100px;width:12%" class="b  middle center ">
                            ￥ {{item.dealPrice}}
                        </div>
                        <div style="height:100px;width:11%" class="b middle center ">
                            <div>交易关闭</div>
                        </div>
                        <div style="height:100px;;width:11%" class="b middle  column ">
                            <Icon type="ios-bookmark" style="margin-top:30px"/>
                            <Button type="text" style="margin-top:2px" @click="showDeatil(item.state,item.comment)"> 查看详情</Button>
                            <Button type="text" class="fc-danger" v-if="item.state ==2">关闭订单</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex middle between mt-20 mb-20">
            <div>
                <Button class="mt-10 ml-10" v-if="sign==1">批量关闭</Button>
                <Button class="mt-10 ml-10" v-if="sign==2">批量发货</Button>
                <Button class="mt-10 ml-10" v-if="sign==4">批量导出</Button>
                <Button class="mt-10 ml-10" v-if="sign==6">批量删除</Button>
                <Button class="mt-10 ml-10">批量备注</Button>
            </div>
            <Page :total="100" show-elevator />
        </div>

        <!-- <orderMessage ref="orderMessage" v-bind:messageFlag="messageFlag" v-bind:orderState="orderState" v-bind:comment="comment"></orderMessage> -->
        <Modal v-model="messageFlag" title="订单信息" width="800px" class="type" @on-ok="ok" @on-cancel="cancel" >
            <div class="px-20 py-30">
                <div style="width:730px;height:120px;background-color:#f2faff;font-size:14px;border:1px solid #7ac7ff;" class="pt-20 pl-30  fw-bold" >
                    <div class="flex">
                        <div >当前订单状态:</div>
                        <div style="margin-left:10px" v-if="orderState==2">待付款</div>
                        <div style="margin-left:10px" v-if="orderState==3">待发货</div>
                        <div style="margin-left:10px" v-if="orderState==4">待收货</div>
                        <div style="margin-left:10px" v-if="orderState==5">交易关闭</div>
                        <div style="margin-left:10px" v-if="orderState==1 && comment==''">交易成功</div>
                        <div style="margin-left:10px" v-if="orderState==1 && comment!=''">已评价</div>
                    </div>
                    <div style="width:640px" class="b bc-white mt-20 p-10 middle">
                        <Icon type="md-bookmark"/>
                        <div style="font-size:12px;margin-left:4px">{{message}}</div>
                    </div>
                </div>
            </div>

            <div class="fc-01 px-20">
                <div class="fw-bold">买家信息</div>
                <div class="between py-10">
                    <div class="">微信昵称：。</div>
                    <div class="">买家姓名：张三</div>
                    <div class="">买家手机号：15958075907</div>
                </div>
                <div class="">收货地址：长兴路158号</div>
            </div>

            <div class="fc-01 bt mt-20 px-20 bb">
                <div class="pt-20 fw-bold">订单信息</div>
                <div class="start wrap py-10">
                    <div class="mt-10" style="width:240px">订单编号：19874562148</div>
                    <div class="mt-10" style="width:240px">团长：Medusa</div>
                    <div class="mt-10" style="width:240px">创建时间：2018-12-20</div>
                    <div class="mt-10" style="width:240px">取货地点：长兴路158号</div>
                    <div class="mt-10" style="width:240px" v-if="orderState!=2 && orderState!=5">支付方式：微信支付</div>
                    <div class="mt-10" style="width:240px" v-if="orderState!=2 && orderState!=5">付款时间：2018-12-20</div>
                    <div class="mt-10" style="width:240px" v-if="orderState==5">关闭时间：2018-12-20</div>
                    <div class="mt-10" style="width:240px" v-if="orderState==1 ">收货时间：2018-12-20</div>
                </div>
            </div>
            <div class="flex middle px-20" style="margin-top:15px;height:30px;background-color:#d2ecff">
                <div class="wp-30" style="margin-left:60px">商品名称</div>
                <div class="wp-30">单价&数量</div>
                <div class="wp-30">总价</div>
                <div class="wp-10">实收款</div>
            </div>
            <div class="flex">
                <div style="height:100px;width:30%" class="middle b pl-10">
                    <img src="https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg" alt="" style="width:80px;height:80px" class="">
                    <div class="ml-20">测试商品名</div>
                </div>
                <div style="height:100px;width:20%" class="pl-40 center b pl-10 column">
                    <div class="flex">
                        单价：
                        <div>￥20.00</div>
                    </div>
                    <div class="flex">
                        数量：
                        <div>200</div>
                    </div>
                </div>
                <div style="height:100px;width:30%;padding-left:90px" class="middle b">
                    ￥200
                </div>
                <div style="height:100px;width:20%;padding-left:60px" class="middle b">
                    ￥200.00
                </div>
            </div>
            <div class="end mt-40 mr-20 middle">
                <div v-if="orderState==2 || orderState==5">待收款：</div>
                <div v-else>实收款：</div>
                <div class="fw-bold" style="font-size:18px;color:#56a5e2">￥200.00</div>
            </div>
        
        </Modal>
       

    </div>
</template>
<script>
import orderMessage from '../order-common/orderMessage.vue'
export default {
  data() {
    return {
        sign:0,             //默认顶部导航
        score: 2,           //评分星数
        messageFlag:false,
        comment:"",         //评论
        orderState:'',
      signList: [
        { signType: "全部订单", type: 0 },
        { signType: "待付款", type: 1 },
        { signType: "待发货", type: 2 },
        { signType: "待收货", type: 3 },
        { signType: "成功订单", type: 4 },
        { signType: "已评价", type: 5 },
        { signType: "关闭订单", type: 6 }
      ],
      orderList: [
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 1,
          comment: ""
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 2,
          comment: ""
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 3,
          comment: ""
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 4,
          comment: ""
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 1,
          comment: ""
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 1,
          comment: "迷你号"
        },
        {
          number: 15958075907,
          createTime: "2018-12-19",
          route: ["一号线", "洪塘-长兴路"],
          shopImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          shopName: "勿忘我",
          shopSpecifications: ["白色", "干花", "带花瓶"],
          priceNew: "20",
          price: "30",
          userImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          userName: "。",
          leaderName: "小花",
          leaderPhone: "15588887777",
          leaderAdd: "长兴路158号",
          dealPrice: "88",
          state: 5,
          comment: ""
        }
      ]
    };
  },
  components:{
      orderMessage,
  },
  mounted() {
    
  },
  methods: {
      selectType(type){
          this.sign = type
      },
      showDeatil(state,comment){
          this.comment = comment
        //   this.messageFlag  =! this.messageFlag
          this.messageFlag = true
          this.orderState = state
          
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


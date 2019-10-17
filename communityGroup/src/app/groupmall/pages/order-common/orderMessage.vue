<template>
    <div>
        <Modal v-model="messageFlag" title="订单信息" width="800px" class="type" @on-ok="ok" @on-cancel="cancel" :mask-closable="false">
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
export default {
    data(){
        return{
            message:"这是备注信息"
        }
    },
    mounted(){
    },
    props:{
        messageFlag:{
            type:Boolean,
            required:true
        },
        orderState:{
            true:String,
            required:true
        },
        comment:{
            true:String,
            required:true
        }
    },
    methods:{
        ok(){
            this.messageFlag = false
            console.log(this.messageFlag)
        }
    }
}
</script>


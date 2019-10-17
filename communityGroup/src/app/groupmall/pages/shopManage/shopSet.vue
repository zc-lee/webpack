<template>
    <div class="bc-white" :style="{height:curHeight +'px'}">
        <div style="padding-left:110px;padding-top:30px">
            <Form   ref="shopValidate" :model="shopValidate" :rules="ruleValidate">
                    <div class="flex">
                        <p class="fw-bold">转发提示语</p> 
                        <Input  placeholder="最多25个字符" style="width: 300px;margin-left:30px"/>
                    </div>
                    <FormItem label="活动提醒"  prop="tips" class="mt-20 fw-bold">
                        <div class="flex">
                            <Input v-model="shopValidate.tips" placeholder="请选择时间" style="width: 200px;margin-left:22px"/>
                            <div class="fs-10 fc-danger ml-10" >(此处设置活动时间提醒)</div>
                        </div>
                    </FormItem>

                    <FormItem label="加盟热线"  prop="phone" class="mt-20 fw-bold">
                        <Input v-model="shopValidate.phone" placeholder="最多25个字符" style="width: 300px;margin-left:22px"/>
                    </FormItem>

                    <div class="flex middle">
                        <p class="fw-bold">提现金额</p> 
                        <Input  placeholder="" style="width: 180px;margin-left:44px"/>
                        <div class="wh-30 b center middle bc-eef1f6" >元</div>
                    </div>
                    <div class="fs-10 fc-danger mt-10" style="margin-left:90px;width: 200px">此处为团长提现金额，最大限额每单2万元，最小限额50元可提现</div>
                    
                    <FormItem label="底部打标" prop="bMarkingRadio" class="mt-20 fw-bold middle">
                        <RadioGroup v-model="shopValidate.bMarkingRadio" style="margin-left:20px">
                            <Radio label="bOn">启动</Radio>
                            <Radio label="bClose">关闭</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="订单弹幕" prop="orderBarrage" class="mt-20 fw-bold middle">
                        <RadioGroup v-model="shopValidate.orderBarrage" style="margin-left:20px" class="flex">
                            <Radio label="BarrageOn">启动</Radio>
                            <Radio label="BarrageClose">关闭</Radio>
                            <div class="fs-10 fc-b2">(活动下单弹幕提醒用户有新订单)</div>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="企业支付" prop="payment" class="mt-20 fw-bold middle">
                        <RadioGroup v-model="shopValidate.payment" style="margin-left:20px">
                            <Radio label="POn">启动</Radio>
                            <Radio label="PClose">关闭</Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem label="团长申请条款/协议"  prop="edit" class="mt-20 fw-bold ">
                        <div class="flex middle" @click="editClause">
                            <Icon type="ios-create-outline" class="fc-danger"/>
                            <Button type="text" class="fc-danger" style="margin-left: -16px;">编辑</Button>
                        </div>
                    </FormItem>
                    <Modal v-model="editFlag" title="团长申请条款/协议"  @on-ok="ok" @on-cancel="cancel">
                        <FormItem label="文章内容"  prop="textContent" class="mt-20 fw-bold">
                            <wangeditor  :text="abouts" ref="wangeditor" class="mt-20"></wangeditor>
                        </FormItem>
                    </Modal>
            </Form >

            <Button type="primary">确认</Button>
            
        </div>
    </div>
</template>
<script>
import wangeditor from "../../component/wangeditor.vue";

export default {
  data() {
    return {
      editFlag: false,
      curHeight: document.documentElement.clientHeight,
      shopValidate: {
        tips: "",
        phone: "",
        bMarkingRadio: "bOn",
        orderBarrage: "BarrageOn",
        payment: "POn",
        edit: "",
        textContent: ""
      },
      ruleValidate: {
        tips: [{ required: true, message: "请输入活动提醒", trigger: "blur" }],
        phone: [
          { required: true, message: "加盟热线不能为空", trigger: "blur" }
        ],
        bMarkingRadio: [{ required: true, trigger: "blur" }],
        orderBarrage: [{ required: true, trigger: "blur" }],
        payment: [{ required: true, trigger: "blur" }],
        edit: [{ required: true, trigger: "blur" }],
        textContent: [
          { required: true, message: "团长条款不能为空", trigger: "blur" }
        ]
      },
      bmarking: "bon"
    };
  },
  components: {
    wangeditor
  },
  methods: {
    editClause() {
      console.log("编辑条款");
      console.log(this.curHeight);
      this.editFlag = true;
    }
  }
};
</script>


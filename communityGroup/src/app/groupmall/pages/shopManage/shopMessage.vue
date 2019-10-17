<template>
    <div class="bc-white" :style="{height:curHeight +'px'}">
        <div style="padding-left:40px;padding-top:30px;padding-right:40px">
            <Button type="primary" @click="editMessage">编辑店铺信息</Button>
            <Form   ref="shopName" :model="shopName" :rules="ruleShopName">
                <FormItem label="店铺名称"  prop="editName" class="mt-20 fw-bold">
                    <div v-if="editFlag && shopName.editName ==''">暂无</div>
                    <div v-else-if="editFlag && shopName.editName!=''">{{shopName.editName}}</div>
                    <Input v-else v-model="shopName.editName"  placeholder="最多25个字符" style="width: 300px;margin-left:30px"/>
                </FormItem>
                <FormItem label="店铺电话"  prop="phone" class="mt-20 fw-bold">
                    <div v-if="editFlag && shopName.phone ==''">暂无</div>
                    <div v-else-if=" editFlag && shopName.phone!=''">{{shopName.phone}}</div>
                    <Input v-else v-model="shopName.phone"  placeholder="最多25个字符" style="width: 300px;margin-left:30px"/>
                </FormItem>
                <FormItem label="店铺地址"  prop="add" class="mt-20 fw-bold">
                    <div v-if="editFlag && shopName.add ==''">暂无</div>
                    <div v-else-if=" editFlag && shopName.add!=''">{{shopName.add}}</div>
                    <div v-else >
                        <div>
                            <Select v-model="model2"  style="width:150px;margin-left:30px" >
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="model3"  style="width:150px;margin-left:10px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="model4"  style="width:150px;margin-left:10px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="flex mt-20">
                            <Input  v-model="shopName.add"  placeholder="请输入详细地址" style="width: 300px;margin-left:100px"/>
                            <Button class="ml-10">搜索</Button>
                        </div>
                        <div style="width:80%;height:260px;position:relative" >
                        <GDMap @getlabel="getLocation" ></GDMap>
                        </div>
                    </div>
                    
                </FormItem>

                <FormItem label="营业时间"  prop="time" class="mt-20 fw-bold">
                    <div v-if="editFlag">暂无</div>
                    <Col v-else span="12" style="margin-left:30px">
                        <TimePicker format="HH:mm" type="timerange" placement="bottom-end" placeholder="请选择时间" style="width: 168px" @on-open-change="changeTime"></TimePicker>
                    </Col>
                </FormItem>
            </Form>

            <div class="flex center" v-if="editFlag == false">
                <Button @click="cancelEdit">取消</Button>
                <Button type="primary" class="ml-20">发布</Button>
            </div>
        </div>
    </div>
</template>

<script>
import GDMap from "../../component/map.vue";
export default {
  data() {
    return {
      curHeight: document.documentElement.clientHeight,
      editFlag: true,
      shopName: {
        editName: "点即科技",
        phone: "18058505737",
        add: "浙江省宁波市长兴路158号",
        time:"07:00-18:00"
      },
      ruleShopName: {
        editName: [{ required: true, message: "请输入店铺名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入店铺号码", trigger: "blur" }],
        add: [{ required: true, message: "请输入店铺地址", trigger: "blur" }],
        time:[{required: true, message: "请输入店铺营业时间", trigger: "blur" }]
      }
    };
  },
  computed:{
      GDMap
  },
  methods: {
    editMessage() {
      console.log("lalal");
      this.editFlag = false;
    },
    changeTime() {
      console.log("选择营业时间");
    },
    cancelEdit() {
      this.editFlag = true;
    }
  }
};
</script>

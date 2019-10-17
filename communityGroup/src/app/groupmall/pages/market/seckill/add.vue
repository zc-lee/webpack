<template>
  <Modal footer-hide v-model="show" :title="isEdit?'编辑活动':'新增活动'" width="900">
    <Form ref="form" :model="formData" :rules="rules" label-width="100">
      <FormItem label="活动名称" prop="activityName">
        <Input class="w-300" v-model="formData.activityName" maxlength="10" placeholder="请输入活动名称"/>
      </FormItem>
      <FormItem label="封面海报" prop="activityPoster">
        <div class="flex bottom">
          <upload
                            class           = "upload"
                          :action           = "uploadUrl()"
                            name            = "files"
                            type            = "drag"
                          :format           = "['jpg','jpeg','png','gif']"
                          :show-upload-list = "false"
                          :max-size         = "300"
                          :on-exceeded-size = "imgOverSize"
                          :on-format-error  = "imgFormatError"
                          :on-success       = "imgSuccess"
                          :on-error         = "imgError"
          >
            <img v-if="formData.activityPoster" :src="formData.activityPoster" class="uploadBox">
            <icon v-else class="uploadBox" type="md-add" size="30"></icon>
          </upload>
          <span class="fs-12 fc-7f">（请上传大小750x375px的图片，大小不超过300kb）</span>
        </div>
      </FormItem>
      <FormItem label="预热时间" prop="readyTime">
        <TimePicker
                          v-model     = "formData.readyTime"
                          format      = "HH:mm"
                        :steps        = "[1,30]"
                          type        = "time"
                          placeholder = "选择预热时间"
                        :editable     = "false"
        ></TimePicker>
      </FormItem>
      <FormItem label="活动时间" prop="time">
        <div>
          <DatePicker
                            v-model     = "times.date"
                            type        = "date"
                            format      = "yyyy-MM-dd"
                            placeholder = "选择活动日期"
                          :editable     = "false"
                          :options      = "options.date"
          ></DatePicker>
          <TimePicker
                            class       = "ml-20"
                          :disabled     = "times.date?false:true"
                            v-model     = "times.start"
                            format      = "HH:mm"
                          :steps        = "[1,30]"
                            type        = "time"
                            placeholder = "选择开始时间"
                          :editable     = "false"
          ></TimePicker>
          <span class="mx-10">-</span>
          <TimePicker
            :disabled     = "times.start?false:true"
              v-model     = "times.end"
              format      = "HH:mm"
            :steps        = "[1,30]"
              type        = "time"
              placeholder = "选择结束时间"
            :editable     = "false"
          ></TimePicker>
        </div>
      </FormItem>
      <FormItem label="预计提货时间" prop="forecastReceiveTime">
        <TimePicker
                          v-model     = "formData.forecastReceiveTime"
                          format      = "HH:mm"
                        :steps        = "[1,5]"
                          type        = "time"
                          placeholder = "选择提货时间"
                        :editable     = "false"
        ></TimePicker>
      </FormItem>
      <FormItem label="选择商品" prop="products">
        <div class="fc-fe5f4b">已选{{formData.products.length}}款商品</div>
        <div class="start bl br bt h-44 fw-bold mt-10">
          <span class="h-all center middle w-200 br">标题</span>
          <span class="h-all center middle w-100 br">秒杀价</span>
          <span class="h-all center middle br" style="flex-grow:1">库存</span>
          <span class="h-all center middle w-80 br">排序</span>
          <span class="h-all center middle w-100">操作</span>
        </div>
        <div class="center b middle h-200" v-if="formData.products.length==0">暂无商品</div>
        <div v-else class="b h-200 of-scroll-y fs-12 scroll-line">
          <div class="bb start" v-for="(v,i) in formData.products" :key="i">
            <span class="center middle w-200 br">
              <div class="start middle">
                <div class="wh-60 mr-10">
                  <img class="wh-all" :src="v.productImg" alt>
                </div>
                <div class="w-120">
                  <div class="huanhang lh-1-2">{{v.productName}}</div>
                  <div class="fc-fe5f4b">￥{{v.price}}</div>
                </div>
              </div>
            </span>
            <span class="center middle w-100 br">
            </span>
            <span class="br" style="flex-grow:1">
            </span>
            <span class="center middle w-80 br">
            </span>
            <span class="center middle w-100">
            </span>
          </div>
        </div>
        <div>
          <div class="view">添加商品</div>
        </div>
      </FormItem>
      <FormItem class="center">
        <Button @click="show=false">取消</Button>
        <Button class="ml-20" type="primary" @click="save">确认</Button>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  computed  : {
    ...mapGetters(["uploadUrl", "Date"])
  },
  data() {
    return {
      show    : false,
      isEdit  : false,
      formData: {
        activityId         : "",
        activityName       : "",
        activityPoster     : "",   // 活动海报
        readyTime          : "",   // 预热时间
        startTime          : "",
        endTime            : "",
        forecastReceiveTime: "",   // 预计提货时间
        products           : []
      },
      times: {
        date : null,
        start: null,
        end  : null
      },
      options: {
        date: {
          disabledDate: time => {
            let toDay = new Date(
              this.Date.getYMDs(Date.now()) + " 00:00:00"
            ).getTime();
            return time.getTime() < toDay;
          }
        }
      },
      rules: {
        activityName: [
          {
            required: true,
            message : "请输入活动名称",
            trigger : "blur"
          }
        ],
        activityPoster: [
          {
            required: true,
            message : "请选择封面海报",
            trigger : "blur"
          }
        ],
        time: [
          {
            required : true,
            validator: (rule, value, callback) => {
              value = this.times;
              console.log(value);
              if (!value.date) {
                callback(new Error("请选择日期"));
              } else if (!value.start) {
                callback(new Error("请选择开始时间"));
              } else if (!value.end) {
                callback(new Error("请选择结束时间"));
              }
            },
            trigger: "manual"
          }
        ],
        forecastReceiveTime: [
          {
            required: true,
            message : "请选择预计提货时间",
            trigger : "blur"
          }
        ],
        products: [
          {
            required: true,
            message : "请选择商品",
            trigger : "manual"
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @method
     * @description 保存
     */
    save() {
      this.$refs.form.validate(valid => {});
    },
    /**
     * @method
     * @description 海报上传
     */
    imgOverSize(res) {
      this.$Message.error("图片大小不超过300kb");
      return false;
    },
    imgFormatError(res) {
      this.$Message.error("请上传jpg,jpeg,png,gif图片文件");
      return false;
    },
    imgSuccess(res) {
      this.formData.activityPoster = res.data;
    },
    imgError(res) {}
  },
  mounted() {
  }
};
</script>
<style scoped>
.upload {
  display        : flex;
  justify-content: center;
  align-items    : center;
  width          : 300px;
  height         : 140px;
}
.uploadBox {
  display        : flex;
  justify-content: center;
  align-items    : center;
  width          : 300px;
  height         : 150px;
  vertical-align : bottom;
}
.uploadBox:hover {
  border-color: #1e83d3;
  color       : #1e83d3;
}
.view {
  color: #1e83d3;
}
.view:hover {
  color: #1ea9d3;
}
</style>
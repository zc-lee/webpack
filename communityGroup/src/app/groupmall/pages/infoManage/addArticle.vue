<template>
  <div>
    <Modal footer-hide v-model="show" :title="isEdit?'编辑文章':'新增文章'" width="900">
      <Form ref="form" :model="form" :rules="rules" label-width="80">
        <FormItem label="文章封面" prop="coverUrl">
          <span class="fs-12 fc-7f">（请上传大小750x375px的图片，大小不超过300kb，图片格式支持 png、jpg。）</span>
          <div class="mt-10">
            <upload
                class           = "upload"
              :action           = "uploadUrl()"
                name            = "files"
                type            = "drag"
              :format           = "['jpg','jpeg','png','gif']"
              :max-size         = "300"
              :on-exceeded-size = "onOverSize"
              :on-format-error  = "onFormatError"
              :show-upload-list = "false"
              :on-success       = "onSuccess"
              :on-error         = "onError"
              :before-upload    = "beforeUpload"
            >
              <img v-if="form.coverUrl" :src="form.coverUrl" class="uploadBox">
              <icon v-else class="uploadBox" type="md-add" size="30"></icon>
            </upload>
          </div>
        </FormItem>
        <FormItem label="文章标题" required prop="articleTitle">
          <Input class="w-300" v-model="form.articleTitle" maxlength="10" placeholder="请输入文章标题"/>
        </FormItem>
        <FormItem label="文章视频">
          <span class="fs-12 fc-7f">（视频大小不超过5M）</span>
          <div class="mt-10 flex bottom">
            <upload
                class           = "upload"
              :action           = "uploadUrl(2002)"
                name            = "files"
                type            = "drag"
              :format           = "['mp4']"
              :max-size         = "1024*5"
              :show-upload-list = "false"
              :on-format-error  = "videoFormatError"
              :on-exceeded-size = "videoOverSize"
              :before-upload    = "videobeforeUpload"
              :on-success       = "videoSuccess"
              :on-error         = "videoError"
            >
              <video v-if="form.videoUrl" class="uploadBox" controls :src="form.videoUrl"/>
              <icon v-else class="uploadBox" type="md-add" size="30"></icon>
            </upload>
            <template v-if="form.videoUrl">
              <upload
                  class           = "ml-30"
                :action           = "uploadUrl(2002)"
                  name            = "files"
                :format           = "['mp4']"
                :max-size         = "1024*5"
                :show-upload-list = "false"
                :on-format-error  = "videoFormatError"
                :on-exceeded-size = "videoOverSize"
                :before-upload    = "videobeforeUpload"
                :on-success       = "videoSuccess"
                :on-error         = "videoError"
              >
                <Button type="primary">替换</Button>
              </upload>
              <Button type="primary" class="ml-20" @click="form.videoUrl=''">删除</Button>
            </template>
          </div>
        </FormItem>
        <FormItem label="文章内容" required>
          <wangeditor :text="form.centent" :catchData="catchData"></wangeditor>
        </FormItem>
        <FormItem label="文章链接">
          <Select class="w-300" v-model="form.categoryNames">
            <Option>需商品接口</Option>
            <Option v-for="(v,i) in cateList" :value="v.categoryName" :key="i"></Option>
          </Select>
        </FormItem>
        <FormItem label="所属专题">
          <Select class="w-300" v-model="form.categoryNames">
            <Option v-for="(v,i) in cateList" :value="v.categoryName" :key="i"></Option>
          </Select>
        </FormItem>
        <FormItem class="center">
          <Button @click="show=false">取消</Button>
          <Button class="ml-20" type="primary" @click="save">确认</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import wangeditor from "../../component/wangeditor.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    wangeditor
  },
  data() {
    return {
      show    : false,
      isEdit  : false,   // 编辑、添加
      cateList: [],
      form    : {
        articleTitle     : "",
        coverUrl         : "",
        videoUrl         : "",
        productId        : "",
        productName      : "",
        centent          : "",
        categoryIds      : "",
        categoryNames    : "",
        articleCategories: []
      },
      rules: {
        articleTitle: [
          {
            required: true,
            message : "请输入文章标题",
            trigger : "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["uploadUrl"])
  },
  methods: {
    /**
     * @method
     * @description 保存
     */
    save() {
      console.log(this.form);
      this.$refs.form.validate(valid => {});
    },
    catchData(value) {
      this.form.centent = value;
    },
    /**
     * @method
     * @description 图片上传
     */
    onSuccess(res) {
      console.log(res);
      this.form.coverUrl = res.data;
    },
    onFormatError(res) {
      console.log(res);
      this.$Message.error("请上传jpg,jpeg,png,gif图片文件");
      return false;
    },
    onOverSize(res) {
      console.log(res);
      this.$Message.error("图片大小不超过300kb");
      return false;
    },
    onError(res) {
      console.log(res);
    },
    beforeUpdate(file) {
      console.log(file);
    },
    /**
     * @method
     * @description 视频上传
     */
    videoSuccess(res) {
      console.log(res);
      this.form.videoUrl = res.data;
    },
    videoFormatError(res) {
      console.log(res);
      this.$Message.error("请上传mp4视频文件");
      return false;
    },
    videoOverSize(res) {
      console.log(res);
      this.$Message.error("视频大小不超过5M");
      return false;
    },
    videoError(res) {
      console.log(res);
    },
    videobeforeUpdate(file) {
      console.log(file);
    }
  },
  mounted() {}
};
</script>
<style>
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
</style>
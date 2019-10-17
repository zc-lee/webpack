<template>
  <div style="width:100%;z-index:1;position:relative;" ref="editor"></div>
</template>

<script>
import wEditor from "wangeditor/release/wangEditor.js";
import { mapGetters } from "vuex";
export default {
  name: "wangeditor",
  props: ["text",'catchData'],
  data() {
    return {
      editor: "",
      editorText: this.text
    };
  },
  computed: {
    ...mapGetters(["uploadUrl"])
  },
  mounted() {
    this.initEditor(this.editorText); //初始化富文本编辑器
  },
  methods: {
    //初始化富文本编辑器
    initEditor(_editor = "") {
      /** 服务详情富文本 */
      this.editor = new wEditor(this.$refs.editor);
      // this.editor.customConfig.uploadImgShowBase64 = true //使用 base64 保存图片
      this.editor.customConfig.pasteFilterStyle = false;
      this.editor.customConfig.uploadImgMaxSize = 1 * 1024 * 1024; // 将图片大小限制为 3M
      this.editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
      this.editor.customConfig.uploadImgServer = this.uploadUrl(5001); //配置服务器端地址
      this.editor.customConfig.uploadFileName = "files";
      this.editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
          if (result.code == 100) {
            insertImg(result.data);
          }
        }
      };
      this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(html); //把这个html通过catchData的方法传入父组件
      };
      this.editor.customConfig.customAlert = info => {
        this.$Message.error(info);
      };

      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        // "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        // "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        // "video", // 插入视频
        "undo", // 撤销
        "redo" // 重复
      ];
      // this.change();
      this.editor.create();
      this.editor.txt.html(`<p>${_editor}</p>`);
    },
    change() {
      return (this.editor.customConfig.onchange = html => {
        console.log("change");
      });
    },
    //获取编辑框html
    getHtml() {
      // var filterHtml = filterXSS(html) //此处进行 xss 攻击过滤
      return this.editor.txt.html(); //获取编辑框html
    },

    //获取编辑框text
    getText() {
      return this.editor.txt.text(); //获取编辑框text
    },

    //清空编辑器内容
    clearEditor() {
      this.editor.txt.clear(); //清空编辑器内容
    }
  }
};
</script>
<style scoped>
</style>

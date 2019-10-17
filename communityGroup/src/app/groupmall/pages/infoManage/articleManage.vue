<template>
  <div class="box">
    <!-- 功能开启关闭 -->
    <div class="between middle fc-6 px-30 py-20 fs-12" style="background:rgba(233,243,252,.55);">
      <div class="wp-90">
        <p
          style = "margin-bottom:0"
        >您{{true?"已":"尚未"}}开启资讯管理功能。开启资讯管理后，您可以编辑图文信息并发布至小程序前端供用户查看及评论，新增文章时可以上传图片、视频及链接一款产品，每篇文章都可选择各自对应的栏目专题并可以排序。您还可以对用户在小程序端的评论进行筛选、排序、回复。</p>
        <p class="fc-fe5f4b" style="margin-bottom:0">注意：专题栏目数量最少不低于2个，最多不超过10个，上传视频大小不能超过5M。</p>
      </div>
      <Button type="primary" @click="changeArticleState">{{!true?"开启":"关闭"}}</Button>
    </div>
    <div class="my-10">
      <Button type="primary" @click="$refs.addArticle.show=true;">新增文章</Button>
    </div>
    <!-- 列表 -->
    <list></list>
    <!-- 添加编辑文章 -->
    <add-article ref="addArticle"></add-article>
  </div>
</template>
<script>
import list from './articleList';
import addArticle from './addArticle';
export default {
  components:{
    list,
    addArticle
  },
  data() {
    return {
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style scoped>
.box {
  background-color: #fff;
  min-height      : 722px;
  padding         : 15px;
  margin-top      : 10px;
}
</style>
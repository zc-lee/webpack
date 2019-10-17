<template>
  <div>
    <div class="between">
      <div>
        <Button type="primary" disabled>设置专题</Button>
        <Button class="ml-10">删除</Button>
      </div>
      <Page @on-change="" @on-page-size-change=""></Page>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style>
</style>
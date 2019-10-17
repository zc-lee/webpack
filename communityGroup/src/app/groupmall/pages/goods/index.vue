<template>
  <div class="goods-config">
    <ul class="serch-type">
      <li @click="selectType(1)" :class="{'active':serchQuery.searchType=='1'}"><span>出售中的商品</span></li>
      <li @click="selectType(3)" :class="{'active':serchQuery.searchType=='3'}"><span>仓库中的商品</span></li>
      <li @click="selectType(4)" :class="{'active':serchQuery.searchType=='4'}"><span>已售完的商品</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serchQuery: {
        searchType: 1
      }
    };
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

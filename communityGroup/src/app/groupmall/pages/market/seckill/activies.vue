<template>
  <div>
    <div>
      <Button type="primary" @click="$refs.add.show=true">新增秒杀活动</Button>
      <Button disabled style="margin-left:15px;">删除</Button>
    </div>
    <!-- table -->
    <div class="table-head">
      <span class="check">
        <Checkbox></Checkbox>
      </span>
      <span style="width:60px;">状态</span>
      <span style="width:170px;">名称</span>
      <span style="width:300px;">活动时间</span>
      <span style="width:100px;">参加人数</span>
      <span style="width:100px;">活动商品</span>
      <span style="width:100px;">成交量（笔）</span>
      <span style="width:100px;">成交额（元）</span>
      <span style="width:120px;padding-left:15px;">操作</span>
    </div>
    <div class="table-list" v-for="(item, index) in 3" :key="index" :style="false?'opacity:0.6':''">
      <span class="check">
        <Checkbox></Checkbox>
      </span>
      <span style="width:60px;">进行中</span>
      <span style="width:170px;font-weight:bold;">名称名称名称名称名称
        <Poptip placement="right" trigger="hover">
          <Icon color="#1e83d3" size="16" type="md-chatboxes"/>
          <div slot="content">123</div>
        </Poptip>
      </span>
      <span style="width:300px;">
        <div>2017-08-06 00: 00 至 2017-08-06 00: 00</div>
        <div style="font-weight:bold;color:#ff5454;">距离活动结束 00 小时 18 分</div>
        <div style="font-weight:bold;color:#1e83d3;">距离活动开始 00 小时 18 分</div>
      </span>
      <span style="width:100px;">300</span>
      <span style="width:100px;color:#1e83d3;">18</span>
      <span style="width:100px;">12</span>
      <span style="width:100px;">￥300.00</span>
      <span style="width:120px;">
        <Button class="view" type="text">查看</Button>
        <Button class="delete" type="text">删除</Button>
      </span>
    </div>
    <div class="footer">
      <Page :total="total" @on-change="(page)=>{getList(page)}"></Page>
    </div>
    <!-- 添加编辑活动 -->
    <add ref="add"></add>
  </div>
</template>
<script>
import add from './add';
import {mapActions} from 'vuex';
export default {
  components: {
    add
  },
  computed: {},
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    ...mapActions([
      'getActivity',
    ]),
    /**
     * @method
     * @description 查询秒杀
     */
    async getList(page=1,size=10){
      let res = await this.getActivity({
        page,
        size,
        actType: 1
      })
      if(res.code==200){

      }else{
        this.$Message.error(res.msg)
      }
    },
  },
  mounted() {
    this.getList();
  }
};
</script>
<style scoped lang="less">
.table-head {
  margin-top      : 20px;
  background-color: #f6f8fa;
  border-top      : 1px solid #e5e5e5;
  font-weight     : bold;
  display         : flex;
  align-items     : center;
}
.table-list {
  padding      : 10px 0;
  display      : flex;
  align-items  : center;
  border-bottom: 1px solid #e5e5e5;
}
.check {
  padding: 10px;
}
.view {
  color: #1e83d3;
}
.view:hover {
  color: #1ea9d3;
}
.delete {
  color: #ff0000;
}
.delete:hover {
  color: #ff5943;
}
.footer{
  margin-top: 30px;
  text-align: right;
}
</style>
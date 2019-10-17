<template>
    <div class="bc-white" :style="{height:curHeight +'px'}" >
        <Menu mode="horizontal"  active-name="1" @on-select="chooseItem">
            <MenuItem name="1" >
                首页轮播图
            </MenuItem>
            <MenuItem name="2">
                底部导航
            </MenuItem>
            <MenuItem name="3">
                店铺风格
            </MenuItem>
        </Menu>
        <div v-if="current == 1" class="pt-40 pb-30 ">
            <div class="ml-20 flex">
                <Button>新增轮播图</Button>
                <Button disabled class="ml-40">删除</Button>
            </div>
            
            <section class="list-head " style="margin-top:36px;height:30px">
                <div class="wp-20 ml-10">
                    <Checkbox @on-change="onChangList('')" v-model="seletAll"></Checkbox>
                </div>
                <div class=" wp-30">轮播图</div>
                <div class=" wp-20">链接</div>
                <div class="wp-20 ">排序</div>    
                <div class="">操作</div>
            </section>
            <section v-for="(item, index) in list" :key="index" class="flex middle mt-10  px-10">
                <div class="flex middle bb w-all">
                    <div class="wp-10">
                        <Checkbox @on-change="(value)=>{return onChangList(value,item.lineId)}"></Checkbox>
                    </div>
                    <div class="wp-40">
                        <img :src="item.imgUrl" alt="" style="width:226px;height:122px">
                    </div>
                    <div class=" wp-20">{{item.linkName}}</div>
                    <div  style="width:22%">
                        <Icon type="md-arrow-round-up" size="24" />
                        <Icon type="ios-arrow-round-up" size="24"/>
                        <Icon type="ios-arrow-round-down" size="24"/>
                        <Icon type="md-arrow-round-down" size="24"/>
                    </div>
                    <div @click="editChartImg">编辑</div>
                </div>
                <Modal v-model="showFlag" title="新增轮播图" @on-ok="ok" @on-cancel="cancel">
                    <div class="flex mt-40">
                        <div class="fw-bold">轮播图</div>
                        <div>(请上传宽度750x375px的图片，大小不超过300kb，图片格式支持 png、jpg。)</div>
                    </div>
                    <div style="width:375px;height:200px;" class="bc-eee middle center mt-30">
                        <Icon type="md-add" style="font-size:30px" />
                    </div>
                    <div class="mt-20 flex middle">
                        <div class="fw-bold">轮播图链接</div>
                        <div style="width:296px;height:28px;" class="b-1e83d3 radius-6 ml-20 middle pl-10 pr-10 between fc-b2">
                            <div>请选择</div>
                            <Icon type="ios-arrow-down" />
                        </div>
                    </div>
                </Modal>
            </section>
        </div>
         
        <div v-if="current == 2">
            <div class="px-30 bc-white" >
                <div class="flex  mt-40 bb middle" style="height:30px">
                    <div class=" wp-20 ml-10">导航名称</div>
                    <div class=" wp-20">未选中图片</div>
                    <div class="wp-20 ">选中图片</div>   
                    <div class="wp-20">链接</div>
                    <div class="">操作</div>
                </div>
                <div class="mt-20 pb-20">
                    <div v-for="item in navigationList" :key="item">
                        <div class="ml-10 middle bb" style="height:80px">
                            <div class="wp-20 ml-10">
                                {{item.navName}}
                            </div>
                            <div class="wp-20">
                                <img :src="item.nochooseImg" alt="" style="width:50px;height:50px">
                            </div>
                            <div class="wp-20">
                                <img :src="item.chooseImg" alt="" style="width:50px;height:50px">
                            </div>
                            <div class="wp-20">
                                <Select v-model="label"  size="small" style="width:100px">
                                    <Option v-for="item in navList" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div>
                                <i-switch />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="current == 3">
            <div class="pl-20 pt-40">
                <div class="flex middle fw-bold">
                    <p>选择配送方案：</p>
                    <div class="flex ml-20 middle center"  style="width:80px;height:40px;border: 1px solid #1e83d3;" v-if="getColor">
                    <!-- <div class="flex ml-20 middle center" >  -->
                            <div style="background-color:#d86c90" class="wh-20"></div>
                            <div  class="wh-20 " style="background-color:black"></div>
                            <div  class="wh-20 b fc-fff" ></div>
                    </div>
                    <div  class="flex ml-20">
                        <div style="background-color:#ef570c" class="wh-20"></div>
                        <div  class="wh-20" style="background-color:black"></div>
                        <div  class="wh-20 b fc-fff"></div>
                    </div>
                    <div  class="flex ml-20">
                        <div style="background-color:#fd435b" class="wh-20"></div>
                        <div  class="wh-20" style="background-color:black"></div>
                        <div  class="wh-20 b fc-fff"></div>
                    </div>
                    <div  class="flex ml-20">
                        <div style="background-color:#fbeb00" class="wh-20"></div>
                        <div  class="wh-20" style="background-color:black"></div>
                        <div  class="wh-20 b fc-fff"></div>
                    </div>
                    
                </div>

                <div class="flex fw-bold mt-40">
                    <p>当前风格示例：</p>
                    <div class="">
                        <img src="../../assets/index.png" alt="" style="width:256px;height:566px" class="ml-10">
                        <img src="../../assets/content.png" alt="" style="width:256px;height:566px" class="ml-40">
                        <img src="../../assets/my.png" alt="" style="width:256px;height:566px" class="ml-40">
                    </div>
                </div>
            </div>
           
           




        </div>
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      current: "1",
      showFlag: false,
      getColor:true,
      list: [
        {
          imgUrl:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          linkName: "商品名称"
        },
        {
          imgUrl:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          linkName: "商品名称"
        },
        {
          imgUrl:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          linkName: "商品名称"
        }
      ], //导航栏信息
      navigationList: [
        {
          navName: "推荐",
          nochooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          chooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg"
        },
        {
          navName: "秒杀",
          nochooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          chooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg"
        },
        {
          navName: "拼团",
          nochooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          chooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg"
        },
        {
          navName: "发现",
          nochooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          chooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg"
        },
        {
          navName: "我的",
          nochooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg",
          chooseImg:
            "https://www.superprism.cn/mdsfile/medusa/basemall/S00040001wx4f8730e96f773fa3/image20181112114952024-122.jpg"
        }
      ], //底部导航
      navList: [
        {
          label: "推荐"
        },
        {
          label: "秒杀"
        },
        {
          label: "拼团"
        },
        {
          label: "发现"
        }
      ],
      curHeight: document.documentElement.clientHeight
    };
  },
  methods: {
    chooseItem(e) {
      this.current = e;
      console.log(this.current);
      console.log(this.curHeight)
    },
    editChartImg() {
      console.log("编辑轮播图");
      this.showFlag = true;
      console.log(this.showFlag);
    }
  },
  mounted(){
      console.log(this)
  }
};
</script>
<style lang="less">
.list-head,
.list-item {
  display: flex;
  align-items: center;
  //   justify-content: space-between;
  background-color: #f6f8fa;
  border-bottom: 1px solid #f2f2f2;
  .list-btn {
    button {
      margin-right: 5px;
    }
  }
  .flex1 {
    flex: 1;
    padding-right: 20px !important;
    span {
      float: left;
    }
  }
  .list-check {
    width: 30px;
    padding-left: 10px;
  }
  .list-cell {
    padding: 10px 5px;
    width: 15%;
  }
}
</style>


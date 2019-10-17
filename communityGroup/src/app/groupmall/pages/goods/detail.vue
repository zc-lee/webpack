<template>
  <div class="goods-detail">
    <section class="detail-block">
      <nav class="block-title"><span><i>1</i> 商品基本信息</span></nav>
      <section class="block-line">
        <div class="lefts"><i>*</i>商品标题</div>
        <div class="rights">
          <Input v-model="addInfo.goodsName" style="width:600px;" placeholder="请输入商品标题"></Input>
        </div>
      </section>
      <section class="block-line">
        <div class="lefts"><i>*</i>卖点描述</div>
        <div class="rights">
          <Input v-model="addInfo.goodsDesc" style="width:600px;" placeholder="请输入卖点描述"></Input>
        </div>
      </section>
      <section class="block-line">
        <div class="lefts"><i>*</i>供应商</div>
        <div class="rights">
          <AutoComplete icon="ios-search" @on-search="providerSerch" v-model="addInfo.providerName" placeholder="输入后请选择" style="width:200px">
            <Option v-for="item in customList" @click.prevent.native="onChangeCustom(item)" :value="item.providerName" :key="item">{{ item.providerName }}</Option>
          </AutoComplete>
        </div>
      </section>
      <section class="block-line">
        <div class="lefts"><i>*</i>商品分类</div>
        <div class="rights">
          <Select style="width:600px;" placeholder="请选择分类" multiple v-model="addInfo.goodsClassIds">
            <OptionGroup v-for="item in classifyList" :key="item.goodsClassId" :label="item.goodsClassName">
              <Option v-for="child in item.classTwos" :value="child.goodsClassId" :key="child.goodsClassId">{{ child.goodsClassName }}</Option>
            </OptionGroup>
          </Select>
        </div>
      </section>
    </section>

    <section class="detail-block">
      <nav class="block-title"><span><i>2</i> 商品销售量/价格</span></nav>
      <section class="block-line">
        <div class="lefts"><i>*</i>商品一口价</div>
        <div class="rights">
          <div class="right-1"><Input v-numberInt:0="addInfo.markPrice" v-model="addInfo.markPrice" style="width:150px;" placeholder="￥0.00"></Input></div>
          <!-- <div class="right-2"><span class="right-spac">促销价</span><Input v-model="addInfo.price" style="width:150px;margin-left:10px;" placeholder="￥0.00"></Input></div> -->
        </div>
      </section>
      <section class="block-line">
        <div class="lefts"><i>*</i>库存</div>
        <div class="rights">
          <div class="right-1"><Input v-numberInt:0="addInfo.stock" v-model="addInfo.stock" style="width:150px;" placeholder="￥0.00"></Input><span style="margin-left:5px;">件</span></div>
          <div class="right-2"><span class="right-spac">初始销量</span><Input v-numberInt:0="addInfo.shamVolume" v-model="addInfo.shamVolume" style="width:150px;margin-left:10px;" placeholder="输入销售量"></Input></div>
        </div>
      </section>
      <section class="block-line">
        <div class="lefts">团长佣金</div>
        <div class="rights">
          <i-input v-model="addInfo.groupLeaderCommission" v-numberInt:0="addInfo.groupLeaderCommission" placeholder="输入团长佣金" style="width: 123px;margin-right:5px;" />
          <i-switch true-value="2" false-value="1" v-model="addInfo.commissionType">
            <span slot="open">元</span>
            <span slot="close">%</span>
          </i-switch>
          <div v-if="addInfo.commissionType=='1'" class="commission"><span>团长佣金占商品额的百分比</span></div>
          <div v-if="addInfo.commissionType=='2'" class="commission"><span>商品每单团长的佣金金额</span></div>
        </div>
      </section>
    </section>

    <section class="detail-block">
      <nav class="block-title"><span><i>3</i> 商品参数</span></nav>
      <section class="parameter">
        <table>
          <thead>
            <tr>
              <td></td>
              <td>属性名称</td>
              <td>属性特征</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in propertyList" :key="index">
              <td>*</td>
              <td><Input v-model="item.name" placeholder="请输入属性名称"></Input></td>
              <td><Input v-model="item.feature" placeholder="属性特征"></Input></td>
              <td><span @click="setProperty(index)">删除</span></td>
            </tr>
            <tr>
              <td></td>
              <td><span @click="setProperty()" style="color:#2d8cf0;cursor:pointer;">添加商品属性</span></td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>

    <section class="detail-block">
      <nav class="block-title"><span><i>4</i> 图文详情</span></nav>
      <section class="detail-image">
        <div class="lefts"><i>*</i>商品主图</div>
        <div class="rights">
          <div class="about">图片大小不能超过1MB，图片尺寸750*750像素最佳，最多6张主图片</div>
          <div class="pic-list">
            <div v-for="(item, index) in addInfo.goodsImg" :key="index" class="demo-upload-list">
              <img :src="item">
              <div class="demo-upload-list-cover">
                <icon type="ios-trash-outline" @click.native="setPic(index)"></icon>
              </div>
            </div>
            <upload v-if="addInfo.goodsImg.length<6" ref="upload" :action="uploadUrl()" name="files" :format="['jpg','jpeg','png','gif']" :show-upload-list="false" :on-success="uploadSuccess" :max-size="1024" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" style="display: inline-block;width:78px;">
              <div style="width: 78px;height:78px;line-height: 78px;">
                <icon type="md-add" size="30"></icon>
              </div>
            </upload>
          </div>
        </div>
      </section>
    </section>

    <section class="detail-block">
      <section class="detail-image">
        <div class="lefts"><i>*</i>详情描述</div>
        <div class="rights">
          <div class="pic-editor">
            <wangeditor :catchData="catchData" :text="addInfo.text" ref="wangeditor"></wangeditor>
          </div>
        </div>
      </section>
    </section>

    <section class="goods-bottom">
      <Button @click="okBtn(0)" type="primary">发 布</Button>
      <Button @click="okBtn(1)" style="margin-left:20px">发布至仓库</Button>
    </section>
  </div>
</template>
<script>
import wangeditor from "../../component/wangeditor.vue";
import { mapActions, mapGetters } from "vuex";
import "../../../../config/directive.js";
export default {
  data() {
    return {
      commission: "",
      abouts: "",
      classifyList: [],
      customList: [],
      isInput: false,
      goodTypeList: [],
      propertyList: [
        {
          name: "",
          feature: ""
        }
      ],
      addInfo: {
        commissionType: "2",
        expirationDate: "",
        goodsName: "",
        goodsDesc: "",
        goodsProperty: [],
        goodsStatus: "0",
        markPrice: "",
        providerId: "",
        shamVolume: "",
        stock: "",
        goodsImg: [],
        goodsClassIds: [],
        groupLeaderCommission: "",
        text: "",
        providerName: ""
      }
    };
  },
  computed: {
    ...mapGetters(["uploadUrl"])
  },
  components: {
    wangeditor
  },
  watch: {
    "addInfo.providerName": function(value) {
      if (this.isInput) this.serchCustom(value);
    },
    // "addInfo.groupLeaderCommission": function(value) {
    //   if (
    //     this.addInfo.commissionType == "2" &&
    //     value > this.addInfo.markPrice
    //   ) {
    //     this.addInfo.groupLeaderCommission = this.addInfo.markPrice;
    //   }
    // }
  },
  methods: {
    ...mapActions(["getClass", "getCustom", "saveGoods"]),
    catchData(value) {
      this.addInfo.text = value;
      console.log(value);
    },
    okBtn(type) {
      let isNext = false;
      let valid = {
        goodsName: ["请输入商品标题"],
        goodsDesc: ["请输入卖点描述"],
        providerId: ["请选择供应商"],
        goodsClassIds: ["请选择商品分类"],
        markPrice: ["请输入商品一口价"],
        stock: ["请输入库存"],
        shamVolume: ["请输入初始销量"],
        groupLeaderCommission: ["请输入团长佣金"],
        goodsProperty: ["请添加商品参数"],
        goodsImg: ["请上传商品主图"]
      };

      for (let item in this.addInfo) {
        if (valid[item] && valid[item].length > 0) {
          if (typeof this.addInfo[item] == "string" && !this.addInfo[item]) {
            this.$Message.error(valid[item][0]);
            isNext = true;
            break;
          }
        }
      }
      if (isNext) return;
      for (let item1 of this.propertyList) {
        if (!item1.name || !item1.feature) {
          this.$Message.error("商品参数的值不为空！");
          isNext = true;
          break;
        }
      }
      if (isNext) return;
      if (this.addInfo.goodsImg && this.addInfo.goodsImg.length == 0) {
        this.$Message.error(valid["goodsImg"][0]);
        return;
      }

      if (parseInt(this.addInfo.markPrice) <parseInt(this.addInfo.groupLeaderCommission) && this.addInfo.commissionType=='2') {
        this.$Message.error("团长佣金不能大于商品一口价");
        return;
      }

      this.addInfo.goodsStatus = type;

      let curr = this.global.deepClone(this.addInfo);
      curr.goodsImg = this.addInfo.goodsImg.join(",");
      curr.goodsProperty = JSON.stringify(this.propertyList);
      curr.goodsTitle = this.addInfo.goodsName;
      this.saveGoods(curr).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "goods" });
        }
      });
    },
    providerSerch() {
      this.isInput = true;
    },
    uploadSuccess(response, file, fileList) {
      this.addInfo.goodsImg.push(response.data);
    },
    handleFormatError(file, fileList) {
      this.$Message.error("只允许上传图片文件，如jpg,jpeg,png,gif");
      return false;
    },
    setPic(index) {
      this.addInfo.goodsImg.splice(index, 1);
    },
    handleMaxSize() {
      this.$Message.error("只允许上传1M以下图片");
      return false;
    },
    setProperty(index) {
      if (index || index == 0) {
        if (index != 0) this.propertyList.splice(index, 1);
      } else {
        this.propertyList.push({
          name: "",
          feature: ""
        });
      }
    },
    serchCustom(value) {
      this.getCustom({
        providerId: "",
        providerPhone: "",
        providerName: value,
        searchType: "1",
        pageNum: "1",
        pageSize: "500"
      }).then(res => {
        if (res.code == 200) {
          this.customList = res.data.list;
        }
      });
    },
    onChangeCustom(item) {
      this.isInput = false;
      this.addInfo.providerId = item.providerId;
      console.log(this.addInfo.providerId);
    },
    initData() {
      this.getClass({}).then(res => {
        this.classifyList = res.data;
      });
      this.serchCustom("");
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
.goods-detail {
  padding: 20px 40px;
  margin-top: 10px;
  background-color: #fff;
  .goods-bottom {
    padding-bottom: 100px;
    padding-top: 20px;
    text-align: center;
  }
  .detail-block {
    padding-bottom: 20px;
    .block-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #1c7fcd;
      span {
        padding-bottom: 3px;
        border-bottom: 2px solid #1c7fcd;
        i {
          font-family: Arial;
          font-size: 16px;
        }
      }
    }
    .block-line {
      margin-bottom: 10px;
      padding-left: 15px;
      display: flex;
      align-items: center;
      .lefts {
        padding-right: 10px;
        width: 100px;
        text-align: right;
        i {
          color: red;
          padding-right: 5px;
          font-size: 15px;
          padding-top: 3px;
        }
      }
      .rights {
        display: flex;
        align-items: center;
        .ivu-switch-default {
          background-color: #1c7fcd !important;
        }
        .right-1 {
          width: 200px;
        }
        .right-spac {
          width: 60px;
          display: inline-block;
          text-align: right;
        }
        .commission {
          padding-left: 5px;
          color: #aaa;
          i {
            font-style: normal;
          }
          span {
            margin-left: 46px;
          }
        }
      }
    }
    .parameter {
      width: 650px;
      padding-left: 75px;
      table {
        width: 100%;
        tr td {
          padding: 10px;
        }
        thead td {
          border-bottom: 1px solid #eee;
        }
        tbody td {
          &:nth-child(4) {
            span {
              color: #ff9900;
              cursor: pointer;
            }
          }
          &:first-child {
            width: 1%;
            color: red;
          }
        }
      }
    }
    .detail-image {
      display: flex;
      align-items: flex-start;
      .lefts {
        padding-right: 10px;
        width: 100px;
        text-align: right;
        i {
          color: red;
          padding-right: 5px;
        }
      }
      .rights {
        .about {
          color: #aaa;
        }
        .pic-list {
          padding: 10px 0;
          .demo-upload-list {
            display: inline-block;
            width: 80px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            margin-right: 4px;
          }
          .demo-upload-list img {
            width: 100%;
            height: 100%;
          }
          .demo-upload-list-cover {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
          }
          .demo-upload-list:hover .demo-upload-list-cover {
            display: block;
          }
          .demo-upload-list-cover i {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
          }
        }
        .pic-editor {
          width: 730px;
        }
      }
    }
  }
}
</style>

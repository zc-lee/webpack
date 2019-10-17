<template>
  <div class="business-scope">
    <section class="serch">
      <table>
        <tr>
          <td>
            <span class="title">地区选择：</span>
            <Input v-model="serchQuery.pcaAdr" placeholder="输入区域名称" style="width: 300px" />
          </td>
          <td>
            <span class="title">区域选择：</span>
            <Input v-model="serchQuery.communityName" placeholder="输入区域名称" style="width: 300px" />
          </td>
        </tr>
        <tr>
          <td>
            <span class="title">小区名称：</span>
            <Input v-model="serchQuery.streetName" placeholder="输入小区名称" style="width: 300px" />
          </td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span class="title"></span>
            <Button @click="initData" type="primary">搜 索</Button>
          </td>
          <td></td>
        </tr>
      </table>
    </section>

    <section class="btn-line">
      <Button @click="addVillage" type="primary">添加小区</Button><Button style="margin-left:10px;" @click="deleteList('')">批量删除</Button>
    </section>

    <section class="data-list">
      <table>
        <thead>
          <tr>
            <td>
              <Checkbox @on-change="onChang('')" v-model="seletAll"></Checkbox>
            </td>
            <td>地区</td>
            <td>区域</td>
            <td>小区名称</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in currList" :key="index">
            <td>
              <Checkbox @on-change="(value)=>{return onChang(value,item.communityId)}" v-model="selectValue.indexOf(item['communityId'])>-1"></Checkbox>
            </td>
            <td>{{item.pcaAdr}}</td>
            <td>{{item.streetName}}</td>
            <td>{{item.communityName}}</td>
            <td>
              <Button size="small" @click="modifyList(item)" type="primary">编辑</Button>
              <Button size="small" @click="deleteList(item.communityId)" type="warning" ghost>删除</Button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="pages">
        <div class="page-btn">
          <Button @click="deleteList('')">批量删除</Button>
        </div>
        <Page :total="serchQuery.total" show-sizer @on-change="(page)=>{toPage(page,1)}" @on-page-size-change="(page)=>{toPage(page,2)}" />
      </nav>
    </section>

    <Modal class-name="vertical-center-modal" transfer="true" class="modelPub" v-model="modelAdd">
      <div class="titles">{{currItem.isAdd? "添加小区":"编辑小区"}}</div>
      <div class="model-line">
        <em>地区选择：</em>
        <div class="rights select">
          <Select placeholder="省份选择" @on-change="(value)=>{return selectChang(value,'prov')}" v-model="currItem.provinceId">
            <Option v-for="(item) in addressProv" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="城市选择" not-found-text="请先选择省份" @on-change="(value)=>{return selectChang(value,'city')}" v-model="currItem.cityId">
            <Option v-for="item in addressCity" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="区县选择" not-found-text="请先选择城市" @on-change="(value)=>{return selectChang(value,'area')}" v-model="currItem.areaId">
            <Option v-for="item in addressArea" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </div>
      <div class="model-line">
        <em>区域选择：</em>
        <div class="rights">
          <Select not-found-text="请先完成地区选择或添加区域" v-model="currItem.streetId">
            <Option v-if="item.id" v-for="item in addressCommunity" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div @click="btnAddCommunity" class="btnadd">添加+</div>
      </div>
      <div class="model-line">
        <em>小区名称：</em>
        <div class="rights">
          <Input v-model="currItem.communityName" placeholder="请输入" />
        </div>
      </div>

      <div class="model-line">
        <em>小区定位：</em>
        <div style="width:80%;height:260px;position:relative" class="rights">
          <GDMap @getlabel="getLocation" :address="currItem.streetName"></GDMap>
        </div>
      </div>
      <div class="model-line">
        <em>小区坐标：</em>
        <div class="rights">
          <Input v-model="currItem.location" disabled placeholder="点击地图上的位置获得坐标" />
        </div>
      </div>

      <div slot="footer">
        <Button @click="modelAdd=false">取消</Button>
        <Button @click="okList('add')" type="primary">确定</Button>
      </div>
    </Modal>

    <Modal class-name="vertical-center-modal" transfer="true" class="modelPub" width="300px" v-model="isArea">
      <div class="titles">区域管理</div>
      <div style="max-height:300px;overflow:auto">
        <div class="tab-line-item" v-for="(item, index) in addressCommunity" :key="index">
          <Input v-model="item.label" placeholder="请输入区域名称"></Input>
          <div style="width:20px;" v-if="item.id"></div>
          <div style="width:20px;" v-if="!item.id" @click="addressCommunity.splice(index,1)" class="Community-remove">
            <Icon type="md-close" />
          </div>
        </div>
      </div>
      <div style="margin-top:8px;">
        <Button @click="btnNewCommunity" size="small" type="primary">新增区域</Button>
      </div>
      <div slot="footer">
        <Button @click="isArea=false">取消</Button>
        <Button @click="okCommunity" type="primary">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import GDMap from "../../component/map.vue";
import { mapActions } from "vuex";
import __address from "../../../../config/city.js";
export default {
  components: {
    GDMap
  },
  data() {
    return {
      seletAll: false, //是否全选
      isloader: true,
      selectValue: [],
      addressValue: "",
      modelAdd: false,
      addressProv: __address.getProvince(),
      addressCity: [],
      addressArea: [],
      addressCommunity: [],
      currList: [],
      isArea: false,
      isModify: false,
      serchQuery: {
        communityId: "",
        communityName: "",
        page: "1",
        pcaAdr: "",
        size: "10",
        streetName: "",
        total: 0
      },
      currItem: {
        areaId: "",
        cityId: "",
        communityId: "",
        provinceId: "",
        streetId: "",
        location: "",
        streetName: ""
      }
    };
  },
  methods: {
    ...mapActions([
      "getAddress",
      "getDeliveryUpdateBatch",
      "saveCommunity",
      "getCommunityList",
      "deleteCommunity",
      "getAllAddress",
      "updataCommunity"
    ]),
    deleteList(id) {
      this.deleteCommunity({
        communityIds: id || this.selectValue.join(",")
      }).then(res => {
        if (res.code == 200) {
          this.initData();
        }
      });
    },
    modifyList(itemlist) {
      this.isModify = true;
      this.modelAdd = true;
      let address = __address.returnAddress(
        itemlist.provinceId,
        itemlist.cityId
      );
      this.addressProv = address.province;
      this.addressCity = address.city;
      this.addressArea = address.area;
      this.getAddress({ type: "community", id: itemlist.areaId }).then(res => {
        this.addressCommunity = res.data.list;
      });
      this.isloader = false;
      this.currItem = itemlist;
    },
    okList() {
      let isEmpty = false;
      this.currItem.streetName = this.getAddressName(
        this.addressCommunity,
        this.currItem.streetId
      );
      let pcaAdr =
        this.getAddressName(this.addressProv, this.currItem.provinceId) +
        this.getAddressName(this.addressCity, this.currItem.cityId) +
        this.getAddressName(this.addressArea, this.currItem.areaId);
      this.currItem.pcaAdr = pcaAdr;
      for (let curr in this.currItem) {
        if (
          this.currItem[curr] == "" &&
          curr != "communityId" &&
          curr != "appmodelId"
        ) {
          isEmpty = true;
          break;
        }
      }
      if (isEmpty) {
        this.$Message.error("请先完善小区信息");
        return;
      }
      let info = {
        areaId: this.currItem.areaId,
        cityId: this.currItem.cityId,
        communityName: this.currItem.communityName,
        location: this.currItem.location,
        streetName: this.currItem.streetName,
        streetId: this.currItem.streetId,
        provinceId: this.currItem.provinceId,
        pcaAdr: pcaAdr
      };
      if (this.isModify) {
        info.communityId = this.currItem.communityId;
        this.updataCommunity(info).then(res => {
          if (res.code == 200) {
            this.modelAdd = false;
            this.$Message.success("更新成功");
            this.initData();
          }
        });
      } else {
        this.saveCommunity(info).then(res => {
          if (res.code == 200) {
            this.modelAdd = false;
            this.$Message.success("添加成功");
            this.initData();
          }
        });
      }
    },
    initData() {
      this.getCommunityList(this.serchQuery).then(res => {
        if (res.code == 200) {
          this.currList = res.data.list;
          this.serchQuery.total = res.data.total;
        }
      });
    },
    toPage(page, type) {
      if (type == 1) {
        this.serchQuery.page = page;
      } else {
        this.serchQuery.size = page;
      }
      this.initData();
    },
    okCommunity() {
      let isEmpty = false;
      for (let item of this.addressCommunity) {
        if (!item.label) {
          isEmpty = true;
          break;
        }
      }
      if (isEmpty) {
        this.$Message.error("新增区域列有空值");
        return;
      }
      this.getDeliveryUpdateBatch(this.addressCommunity).then(res => {
        if (res.code == 200) {
          this.isArea = false;
          this.getAddress({ type: "community", id: this.currItem.areaId }).then(
            res => {
              this.addressCommunity = res.data.list;
              this.currItem.streetId = "";
            }
          );
        }
      });
    },
    btnNewCommunity() {
      this.addressCommunity.push({
        areaid: this.currItem.areaId,
        label: "",
        id: ""
      });
    },
    btnAddCommunity() {
      if (!this.currItem.areaId) {
        this.$Message.error("请先选择区县！！");
        return;
      }
      this.isArea = true;
      if (!this.addressCommunity.length) {
        this.addressCommunity.push({
          areaid: this.currItem.areaId,
          label: "",
          id: ""
        });
      }
    },
    selectChang(value, type, ob) {
      if (type == "prov" && value) {
        this.addressCity = __address.getCity(value);
        this.currItem.cityId = "";
        this.addressArea = [];
        this.currItem.areaId = "";
        this.addressCommunity = [];
        this.currItem.streetId = "";
      }
      if (type == "city" && value) {
        this.addressArea = __address.getArea(this.currItem.provinceId, value);
        this.currItem.areaId = "";
        this.addressCommunity = [];
        this.currItem.streetId = "";
      }
      if (type == "area" && value) {
        this.getAddress({ type: "community", id: value }).then(res => {
          this.addressCommunity = res.data.list;
          this.currItem.streetId = "";
        });
      }
    },
    onChang(value, type) {
      if (type) {
        if (value) {
          this.selectValue.push(type);
          this.selectValue = Array.from(new Set(this.selectValue));
        } else {
          this.selectValue.splice(this.selectValue.indexOf(type), 1);
        }
        this.seletAll = this.selectValue.length == this.currList.length;
      } else {
        if (this.seletAll) {
          this.selectValue = [];
          for (let item of this.currList) {
            this.selectValue.push(item.communityId);
          }
        } else {
          this.selectValue = [];
        }
      }
    },
    getAddressName(list, value) {
      let name = "";
      if (list.length > 0) {
        for (let item of list) {
          if (item.value == value) {
            name = item.label;
            break;
          }
        }
      }
      return name;
    },
    addVillage() {
      this.isModify = false;
      this.modelAdd = true;
      Object.keys(this.currItem).forEach(item => {
        this.currItem[item] = "";
      });
    },
    getLocation(value) {
      this.currItem.location = `${value.lat},${value.lng}`;
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
.business-scope {
  background-color: #fff;
  padding: 15px;
  margin-top: 10px;
  .serch {
    padding: 20px;
    background-color: #f8f8f8;
    table {
      width: 100%;
    }
    td {
      padding: 5px;
      button {
        margin-left: 60px;
      }
    }
  }

  .btn-line {
    padding: 20px 0;
  }

  .data-list {
    min-height: 500px;
    table {
      width: 100%;
      text-align: left;
      thead {
        td {
          height: 40px;
          background-color: #f6f8fa;
          font-size: 13px;
          font-weight: bold;
          padding: 5px 10px;
          border-bottom: 1px solid #f2f2f2;
          &:nth-child(1) {
            width: 1%;
          }
          &:last-child {
            width: 1%;
            white-space: nowrap;
            word-break: normal;
          }
        }
      }
      tbody {
        td {
          height: 50px;
          padding: 5px 10px;
          border-bottom: 1px solid #f2f2f2;
          &:nth-child(1) {
            width: 1%;
          }
          &:last-child {
            width: 1%;
            white-space: nowrap;
            word-break: normal;
            button {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .pages {
    display: flex;
    margin-top: 15px;
    justify-content: space-between;
    .page-btn {
      flex: 1;
      button {
        margin-right: 10px;
      }
    }
  }
}

.modelPub {
  .ivu-spin-fix {
    z-index: 8888 !important;
  }
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal {
      top: 0;
    }
  }
  .titles {
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
  .ivu-btn-large {
    padding: 0 10px;
  }
  .model-line {
    display: flex;
    padding: 5px 0;
    justify-content: flex-start;
    align-items: center;
    em {
      width: 80px;
    }
    .rights {
      width: 70%;
    }
    .select {
      display: flex;
      justify-content: space-between;
      .ivu-select-default {
        width: 32.5%;
      }
    }
    .btnadd {
      color: #2d8cf0;
      padding-left: 10px;
      cursor: pointer;
    }
  }
  .tab-line-item {
    padding: 5px 0;
    display: flex;
    align-items: center;
    .ivu-input-type {
      width: 95%;
      margin-right: 5px;
    }
    .Community-remove {
      cursor: pointer;
    }
  }
}
</style>


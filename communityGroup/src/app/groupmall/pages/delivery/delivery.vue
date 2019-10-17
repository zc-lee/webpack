<template>
  <div class="business-scope">
    <section class="serch">
      <table>
        <tr>
          <td>
            <span class="title">司机名称：</span>
            <Input v-model="serchQuery.driverName" placeholder="输入区域名称" style="width: 300px" />
          </td>
          <td>
            <span class="title">小区名称：</span>
            <Input v-model="serchQuery.communityName" placeholder="输入区域名称" style="width: 300px" />
          </td>
        </tr>
        <tr>
          <td>
            <span class="title">手机号码：</span>
            <Input v-model="serchQuery.driverPhone" placeholder="输入小区名称" style="width: 300px" />
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
      <Button @click="addVillage" type="primary">添加线路</Button><Button style="margin-left:10px;" @click="deleteList('')">批量删除</Button>
    </section>

    <section class="data-list">
      <section class="list-body">
        <section class="list-head">
          <div class="list-check">
            <Checkbox @on-change="onChangList('')" v-model="seletAll"></Checkbox>
          </div>
          <div class="list-cell">司机名称</div>
          <div class="list-cell">手机号</div>
          <div class="list-cell">分拣线路</div>
          <div class="list-cell flex1">配送小区</div>
          <div style="width:90px;" class="list-btn">操作</div>
        </section>
        <section v-for="(item, index) in list" :key="index" class="list-item">
          <div class="list-check">
            <Checkbox @on-change="(value)=>{return onChangList(value,item.lineId)}" v-model="selectList.indexOf(item['lineId'])>-1"></Checkbox>
          </div>
          <div class="list-cell">{{item.driverName}}</div>
          <div class="list-cell">{{item.driverPhone}}</div>
          <div class="list-cell">{{item.lineName}}</div>
          <div class="list-cell flex1">
            <span v-for="(child, index) in item.lineDetailResults" :key="index">{{index==0?'':"，"}}{{child.communityName}}</span>
          </div>
          <div style="width:90px;" class="list-btn">
            <Button size="small" @click="modifyList(item)" type="primary">编辑</Button>
            <Button size="small" @click="deleteList(item.lineId)" type="warning" ghost>删除</Button></div>
        </section>
      </section>
      <nav class="pages">
        <div class="page-btn">
          <Button @click="deleteList('')">批量删除</Button>
        </div>
        <Page :total="serchQuery.total" show-sizer @on-change="(page)=>{toPage(page,1)}" @on-page-size-change="(page)=>{toPage(page,2)}" />
      </nav>
    </section>

    <Modal v-model="isModelAdd" class="publicModel" :mask-closable="false" transfer="true">
      <div class="titles">编辑线路信息</div>
      <Steps :current="currStep">
        <Step title="基本信息"></Step>
        <Step title="选择小区"></Step>
      </Steps>
      <section v-if="currStep==1" class="list-line">
        <div class="line-item">
          <div class="lefts">线路名称：</div>
          <div class="rights">
            <Input v-model="currItem.lineName" placeholder=""></Input>
          </div>
        </div>
        <div class="line-item">
          <div class="lefts">司机名称：</div>
          <div class="rights">
            <Input v-model="currItem.driverName" placeholder=""></Input>
          </div>
        </div>
        <div class="line-item">
          <div class="lefts">手机号码：</div>
          <div class="rights">
            <Input v-model="currItem.driverPhone" placeholder=""></Input>
          </div>
        </div>
        <div class="line-item">
          <div class="lefts">地区选择：</div>
          <div class="rights">
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
      </section>
      <section v-if="currStep==2" class="aera-black">
        <div class="check-all">
          <div>选择小区：</div>
          <div>
            <Checkbox :indeterminate="indeterminate" :value="isCommunityAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
          </div>
        </div>
        <section class="commity-list">
          <checkbox-group @on-change="(value)=>{itemSelect(value)}" v-model="currItem.communityList">
            <Poptip v-for="(item, index) in addressCommunity" :class="{'isShowTip':item.list.length==0}" :key="index" trigger="hover" placement="bottom">
              <span>
                <checkbox :label="item.value">{{item.label}}</checkbox>
              </span>
              <div style="padding:3px;" slot="content">
                <div style="border-bottom:1px solid #eee;margin-bottom:10px;padding-bottom:5px;">{{item.label}}({{item.list.length}})</div>
                <div style="cursor:pointer;" class="check-box">
                  <div class="check-list" v-for="(child, index) in item.list" :key="index" >
                    <input type="checkbox" :id="'checkbox'+index" @click="childSelect(child['communityId'],item,child)" v-model="child.isCheck" />
                    <label :for="'checkbox'+index">{{child['communityName']}}</label>
                  </div>
                </div>
              </div>
            </Poptip>
          </checkbox-group>
        </section>
      </section>
      <div slot="footer">
        <Button v-if="currStep==1" @click="isModelAdd=false">取消</Button>
        <Button v-if="currStep==1" @click="next(0)" type="primary">下一步</Button>
        <Button v-if="currStep!=1" @click="currStep=1">上一步</Button>
        <Button v-if="currStep!=1" @click="next(1)" type="primary">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapActions } from "vuex";
import __address from "../../../../config/city.js";
export default {
  data() {
    return {
      list: [],
      isModelAdd: false,
      currStep: 1,
      addressProv: __address.getProvince(),
      addressCity: [],
      addressArea: [],
      isCommunityAll: false,
      addressCommunity: [],
      indeterminate: false,
      selectList: [],
      seletAll: false,
      childList: [],
      isModify: false,
      serchQuery: {
        total: 0,
        size: "10",
        page: "1",
        lineId: "",
        driverPhone: "",
        driverName: "",
        communityName: ""
      },
      currItem: {
        lineName: "",
        communities: [],
        driverName: "",
        driverPhone: "",
        lineId: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        communityList: []
      }
    };
  },
  methods: {
    ...mapActions([
      "getAddress",
      "getAllAddress",
      "saveLine",
      "getLineList",
      "deleteLine",
      "updataLine"
    ]),
    initData() {
      this.getLineList(this.serchQuery).then(res => {
        if (res.code == 200) {
          this.list = res.data.list;
          this.serchQuery.total = res.data.total;
          this.list.forEach(item => {
            item.communities = [];
            item.communityList = [];
            if (item.lineDetailResults.length > 0) {
              item.lineDetailResults.forEach(child => {
                item.communities.push(child.communityId.toString());
                item.communityList.push(child.streetId.toString());
              });
            }
            item.communityList = Array.from(new Set(item.communityList));
          });
          //vue 多层嵌套数组改变值
          this.list = this.deepClone(this.list);
        }
      });
    },
    modifyList(itemlist) {
      this.currItem = null;
      this.currStep = 1;
      this.isModify = true;
      this.isModelAdd = true;
      let address = __address.returnAddress(
        itemlist.provinceId,
        itemlist.cityId
      );
      this.addressProv = address.province;
      this.addressCity = address.city;
      this.addressArea = address.area;
      this.getAddress({ type: "community", id: itemlist.areaId }).then(res => {
        this.addressCommunity = res.data.list;
        this.addressCommunity.forEach(item => {
          item.child = [];
          item.list.forEach(child => {
            if (
              itemlist.communities.indexOf(child.communityId.toString()) > -1
            ) {
              item.child.push(child.communityId.toString());
              child.isCheck = true;
            }
          });
        });
      });
      this.isloader = false;
      // this.currItem = itemlist;
      this.currItem = this.deepClone(itemlist);
    },
    deleteList(id) {
      this.deleteLine({
        lineIds: id || this.selectList.join(",")
      }).then(res => {
        if (res.code == 200) {
          this.initData();
        }
      });
    },
    onChangList(value, type) {
      if (type) {
        if (value) {
          this.selectList.push(type);
          this.selectList = Array.from(new Set(this.selectList));
        } else {
          this.selectList.splice(this.selectList.indexOf(type), 1);
        }
        this.seletAll = this.selectList.length == this.list.length;
      } else {
        if (this.seletAll) {
          this.selectList = [];
          for (let item of this.list) {
            this.selectList.push(item.lineId);
          }
        } else {
          this.selectList = [];
        }
      }
    },
    addVillage() {
      this.isModify = false;
      this.isModelAdd = true;
    },
    selectChang(value, type, ob) {
      if (type == "prov" && value) {
        this.addressCity = __address.getCity(value);
        this.currItem.cityId = "";
        this.addressArea = [];
        this.currItem.areaId = "";
        this.addressCommunity = [];
      }
      if (type == "city" && value) {
        this.addressArea = __address.getArea(this.currItem.provinceId, value);
        this.currItem.areaId = "";
        this.addressCommunity = [];
      }
      if (type == "area" && value) {
        this.getAddress({ type: "community", id: value }).then(res => {
          this.addressCommunity = res.data.list;
          this.addressCommunity.forEach(item => {
            item.child = [];
          });
        });
      }
    },
    toPage(page, type) {
      if (type == 1) {
        this.serchQuery.page = page;
      } else {
        this.serchQuery.size = page;
      }
      this.initData();
    },
    handleCheckAll(check) {
      //街道全选事件
      if (this.indeterminate) {
        this.isCommunityAll = false;
      } else {
        this.isCommunityAll = !this.isCommunityAll;
      }
      this.indeterminate = false;
      if (this.isCommunityAll) {
        //全选 后，相应街道ID 添加进去
        this.addressCommunity.forEach(value => {
          this.currItem.communityList.push(value.value);
          value.child = [];
          value.list.forEach(item => {
            item.isCheck = true;
            this.currItem.communities.push(item.communityId.toString());
            value.child.push(item.communityId.toString());
          });
        });
      } else {
        //清空所有街道与小区
        this.currItem.communityList = [];
        this.addressCommunity.forEach(value => {
          value.list.forEach(item => {
            item.isCheck = false;
          });
        });
      }
    },
    itemSelect(list) {
      this.addressCommunity.forEach(value => {
        if (list.indexOf(value.value) > -1) {
          value.list.forEach(item => {
            item.isCheck = true;
            // 选中街道后--- 添加街道下面的所有小区
            value.child.push(item.communityId.toString());
            // this.$set(this.addressCommunity, value);
          });
        } else {
          value.list.forEach(item => {
            //取消选中后 清空下面的所有小区
            value.child = [];
            item.isCheck = false;
            // value.child.push(item.communityId.toString());
            // this.$set(this.addressCommunity,value.child,value.child);
          });
        }
      });
    },
    childSelect(value, item, child) {
      //小区选中后事件
      if (!child.isCheck) {
        item.child.push(value.toString());
        item.child = Array.from(new Set(item.child));
        // this.$set(this.addressCommunity,item.child,item.child);
        if (item.child.length > 0) {
          //当有一个小区选中后，把街道ID push进去
          this.currItem.communityList.push(item.value.toString());
          this.currItem.communityList = Array.from(
            new Set(this.currItem.communityList)
          );
        }
      } else {
        if (item.child.indexOf(value.toString()) > -1) {
          item.child.splice(item.child.indexOf(value.toString()), 1);
          // this.$set(this.addressCommunity,item.child,item.child);
        }
      }
      //当小区全部未选中后 街道相应ID删除
      if (
        this.currItem.communityList.indexOf(item.value.toString()) > -1 &&
        item.child.length < 1
      ) {
        this.currItem.communityList.splice(
          this.currItem.communityList.indexOf(item.value.toString()),
          1
        );
      }
    },
    deepClone(obj) {
      let objClone = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === "object") {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") {
              objClone[key] = this.deepClone(obj[key]);
            } else {
              objClone[key] = obj[key];
            }
          }
        }
      }
      return objClone;
    },
    next(type) {
      var mod = this.deepClone(this.addressCommunity);
      this.currItem.communities = [];
      let curr = [];
      mod.forEach(item => {
        item.child.forEach(v => {
          curr.push(v);
        });
      });
      this.currItem.communities = curr;
      let vaild = {
        lineName: ["线路名称不能为空"],
        driverName: ["司机名称不能为空"],
        driverPhone: ["手机号码不能为空"],
        provinceId: ["请选择省份"],
        cityId: ["请选择城市"],
        areaId: ["请选择区县"],
        communities: [, "请选择小区"],
        communityList: [, "请选择小区"]
      };
      let setpOne = false;
      for (let item in this.currItem) {
        if (
          typeof this.currItem[item] === "string" &&
          type == 0 &&
          !this.currItem[item] &&
          vaild[item]
        ) {
          setpOne = true;
          this.$Message.error(vaild[item][type]);
          break;
        }
        if (
          typeof this.currItem[item] != "string" &&
          this.currItem[item].length == 0 &&
          type == 1
        ) {
          setpOne = true;
          this.$Message.error(vaild[item][type]);
          break;
        }
      }
      if (setpOne) {
        return;
      }
      if (type == 0) {
        this.currStep = 2;
      }

      if (type == 1 && !this.isModify) {
        this.saveLine(this.currItem).then(res => {
          if (res.code == 200) {
            this.$Message.success("添加成功");
            this.isModelAdd = false;
            this.initData();
          }
        });
      }

      if (type == 1 && this.isModify) {
        this.updataLine(this.currItem).then(res => {
          if (res.code == 200) {
            this.$Message.success("修改成功");
            this.isModelAdd = false;
            this.initData();
          }
        });
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
.publicModel {
  .ivu-steps {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    .ivu-steps-item {
      &:last-child {
        width: auto !important;
      }
    }
  }
  .list-line {
    padding: 0 30px;
    .line-item {
      display: flex;
      margin-bottom: 15px;
      align-items: center;
      .rights {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .ivu-select {
          width: 33%;
        }
      }
    }
  }
  .aera-black {
    .check-all {
      display: flex;
      padding: 0 25px;
    }
    .commity-list {
      min-height: 150px;
      margin: 10px 0;
      padding: 0 25px;
      .check-box {
        display: flex;
        padding-bottom: 10px;
        max-width: 300px;
        .check-list {
          display: flex;
          align-items: center;
          margin-right: 10px;
          cursor: pointer;
          input {
            background-color: #fafafa;
            border: 1px solid #cacece;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
              inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
            padding: 9px;
            border-radius: 3px;
            display: inline-block;
            position: relative;
          }
        }
      }

      .isShowTip {
        .ivu-poptip-popper {
          display: none !important;
        }
      }
      .ivu-poptip {
        border: 1px solid #eee;
        padding: 5px 10px;
        margin-top: 1px;
        min-width: 105px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .ivu-poptip-inner {
          box-shadow: 0 0 20px #888;
        }
      }
    }
  }
}
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
    .list-head,
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
    .list-item {
      background-color: #fff;
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
</style>


<template>
  <div class="custom-scope">
    <section class="serch">
      <table>
        <tr>
          <td>
            <span class="title">供应商名称：</span>
            <Input v-model="serchQuery.providerName" placeholder="输入供应商名称" style="width: 160px" />
          </td>
          <td>
            <span class="title">供应商手机号：</span>
            <Input v-model="serchQuery.providerPhone" placeholder="输入供应商手机号" style="width: 160px" />
          </td>
          <td>
            <span class="title">ID：</span>
            <Input v-model="serchQuery.providerId" placeholder="输入供应商ID" style="width: 160px" />
          </td>
        </tr>
        <tr>
          <td>
            <span class="title"></span>
            <Button @click="initData" type="primary">搜 索</Button>
          </td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </section>

    <ul class="serch-type">
      <li @click="selectType(1)" :class="{'active':serchQuery.searchType=='1'}"><span>供货商管理</span></li>
      <li @click="selectType(3)" :class="{'active':serchQuery.searchType=='3'}"><span>待审核</span></li>
      <li @click="selectType(4)" :class="{'active':serchQuery.searchType=='4'}"><span>已关闭</span></li>
      <li @click="selectType(2)" :class="{'active':serchQuery.searchType=='2'}"><span>禁用中</span></li>
    </ul>

    <section class="btn-line">
      <Button @click="addVillage(2)" type="primary">新 增</Button><Button style="margin-left:10px;" @click="deleteList('')">批量删除</Button>
    </section>

    <section class="data-list">
      <section class="list-body">
        <section class="list-head">
          <div class="list-check">
            <Checkbox @on-change="onChangList('')" v-model="seletAll"></Checkbox>
          </div>
          <div style="width:120px" class="list-cell">供应商名称</div>
          <div style="width:120px" class="list-cell">手机号</div>
          <div style="width:150px" class="list-cell">地区</div>
          <div class="list-cell">产品类目</div>
          <div v-if="serchQuery.searchType!='3'" style="width:90px;" class="list-cell">评价</div>
          <div class="list-cell flex1">供应商地址</div>
          <div style="width:110px;" class="list-btn">操作</div>
        </section>
        <!-- <section v-for="(item, index) in list" :key="index" class="list-item">
          <div class="list-check">
            <Checkbox @on-change="(value)=>{return onChangList(value,item.id)}" v-model="selectList.indexOf(item['id'])>-1"></Checkbox>
          </div>

        </section> -->
        <section v-for="(item, index) in list" :key="index" class="list-item">
          <div class="list-check">
            <Checkbox @on-change="(value)=>{return onChangList(value,item.providerId)}" v-model="selectList.indexOf(item['providerId'])>-1"></Checkbox>
            <div class="check-item">ID：{{item.providerId}}</div>
            <div class="check-item">申请时间：{{item.createTime}}</div>
          </div>
          <div class="list-line">
            <div style="width:150px" class="list-cell">
              {{item.providerName}}
            </div>
            <div style="width:120px" class="list-cell">
              {{item.providerPhone}}
            </div>
            <div style="width:150px" class="list-cell">
              {{item.addressName}}
            </div>
            <div class="list-cell">
              {{item.goodsClass}}
            </div>
            <div v-if="serchQuery.searchType!='3'" style="width:90px;" class="list-cell ">
              {{item.grade}}
            </div>
            <div class="list-cell flex1">
              {{item.providerAddress}}
            </div>
            <div v-if="serchQuery.searchType=='1'" style="width:110px;" class="list-cell">
              <span @click="addVillage(3,item)" style="cursor:pointer;color:#2d8cf0;">编辑</span>
              <Dropdown trigger="click" style="margin-left:10px;" placement="bottom-start">
                <span style="cursor:pointer;">更多<Icon type="ios-arrow-down"></Icon></span>
                <DropdownMenu slot="list">
                  <li>查看</li>
                  <li @click="setStatus(1,item.providerId,0)">禁用</li>
                  <li @click="deleteList(item.providerId)">删除</li>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div v-if="serchQuery.searchType=='3'" style="width:110px;" class="list-cell">
              <Dropdown trigger="click" style="margin-left:10px;" placement="bottom-start">
                <span style="cursor:pointer;">审核<Icon type="ios-arrow-down"></Icon></span>
                <DropdownMenu slot="list">
                  <li @click="addVillage(1,item)">同意</li>
                  <li @click="addVillage(0,item)">拒绝</li>
                  <li @click="deleteList(item.providerId)">删除</li>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div v-if="serchQuery.searchType=='4'" style="width:110px;" class="list-cell">
              <span style="cursor:pointer;color:#2d8cf0;">删除</span>
            </div>
            <div v-if="serchQuery.searchType=='2'" style="width:110px;" class="list-cell">
              <span @click="addVillage(3,item)" style="cursor:pointer;color:#2d8cf0;">编辑</span>
              <Dropdown trigger="click" style="margin-left:10px;" placement="bottom-start">
                <span style="cursor:pointer;">更多<Icon type="ios-arrow-down"></Icon></span>
                <DropdownMenu slot="list">
                  <li>查看</li>
                  <li @click="setStatus(1,item.providerId,1)">启用</li>
                  <li @click="deleteList(item.providerId)">删除</li>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </section>
      </section>
      <nav class="pages">
        <div class="page-btn">
          <Button @click="deleteList('')">批量删除</Button>
        </div>
        <Page :total="serchQuery.total" show-sizer @on-change="(page)=>{toPage(page,1)}" @on-page-size-change="(page)=>{toPage(page,2)}" />
      </nav>
    </section>

    <Modal v-model="isModelAdd" class="customModel" :mask-closable="false" transfer="true">
      <div class="titles">编辑供应商信息</div>
      <section class="list-line">
        <div class="line-item">
          <div class="lefts">供应商名称：</div>
          <div class="rights">
            <Input v-model="currItem.providerName" maxlength="50" placeholder="输入供应商名称"></Input>
          </div>
        </div>
        <div class="line-item">
          <div class="lefts">手机号码：</div>
          <div class="rights">
            <Input v-model="currItem.providerPhone" maxlength="11" placeholder="输入手机号码"></Input>
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
        <div class="line-item">
          <div class="lefts">供应商地址：</div>
          <div class="rights">
            <Input v-model="currItem.providerAddress" placeholder="输入供应商地址"></Input>
          </div>
        </div>
        <div class="line-item">
          <div class="lefts">产品说明：</div>
          <div class="rights">
            <Input v-model="currItem.goodsClass" type="textarea" placeholder="输入产品说明"></Input>
          </div>
        </div>
      </section>
      <div slot="footer">
        <Button @click="isModelAdd=false">取消</Button>
        <Button @click="okBtn" type="primary">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapActions } from "vuex";
import __address from "../../../../config/city.js";
import { isMobile } from "lib/validator.js";
export default {
  data() {
    return {
      list: [],
      isModelAdd: false,
      addressProv: __address.getProvince(),
      addressCity: [],
      addressArea: [],
      selectList: [],
      seletAll: false,
      childList: [],
      isModify: false,
      serchQuery: {
        total: 0,
        pageSize: "10",
        pageNum: "1",
        providerId: "",
        providerPhone: "",
        providerName: "",
        searchType: "1"
      },
      currItem: {
        providerName: "",
        providerArea: "",
        providerPhone: "",
        providerAddress: "",
        goodsClass: "",
        id: "0",
        provinceId: "",
        cityId: "",
        areaId: "",
        optionType: ""
      }
    };
  },
  methods: {
    ...mapActions(["saveCustom", "getCustom", "deleteCustom", "statusCustom"]),
    setStatus(type, id, status) {
      if (type == 1) {
        this.$Modal.confirm({
          title: "提示",
          content: `确定要${status == 0 ? "禁用" : "启用"}吗`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            this.statusCustom({ id: id, optionType: status }).then(res => {
              if (res.code == 200) {
                this.initData();
              }
            });
          }
        });
      }
    },
    selectType(type) {
      this.serchQuery.searchType = type;
      this.initData();
    },
    okBtn() {
      let isNext = false;
      let vaild = {
        providerName: "供应商名称不为空",
        provinceId: "请选择省份",
        cityId: "请选择城市",
        areaId: "请选择区县",
        providerPhone: ["手机号码不为空", "手机号码格式错误"],
        providerAddress: "供应商地址不为空"
      };
      for (let item in this.currItem) {
        if (Object.keys(vaild).indexOf(item) > -1 && !this.currItem[item]) {
          this.$Message.error(
            typeof vaild[item] == "string" ? vaild[item] : vaild[item][0]
          );
          isNext = true;
          break;
        }
      }
      if (isNext) return;
      if (!isMobile(this.currItem.providerPhone)) {
        this.$Message.error(vaild["providerPhone"][1]);
        return;
      }
      let pcaAdr =
        __address.getAddressName(this.addressProv, this.currItem.provinceId) +
        __address.getAddressName(this.addressCity, this.currItem.cityId) +
        __address.getAddressName(this.addressArea, this.currItem.areaId);
      let providerArea = {
        provinceId: this.currItem.provinceId,
        areaId: this.currItem.areaId,
        cityId: this.currItem.cityId,
        addressName: pcaAdr
      };
      this.currItem.providerArea = JSON.stringify(providerArea);
      this.saveCustom(this.currItem).then(res => {
        if (res.code == 200) {
          this.isModelAdd = false;
          this.initData();
        }
      });
    },
    initData() {
      this.getCustom(this.serchQuery).then(res => {
        if (res.code == 200) {
          this.list = res.data.list;
          this.serchQuery.total = res.data.total;
          this.list.forEach(item => {
            if (item.providerArea) {
              Object.assign(item, JSON.parse(item.providerArea));
            }
          });
        }
      });
    },
    modifyList(itemlist) {
      this.isModelAdd = true;
    },
    deleteList(id) {
      this.$Modal.confirm({
        title: "提示",
        content: `确定要删除吗`,
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.deleteCustom({
            ids: id || this.selectList.join(",")
          }).then(res => {
            if (res.code == 200) {
              this.initData();
            }
          });
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
            this.selectList.push(item.providerId);
          }
        } else {
          this.selectList = [];
        }
      }
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
      }
    },
    addVillage(type, item) {
      this.currItem.optionType = type;
      if (type == 0) {
        this.$Modal.confirm({
          title: "提示",
          content: `确定要拒绝吗`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            this.currItem.id=item.providerId;
            this.saveCustom(this.currItem).then(res => {
              if (res.code == 200) {
                this.isModelAdd = false;
                this.initData();
              }
            });
          }
        });
        return;
      }
      this.isModelAdd = true;
      if (item) {
        this.addressProv = __address.getProvince();
        this.addressCity = __address.getCity(item.provinceId);
        this.addressArea = __address.getArea(item.provinceId, item.cityId);
        this.currItem = this.global.deepClone(item);
        this.currItem.id = this.currItem.providerId;
      } else {
        this.currItem = {
          providerName: "",
          providerArea: "",
          providerPhone: "",
          providerAddress: "",
          goodsClass: "",
          id: "0",
          provinceId: "",
          cityId: "",
          areaId: "",
          optionType: ""
        };
      }
      this.currItem.optionType = type;
    },
    toPage(page, type) {
      if (type == 1) {
        this.serchQuery.pageNum = page;
      } else {
        this.serchQuery.pageSize = page;
      }
      this.initData();
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less">
.customModel {
  .list-line {
    padding: 0 30px;
    .line-item {
      display: flex;
      margin-bottom: 15px;
      align-items: flex-start;
      .lefts {
        width: 80px;
        text-align: right;
        line-height: 30px;
      }

      .rights {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .ivu-select {
          width: 33%;
        }
        .ivu-input-type {
          textarea {
            height: 80px;
          }
        }
      }
    }
  }
}
.custom-scope {
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
        margin-left: 72px;
      }
    }
  }

  .serch-type {
    display: flex;
    height: 40px;
    border-bottom: 1px solid #eee;
    margin-top: 10px;
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

  .btn-line {
    padding: 10px 0;
  }

  .data-list {
    min-height: 500px;
    .list-head,
    .list-line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f2f2f2;
      border-bottom: 1px solid #f2f2f2;
      .list-btn {
        // text-align: center;
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
        padding: 10px 10px;
        width: 15%;
        // text-align: center;
      }
    }
    .list-item {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .list-check {
        width: 100%;
        padding: 5px;
        padding-left: 10px;
        background-color: #f1f2f3;
        margin-top: 10px;
        display: flex;
        .check-item {
          margin-left: 15px;
          color: #888;
        }
      }
      .list-line {
        background-color: #fff;
        border-left: 1px solid #e9f3fb;
        // border-right: #e9f3fb 1px solid;
        // min-height: 80px;
        width: 100%;
        align-items: inherit;
        .list-cell {
          word-wrap: break-word;
          word-break: break-all;
          border-right: #e9f3fb 1px solid;
          .ivu-select-dropdown {
            width: 60px !important;
            .ivu-dropdown-menu {
              min-width: auto !important;
              li {
                cursor: pointer;
                text-align: center;
                line-height: 23px;
                &:hover {
                  color: #2d8cf0;
                }
              }
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
</style>


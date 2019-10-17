<template>
  <div class="business-scope">

    <section class="btn-line">
      <Button @click="btnAdd" type="primary">添加类别</Button><Button style="margin-left:10px;" @click="deleteList('')">批量删除</Button>
    </section>

    <section class="data-list">
      <section class="list-body">
        <section class="list-head">
          <div class="list-check">
            <Checkbox @on-change="onChangList('')" v-model="seletAll"></Checkbox>
          </div>
          <div class="list-cell">类别名称</div>
          <div class="list-cell flex1">下级类别</div>
          <div style="width:90px;" class="list-btn">操作</div>
        </section>
        <section v-for="(item, index) in list" :key="index" class="list-item">
          <div class="list-check">
            <Checkbox @on-change="(value)=>{return onChangList(value,item.goodsClassId)}" v-model="selectList.indexOf(item['goodsClassId'])>-1"></Checkbox>
          </div>
          <div class="list-cell">{{item.goodsClassName}}</div>
          <div class="list-cell flex1">
            <span v-for="(child, index) in item.classTwos" :key="index">{{index==0?'':"，"}}{{child.goodsClassName}}</span>
          </div>
          <div style="width:90px;" class="list-btn">
            <Button size="small" @click="modifyList(item)" type="primary">编辑</Button>
            <Button size="small" @click="deleteList(item.goodsClassId)" type="warning" ghost>删除</Button></div>
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
      <div class="titles">编辑商品类别</div>
      <div style="margin-top:20px;" class="model-line">
        <em>大类名称：</em>
        <div class="rights">
          <Input v-model="currItem.goodsClassName" style="width:210px" placeholder="请输入" />
        </div>
      </div>
      <div class="model-line">
        <em>下级分类：</em>
        <div class="rights">
          <table>
            <thead>
              <tr>
                <td>下级分类名称</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in currItem.classTwos" :key="index">
                <td><Input v-model="item.goodsClassName" style="width:200px;" placeholder="请输入"></Input></td>
                <td><span style="color:#e96900;cursor:pointer;" @click="btnDelClass(item.goodsClassId,index)">删除</span></td>
              </tr>
            </tbody>
          </table>
          <div @click="btnAddClass" class="small-add">新增下级分类</div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="isModelAdd=false">取消</Button>
        <Button @click="btnSave" type="primary">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      isModelAdd: false,
      selectList: [],
      seletAll: false,
      serchQuery: {
        total: 0,
        size: "10",
        page: "1"
      },
      currItem: {
        fatherId: "0",
        goodsClassName: "",
        goodsClassId: "-1",
        classTwos: [
          {
            goodsClassId: "-1",
            fatherId: "0",
            goodsClassName: ""
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["saveClass", "getClass", "deleteClass"]),
    btnAddClass() {
      this.currItem.classTwos.push({
        goodsClassId: "-1",
        fatherId: "0",
        goodsClassName: ""
      });
    },
    btnDelClass(id, index) {
      if (id > 0 && index) {
        this.deleteClass({ goodsClassId: id }).then(res => {
          if (res.code == 200) {
            this.initData();
            this.currItem.classTwos.splice(index, 1);
          }
        });
      }
      if (id < 0 && index) {
        this.currItem.classTwos.splice(index, 1);
      }
      if (id > 0 && !index) {
        this.deleteClass({ goodsClassId: id }).then(res => {
          if (res.code == 200) {
            this.initData();
          }
        });
      }
    },
    btnSave() {
      let isEmp = false;
      if (!this.currItem.goodsClassName) {
        this.$Message.error("大类名称不能为空！");
        return;
      }
      for (let item of this.currItem.classTwos) {
        if (!item.goodsClassName) {
          this.$Message.error("下级类别名称不能为空！");
          isEmp = true;
          break;
        }
      }
      if (isEmp) return;
      this.saveClass(this.currItem).then(res => {
        if (res.code == 200) {
          this.$Message.success("保存存功！");
          this.initData();
          this.isModelAdd = false;
        }
      });
    },
    btnAdd() {
      this.isModelAdd = true;
      this.currItem = {
        fatherId: "0",
        goodsClassName: "",
        goodsClassId: "-1",
        classTwos: [
          {
            goodsClassId: "-1",
            fatherId: "0",
            goodsClassName: ""
          }
        ]
      };
    },
    // ...mapActions([]),
    initData() {
      this.getClass({}).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          // this.serchQuery.total = res.data.total;
        }
      });
    },
    modifyList(itemlist) {
      this.currItem = this.global.deepClone(itemlist);
      this.isModelAdd = true;
      this.initData();
    },
    deleteList(id) {
      this.deleteClass({
        goodsClassId: id || this.selectList.join(",")
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
            this.selectList.push(item.goodsClassId);
          }
        } else {
          this.selectList = [];
        }
      }
    },
    addVillage() {
      this.isModelAdd = true;
    },

    toPage(page, type) {
      if (type == 1) {
        this.serchQuery.page = page;
      } else {
        this.serchQuery.size = page;
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
.publicModel {
  .ivu-modal {
    width: 420px !important;
  }
  .ivu-modal-body {
    padding-bottom: 0 !important;
  }
  .model-line {
    display: flex;
    padding: 5px 0;
    justify-content: flex-start;
    align-items: flex-start;
    em {
      padding-top: 5px;
      width: 90px;
      text-align: right;
    }
    .rights {
      width: 75%;
      .prev-img,
      .small-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 78px;
        height: 78px;
        border: 1px dashed #ddd;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }
      .small-img {
        width: 45px;
        height: 45px;
      }
      .demo-upload-list,
      .small-upload-list {
        display: inline-block;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        margin-right: 4px;
      }
      .small-upload-list {
        width: 45px;
        height: 45px;
        margin-left: 15px;
      }
      .demo-upload-list img {
        width: 80px;
        height: 80px;
      }
      .small-upload-list img {
        width: 45px;
        height: 45px;
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
      .demo-upload-list:hover,
      .small-upload-list:hover {
        .demo-upload-list-cover {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
      table {
        width: 100%;
        border: 1px solid #f2f2f2;
        thead {
          tr td {
            background-color: #f6f6f6;
            padding: 5px 10px;
          }
        }
        tbody {
          tr td {
            padding: 5px 10px;
            border-bottom: 1px solid #f2f2f2;
          }
        }
      }
      .small-add {
        line-height: 30px;
        cursor: pointer;
        color: #2d8cf0;
      }
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
    min-height: 800px !important;
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


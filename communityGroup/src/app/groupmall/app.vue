<template>
  <div class="__groupmall">
    <header class="headers">
      <div class="headers-body">
        <div class="logo"><img src="./assets/logo.png" alt="">
        </div>
        <div class="head"></div>
        <Dropdown trigger="click" style="cursor:pointer;margin-left:20px;">
          <span>
            张美美
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <DropdownMenu slot="list">
            <DropdownItem>驴打滚</DropdownItem>
            <DropdownItem>炸酱面</DropdownItem>
            <DropdownItem>豆汁儿</DropdownItem>
            <DropdownItem>冰糖葫芦</DropdownItem>
            <DropdownItem>北京烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
    <section class="__groupmall-body">
      <section class="body-left">
        <div class="left-logo">
          <div class="logos">
            <span></span>
          </div>
          <Dropdown trigger="click">
            <span class="dro-title">
              超级棱镜程序体验
              <Icon type="ios-arrow-down"></Icon>
            </span>
            <DropdownMenu slot="list">
              <div class="">rq23rq23rq</div>
              <div class="">rq23rq23rq</div>
              <div class="">rq23rq23rq</div>
              <div class="">rq23rq23rq</div>
            </DropdownMenu>
          </Dropdown>
        </div>

        <section class="mume">
          <Row>
            <Col>
            <Menu @on-open-change="onOpenChange" :theme="theme2" ref="memu" width='auto' accordion>
              <div v-for="(item,index) in mume" :key="index">
                <MenuItem @click.native="onSelect(item)" class="nochild" v-if="!item.children" :name="index">
                <Icon :type="item.icon" />
                <span>{{item.meta.title}}</span>
                </MenuItem>
                <Submenu v-if="item.children && item.children.length>0" :class="{'item-title':item.children==undefined}" :name="index">
                  <template slot="title">
                    <Icon :type="item.icon" />
                    <span>{{item.meta.title}}</span>
                  </template>
                  <MenuItem @click.native="onSelect(item,child)" v-for="(child,curr) in item.children" :key="curr" :name="index+'-'+curr">{{child.meta.title}}</MenuItem>
                </Submenu>
              </div>
            </Menu>
            </Col>
          </Row>
        </section>

      </section>
      <section class="body-right">
        <section class="breadcrumb">
          <Breadcrumb>
            <span v-for="(bread) in currbread" :key="bread">
              <BreadcrumbItem v-if="bread.isChild" :to="bread.path">{{bread.title}}</BreadcrumbItem>
              <BreadcrumbItem v-if="!bread.isChild">{{bread.title}}</BreadcrumbItem>
            </span>
          </Breadcrumb>
        </section>
        <router-view />
      </section>
    </section>
  </div>
</template>
<script>
import { memus } from "./router.js";
export default {
  data() {
    return {
      visible: false,
      mume: [],
      currbread: [],
      selectItem: ""
    };
  },
  methods: {
    init() {
      this.mume = JSON.parse(JSON.stringify(memus));
    },
    onSelect(item, child) {
      this.currbread = [];
      if (child) {
        this.$router.push({ name: child.name });
        this.currbread.push({
          path: item.path,
          title: item.meta.title,
          isChild: true
        });
        this.currbread.push({
          path: child.path,
          title: child.meta.title,
          isChild: false
        });
      } else {
        this.$router.push(item.path);
        this.currbread.push({
          path: item.path,
          title: item.meta.title,
          isChild: false
        });
      }
      console.log("//////");
      console.log(this.currbread);
    },
    onOpenChange(name) {
      // this.$refs.memu.updateOpened();
    }
  },
  created() {
    this.init();
    // debugger;
  },
  mounted() {
    let routerName = window.location.hash.substring(1);
    let routerName2 = window.location.hash.substring(2);

    this.mume.forEach(item => {
      if (item.children) {
        item.children.forEach(v => {
          if (v.path == routerName) {
            this.currbread.push({
              isChild: true,
              path: item.path,
              title: item.meta.title
            });
            this.currbread.push({
              isChild: false,
              path: v.path,
              title: v.meta.title
            });
          }
        });
      } else {
        if (item.path == routerName2) {
          this.currbread.push({
            isChild: false,
            path: item.path,
            title: item.meta.title
          });
        }
      }
    });
  }
};
</script>
<style lang="less">
.publicModel {
  .ivu-modal-body {
    padding-bottom: 0 !important;
  }
  .ivu-modal-footer {
    border-top: 0 !important;
  }
  .titles {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 15px;
  }
}
.__groupmall {
  .headers {
    height: 60px;
    background-color: #fff;
    .headers-body {
      width: 1190px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      .logo {
        height: 60px;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          height: 30px;
        }
      }
      .head {
        height: 40px;
        width: 40px;
        background-color: #f2f2f2;
        border-radius: 40px;
      }
    }
  }
  .__groupmall-body {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    padding-bottom: 40px;
    display: flex;
    .body-left {
      width: 180px;
      background-color: #fff;
      margin-right: 10px;
      text-align: center;
      .left-logo {
        height: 200px;
        .logos {
          height: 140px;
          padding-top: 40px;
          text-align: center;
          span {
            display: inline-block;
            width: 80px;
            height: 80px;
            background-image: url("./assets/memu-logo.png");
            background-size: 100%;
          }
        }
        .ivu-dropdown {
          width: 180px;
          cursor: pointer;
          .dro-title {
            font-size: 14px;
            font-weight: bold;
          }
        }
        .ivu-select-dropdown {
          border-radius: 0 !important;
          box-shadow: none !important;
          z-index: 1111 !important;
        }
      }

      .mume {
        .item-title {
          .ivu-menu-submenu-title {
            :nth-child(3) {
              display: none !important;
            }
          }
        }
        .ivu-menu-item-selected {
          &::after {
            right: auto !important;
            left: 0;
          }
        }
        .ivu-menu-vertical {
          &:after {
            display: none;
          }
        }
        .ivu-menu-submenu-title {
          .ivu-icon {
            font-size: 16px;
            color: #5ba5df;
            font-weight: bold;
          }
          padding: 14px 15px !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .ivu-menu-submenu-title-icon {
            top: 0 !important;
          }
          span {
            flex: 1;
            text-align: left;
            margin-left: 10px;
          }
        }
        .ivu-menu-item {
          padding: 14px 15px !important;
        }
        .nochild {
          padding: 14px 15px !important;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            flex: 1;
            text-align: left;
            padding-left: 15px;
          }
          i {
            font-size: 16px;
            color: #5ba5df;
            font-weight: bold;
          }
        }
      }
    }
    .body-right {
      flex: 1;
      .breadcrumb {
        height: 55px;
        background-color: #fff;
        padding-left: 15px;
        .ivu-breadcrumb {
          display: flex;
          align-items: center;
          height: 55px;
        }
      }
    }
  }
}
</style>


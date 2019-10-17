import Vue from 'vue';
import Router from 'vue-router';
import index from './pages/index'

Vue.use(Router);

const router = [
    {
        path     : 'survey',
        name     : "survey",
        icon     : "ios-podium-outline",
        component: () => import('./pages/Survey.vue'),
        meta     : { title: "概况" },
    },
    {
        path     : 'wxprogram',
        name     : "wxprogram",
        icon     : "ios-git-compare",
        component: () => import('./pages/index.vue'),
        meta     : { title: "小程序管理" },
        children : [
            {
                path     : '/shopManage',
                name     : "shopManage",
                component: () => import('./pages/shopManage/decorate.vue'),
                meta     : { title: "店铺装修", }
            },
            {
                path     : '/shopSet',
                name     : "shopSet",
                component: () => import('./pages/shopManage/shopSet.vue'),
                meta     : { title: "店铺设置", }
            },
            {
                path     : '/shopMessage',
                name     : "shopMessage",
                component: () => import('./pages/shopManage/shopMessage.vue'),
                meta     : { title: "店铺信息", }
            }
        ]
    },
    {
        path     : 'order',
        name     : "wxprogram",
        icon     : "ios-paper-outline",
        component: () => import('./pages/index.vue'),
        meta     : { title: "订单管理" },
        children : [
            {
                path     : '/order-common',
                name     : "order-common",
                component: () => import('./pages/order-common/order.vue'),
                meta     : { title: "普通订单", }
            },
            {
                path     : '/order-line',
                name     : "order-line",
                component: () => import('./pages/order-common/order-line.vue'),
                meta     : { title: "线路分拣单", }
            },
            {
                path     : '/order-sign',
                name     : "order-sign",
                component: () => import('./pages/order-common/order-sign.vue'),
                meta     : { title: "团长签收单", }
            }
        ]
    },
    {
        path     : 'prodcut',
        name     : "prodcut",
        icon     : "ios-cube-outline",
        component: () => import('./pages/index.vue'),
        meta     : { title: "商品管理" },
        children : [
            {
                path     : '/goods-classify',
                name     : "goods-classify",
                component: () => import('./pages/goods/classify.vue'),
                meta: { title: "商品分类"}
            },
            {
                path     : '/goods-detail',
                name     : "goods-detail",
                component: () => import('./pages/goods/detail.vue'),
                meta     : { title: "发布商品"}
            }, {
                path     : '/goods',
                name     : "goods",
                component: () => import('./pages/goods/index.vue'),
                meta     : { title: "普通商品"}
            }
        ]
    },
    {
        path     : 'delivery',
        name     : "delivery",
        icon     : "ios-subway-outline",
        component: index,
        meta     : { title: "物流管理" },
        children : [
            {
                path     : '/delivery',
                name     : "delivery",
                component: () => import('./pages/delivery/delivery.vue'),
                meta     : { title: "配送线路", }
            },
            {
                path     : '/businessScope',
                name     : "businessScope",
                component: () => import('./pages/delivery/business-scope.vue'),
                meta     : { title: "经营范围", }
            }
        ]
    },
    {
        path     : 'finance',
        name     : "finance",
        icon     : "logo-yen",
        component: () => import('./pages/finance.vue'),
        meta     : { title: "财务管理" },
        // children : [
        //     {
        //         path     : '/index',
        //         name     : "index",
        //         component: () => import('./pages/index.vue'),
        //         meta     : { title: "财务管理", }
        //     },
        //     {
        //         path     : '/index',
        //         name     : "index",
        //         component: () => import('./pages/index.vue'),
        //         meta     : { title: "提现管理", }
        //     }
        // ]
    },
    {
        path     : 'infoManage',
        name     : "infoManage",
        icon     : "md-paper",
        component: () => import('./pages/index.vue'),
        meta     : { title: "资讯管理" },
        children : [
            {
                path     : '/articleManage',
                name     : "articleManage",
                component: () => import('./pages/infoManage/articleManage.vue'),
                meta     : { title: "文章管理", }
            },
            {
                path     : '/msgManage',
                name     : "msgManage",
                component: () => import('./pages/infoManage/msgManage.vue'),
                meta     : { title: "留言管理", }
            }
        ]
    },
    {
        path     : '/market',
        name     : "market",
        icon     : "ios-calendar",
        component: () => import('./pages/index.vue'),
        meta     : { title: "营销管理" },
        children : [
            {
                path     : '/seckill',
                name     : "seckill",
                component: () => import('./pages/market/seckill/index.vue'),
                meta     : { title: "秒杀活动", }
            },
            {
                path     : '/assemble',
                name     : "assemble",
                component: () => import('./pages/market/assemble/index.vue'),
                meta     : { title: "拼团活动", }
            },
        ]
    },
    {
        path     : 'custman',
        name     : "wxprogram",
        icon     : "md-people",
        component: () => import('./pages/index.vue'),
        meta     : { title: "客户管理" },
        children : [
            {
                path     : '/index',
                name     : "index",
                component: () => import('./pages/index.vue'),
                meta     : { title: "团长管理", }
            },
            {
                path     : '/custom',
                name     : "custom",
                component: () => import('./pages/custom/index.vue'),
                meta     : { title: "供货商管理", }
            },
            {
                path     : '/index',
                name     : "index",
                component: () => import('./pages/index.vue'),
                meta     : { title: "会员管理", }
            },
        ]
    },
    {
        path     : 'systemSetup',
        name     : "systemSetup",
        icon     : "md-settings",
        component: () => import('./pages/system-setup/index.vue'),
        meta     : { title: "系统设置" }
    }
]

export default new Router({
    routes: [{
        path     : '/',
        component: index,
        meta     : {
            index: 1
        },
        children: router
    }]
})

export const memus = router

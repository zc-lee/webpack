import api from '../../../../config/webapi';
export default {
    state: {

    },
    getters: {},
    actions: {
        /**
         * @method
         * @description 添加文章
         */
        addArticle({},data){
            return api.post("article/v1/add",data)
        },
        /**
         * @method
         * @description 添加分类
         */
        addCate({},data){
            return api.post("information/v1/category",data)
        },
        /**
         * @method
         * @description 添加留言
         */
        addWord({},data){
            return api.post("leaveWord/v1/add",data)
        },
        /**
         * @method
         * @description 获取文章列表
         */
        getArticleList({},data){
            return api.get("article/v1/select",data)
        },
        /**
         * @method
         * @description 获取分类列表
         */
        getCateList({},data){
            return api.get("information/v1/category",data)
        },
        /**
         * @method
         * @description 获取留言列表
         */
        getWordList({},data){
            return api.get("leaveWord/v1/selectLater",data)
        },
        /**
         * @method
         * @description 查询留言
         */
        searchWord({},data){
            return api.get("leaveWord/v1/findLeaveWord",data)
        },
    },
    mutations: {}
}
import router from './router'
import { Message } from 'iview'
import store from './store'
router.beforeEach((to, from, next) => {
    store.dispatch('getSystemSetMsg')
    store.dispatch('getColumnState')
    next();
})
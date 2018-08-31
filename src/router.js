import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'liveScreen',
            component: () => import('./views/LiveScreen.vue'),
            props: {
                layout: 'default' // name of the layout
            }
        },
        {
            path: '/liveTuneScreen',
            name: 'liveTuneScreen',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/LiveTuneScreen.vue'),
            props: {
                layout: 'default' // name of the layout
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    store.commit('SET_SCREEN', to.name);
    next();
});

export default router;
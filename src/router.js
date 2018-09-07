import Vue from 'vue';
import Router from 'vue-router';
import store from './store/index';

Vue.use(Router);

const router = new Router({
    linkActiveClass: 'focus',
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
                layout: 'default', // name of the layout
                key: 0
            },
            meta: {
                widget: 'TuneWidget'
            }
        },
        {
            path: '/liveInfoScreen',
            name: 'liveInfoScreen',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/LiveInfoScreen.vue'),
            props: {
                layout: 'default', // name of the layout
                channelNumber: 0
            },
            meta: {
                widget: 'LiveInfoChannelWidget'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    store.commit('SET_SCREEN', to.name);
    store.commit('SET_WIDGET', to.meta && to.meta.widget);
    next();
});

export default router;

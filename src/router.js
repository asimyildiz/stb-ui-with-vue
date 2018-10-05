export default {
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
                widget: 'TuneWidget',
                isAnimated: false,
                animation: ''
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
                widget: 'LiveInfoChannelWidget',
                isAnimated: true,
                animation: 'fade'
            }
        },
        {
            path: '/vodScreen',
            name: 'vodScreen',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('./views/VodScreen.vue'),
            props: {
                layout: 'default'
            },
            meta: {
                widget: 'VodCategoryListWidget',
                isAnimated: true,
                animation: 'fade'
            }
        }
    ]
};

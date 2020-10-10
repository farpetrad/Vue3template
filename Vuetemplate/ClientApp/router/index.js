import { createRouter, createWebHistory } from 'vue-router';

import Home from 'views/Home';
import store from '../store';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            props: false,
            name: 'Home',
            component: Home,
        },
        {
            path: '/about',
            props: false,
            name: 'About',
            component: () => import (/*webpackChunkName: "about" */ 'views/About'),
        }
    ],
});

router.beforeEach(async (to, from, next) => {
    document.title = `${store.getters.siteName} - ${to.name}`;

    return await next();
});


export default router;

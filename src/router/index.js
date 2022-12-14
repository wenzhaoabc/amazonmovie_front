import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";

// mode: 'history',
const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/movie',
        component: Layout,
        children: [
            {
                path: '/movie',
                name: 'Movie',
                component: () => import("@/views/movie")
            },
            {
                path: '/relationship',
                name: 'Relationship',
                component: () => import("@/views/relationship")
            },
            {
                path: '/flow',
                name: 'Flow',
                component: () => import("@/views/flow")
            },
            {
                path: '/origin',
                name: 'Origin',
                component: () => import("@/views/origin")
            },

        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

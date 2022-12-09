import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";

// mode: 'history',
const routes = [
    {
        path: '/',
        name: 'Layout',
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

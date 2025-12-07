import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
    { path: '/about', name: 'About', component: () => import('../views/About.vue') },
    { path: '/work', name: 'Work', component: () => import('../views/Work.vue') },
    { path: '/contact', name: 'Contact', component: () => import('../views/Contact.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

let pageTransition: any = null


router.beforeEach(async (to, from, next) => {
    // Only play transition if we are navigating FROM a page (not initial load)
    if (pageTransition && from.name) {
        await pageTransition.playTransition({
            type: 'simple', // New simple type
            pageName: to.name || 'Page',
            duration: 1.0
        })
    }
    next()
})


export function registerPageTransition(instance: any) {
    pageTransition = instance
}

export default router
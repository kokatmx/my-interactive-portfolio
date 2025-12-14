import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import Work from "../components/Work.vue";
import Contact from "../components/Contact.vue";
import ProjectDetail from "../components/ProjectDetail.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/work', name: 'Work', component: Work },
    { path: '/work/:slug', name: 'ProjectDetail', component: ProjectDetail, props: true },
    { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // Always scroll to top on route change
        return { top: 0 }
    }
})

export default router

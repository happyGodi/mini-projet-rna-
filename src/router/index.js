import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        } /* ,
        {
          path: '/traceXY',
          name: 'Tracée de Yn en fonction de Xn',
          component: () => import("../components/TraceXY.vue")
        } */
    ]
});
export default router;

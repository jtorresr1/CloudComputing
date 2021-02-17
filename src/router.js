import Vue from "vue";
import VueRouter from 'vue-router'
    
Vue.use(VueRouter);
import App from './App';
import Mouse from './components/Mouse';

const routes = [
    {
      path: "/",
      name: "home",
      component: App
    },
    {
        path: "/mouse",
        name: "mouse",
        component: Mouse
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});
export default router;
import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    // mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("./views/Home.vue"),
            meta: {keepAlive: false}
        },
        {
            path: "/about",
            name: "about",
            component: () => import("./views/About.vue")
        },
        {
            path: "/demo",
            name: "Demo",
            component: () => import("./views/Demo.vue")
        }
    ]
});

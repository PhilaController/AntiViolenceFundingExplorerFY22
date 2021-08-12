import Vue from "vue";
import Router from "vue-router";
import Intro from "@/components/Intro"
import DataDashboard from "@/components/DataDashboard"

Vue.use(Router);

const data = require("@/data/data.json");

export default new Router({
    routes: [
        {
            path: "/",
            component: Intro,
            props: { "data": data },
        },
        {
            path: "/explorer",
            component: DataDashboard,
            props: { "data": data },
        },
    ],
    // always return to top
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
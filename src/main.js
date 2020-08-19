import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Navbar from "./components/Front/Navbar";
import JQuery from "jquery";
import "popper.js";
import "bootstrap";
window.$ = window.JQuery = JQuery;
Vue.config.productionTip = false;
Vue.component("Navbar", Navbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

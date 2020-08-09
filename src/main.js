import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Navbar from "./components/Front/Navbar";

Vue.config.productionTip = false;

Vue.component("Navbar", Navbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: "",
      productTitleSearched: "",
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false,
      openQuickModal: false,
      editProductId: "",
      currentProductEdit: { title: "", price: "", image: "" },
      modalStatus: "",
    },
  },

  mutations: {
    productsList: (state, items) => {
      state.products = items;
    },
    quickView: (state, id) => {
      state.products.forEach((el) => {
        el.isQuickView = false;
        if (id === el.id) {
          el.isQuickView = true;
        }
      });
    },
    closeQuickView: (state, id) => {
      state.products.forEach((el) => {
        if (id === el.id) {
          el.isQuickView = false;
        }
      });
    },
    addToCart: (state, item) => {
      let found = state.cart.find((product) => product.id == item.id);
      if (found) {
        found.data().price++;
      } else {
        state.cart.push(item);
        state.cart.map((elm) => console.log(elm.id));
      }
    },
    setAddedBtn: (state, data) => {
      state.products.forEach((el) => {
        if (data.id === el.id) {
          el.data().isAddedBtn = data.status;
        }
      });
    },
    removeFromCart: (state, id) => {
      state.products.forEach((el) => {
        if (id === el.id) {
          el.isAddedToCart = false;
        }
      });
    },
    showCart: (state, show) => {
      state.systemInfo.openCheckoutModal = show;
    },
    userHasSearched: (state, search) => {
      state.userInfo.hasSearched = search;
    },
    userSearchTitle: (state, searchTitle) => {
      state.userInfo.productTitleSearched = searchTitle;
    },
    isQuick: (state, quick) => {
      state.systemInfo.openQuickModal = quick;
    },
    editProductId: (state, id) => {
      state.systemInfo.editProductId = id;
    },
    currentProductEdit: (state, data) => {
      state.systemInfo.currentProductEdit = data;
    },
    currentModalStatus: (state, status) => {
      state.systemInfo.modalStatus = status;
    },
    userName(state, name) {
      state.userInfo.name = name;
    },
  },
  getters: {
    productsAdded: (state) => {
      return state.cart;
    },
    quickViewAdded: (state) => {
      return state.products.filter((el) => {
        return el.isQuickView;
      });
    },
  },
});

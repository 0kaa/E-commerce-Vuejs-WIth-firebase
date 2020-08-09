import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [
      {
        id: "1",
        createdAt: "2020-08-03T21:17:18.677Z",
        title: "Gorgeous Concrete Tuna",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/food",
        price: "413.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "2",
        createdAt: "2020-08-03T17:19:48.140Z",
        title: "Intelligent Frozen Mouse",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/nightlife",
        price: "268.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "3",
        createdAt: "2020-08-03T05:01:10.971Z",
        title: "Intelligent Concrete Gloves",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/food",
        price: "246.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "4",
        createdAt: "2020-08-04T01:01:12.918Z",
        title: "Licensed Rubber Chair",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/technics",
        price: "736.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "5",
        createdAt: "2020-08-03T16:55:24.682Z",
        title: "Handcrafted Fresh Chair",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/technics",
        price: "80.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "6",
        createdAt: "2020-08-03T21:33:56.637Z",
        title: "Rustic Rubber Bacon",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/cats",
        price: "297.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "7",
        createdAt: "2020-08-03T09:05:09.141Z",
        title: "Refined Metal Chips",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/nature",
        price: "266.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "8",
        createdAt: "2020-08-04T00:01:59.954Z",
        title: "Tasty Rubber Bike",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/abstract",
        price: "117.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "9",
        createdAt: "2020-08-04T01:49:07.450Z",
        title: "Rustic Cotton Bike",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/cats",
        price: "562.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
      {
        id: "10",
        createdAt: "2020-08-03T06:31:23.123Z",
        title: "Practical Fresh Table",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        shortDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        image: "http://lorempixel.com/640/480/food",
        price: "890.00",
        quantity: 1,
        isAddedToCart: false,
        isAddedBtn: false,
        isFavourite: false,
        isQuickView: false,
      },
    ],
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
    },
  },
  mutations: {
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
    addToCart: (state, id) => {
      state.cart = [...state.products];
      state.cart.forEach((el) => {
        if (id === el.id) {
          el.isAddedToCart = true;
          state.cart.splice(
            state.cart.length - 1,
            0,
            state.cart.splice(state.cart.indexOf(el), 1)[0]
          );
        }
      });
    },
    setAddedBtn: (state, data) => {
      state.cart.forEach((el) => {
        if (data.id === el.id) {
          el.isAddedBtn = data.status;
        }
      });
    },
    removeFromCart: (state, id) => {
      state.cart.forEach((el) => {
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
    async userName(state, name) {
      state.userInfo.name = name;
    },
  },
  getters: {
    productsAdded: (state) => {
      return state.cart.filter((el) => {
        return el.isAddedToCart;
      });
    },
    quickViewAdded: (state) => {
      return state.products.filter((el) => {
        return el.isQuickView;
      });
    },
  },
});

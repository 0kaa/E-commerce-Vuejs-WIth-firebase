<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="py-5">
      <div class="container">
        <h2 class="text-center" v-if="products.length < 1">No product found</h2>
        <div class="row">
          <div class="col-md-4 mb-4" v-for="product in products" :key="product.id" :id="product.id">
            <div class="card">
              <carousel
                :nav="false"
                :dots="false"
                :items="1"
                v-if="product.data().image.length > 1"
              >
                <div v-for="(i,index) in (product.data().image.length)" :key="index">
                  <img :src="product.data().image[index]" class="card-img-top img-fluid" />
                </div>
              </carousel>
              <div v-else>
                <img :src="product.data().image[0]" class="card-img-top img-fluid" />
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.data().title }}</h5>
                <p class="card-text">{{ product.shortDescription }}</p>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <div class="buttons">
                  <button
                    class="btn btn-primary mr-2"
                    @click.prevent="addToCart(product)"
                  >Add to Cart</button>
                  <!-- <button
                    class="btn btn-outline-primary"
                    v-if="!product.isAddedToCart"
                    @click.prevent="quickView(product.id)"
                  >
                    <i class="fa fa-eye"></i>
                  </button>-->
                  <p
                    class="btn text-danger m-0"
                    v-if="product.isAddedToCart"
                    @click.prevent="removeFromCart(product.id)"
                  >Remove To cart</p>
                </div>
                <span class="price">${{ product.data().price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center" v-if="products.length > 6">
          <button class="btn btn-primary" @click="loadMore">Load More</button>
        </div>
        <quick-view></quick-view>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";

import QuickView from "../../components/Front/QuickView";
import carousel from "vue-owl-carousel";
export default {
  name: "Home",
  components: { QuickView, carousel },
  data() {
    return {
      currentPage: 1,
      postsPerPage: 6,
      products: []
    };
  },
  created() {
    this.productsList();
  },
  methods: {
    productsList() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
        this.$store.commit("productsList", this.products);
      });
    },
    getByTitle(list, keyword) {
      const search = keyword.trim().toLowerCase();
      if (!search.length) return list;
      return list.filter(
        item =>
          item
            .data()
            .title.toLowerCase()
            .indexOf(search) > -1
      );
    },
    getProductByTitle() {
      let allProducts = this.products;
      return this.getByTitle(allProducts, this.search);
    },
    quickView(id) {
      this.$store.commit("quickView", id);
      this.$store.commit("isQuick", true);
      document.querySelector("html").style.overflow = "hidden";
    },
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    loadMore() {
      if (this.currentPage < this.totalPages) {
        this.btnLoading = true;

        setTimeout(() => this.currentPage++, 500);
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.$store.state.products.length / this.postsPerPage);
    },
    productsBySearch() {
      return this.getProductByTitle();
    }
  }
};
</script>

<template>
  <transition name="fade" v-if="isQuick">
    <div class="quick-view" @click="closeQuickView">
      <div class="view-body">
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="closeQuickView"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div v-for="product in products" :key="product.id" class="row" @click.stop>
          <div class="col-md-6">
            <img :src="product.image" class="img-fluid" />
          </div>
          <div class="col-md-6">
            <div class="product-info">
              <h4 class="product-title">{{ product.title }}</h4>
              <p class="product-price">${{ product.price }}</p>
              <p class="product-descripti">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "QuickView",
  methods: {
    closeQuickView() {
      document.querySelector("html").style.overflow = null;
      this.$store.commit("isQuick", false);
    },
  },
  computed: {
    products() {
      return this.$store.getters.quickViewAdded;
    },
    isQuick() {
      let quick = this.$store.state.systemInfo.openQuickModal;
      if (quick) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.quick-view {
  width: 100%;
  height: 100%;
  background: #00000070;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .view-body {
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    max-height: calc(100vh - 40px);
    display: flex;
    flex-direction: column;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
      padding: 20px;
      outline: none;
    }
    .product-info {
        padding:20px 0;
    }
  }
}
</style>

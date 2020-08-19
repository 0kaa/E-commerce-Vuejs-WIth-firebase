<template>
  <div>
    <div class="d-flex cart">
      <div class="cart-body">
        <div class="cart-item" v-for="product in products" :key="product.id" :id="product.id">
          <div class="content">
            <img class="img-fluid" width="50" :src="product.data().image[0]" />
            <div class="cart-info">
              <h3 class="cart-title">{{ product.data().title }}</h3>
              <p class="cart-price">${{ product.data().price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-btn">
        <a href="#" class="nav-link" @click.prevent="showCart">
          <i class="fa fa-shopping-cart"></i>
          {{ productsCount }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  computed: {
    products() {
      return this.$store.state.cart;
    },
    productsCount() {
      return this.$store.state.cart.length;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

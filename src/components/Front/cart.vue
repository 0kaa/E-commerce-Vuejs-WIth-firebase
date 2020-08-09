<template>
  <!-- <transition name="fade"> -->
  <div>
    <div class="d-flex cart">
      <div class="cart-body">
        <div
          class="cart-item"
          v-for="(product, i) in products"
          :key="product.id"
          :id="product.id"
          @click.prevent="uiFun()"
          :style="
            `transform:translateY(-${'0.7' *
              (products.length - 1 - i)}rem) scale(${1 -
              (products.length - 1 - i) * 0.033333333})`
          "
        >
          <div class="content">
            <img :src="product.image" />
            <div class="cart-info">
              <h3 class="cart-title">{{ product.title }}</h3>
              <p class="cart-price">${{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-btn">
        <a href="#" class="nav-link" @click.prevent="showCart">
          <i class="fa fa-shopping-cart"></i> {{ productsCount }}
        </a>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "Cart",
  methods: {
    uiFun() {
      const blocks = document.querySelectorAll(".cart-item");
      blocks.forEach((block, i) => {
        const reverseIndex = blocks.length - 1 - i;
        block.style.transform = `rotate(${reverseIndex *
          1.1}deg) translate(-${reverseIndex * 0.2}rem,-${reverseIndex *
          4.1}rem)`;
      });
    },
  },
  computed: {
    checkModal() {
      let checkModalOpen = this.$store.state.systemInfo.openCheckoutModal;
      if (checkModalOpen) {
        return true;
      } else {
        return false;
      }
    },
    products() {
      return this.$store.getters.productsAdded;
    },
    productsCount() {
      return this.$store.getters.productsAdded.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  position: fixed;
  right: 20px;
  bottom: 20px;
  .cart-body {
    position: relative;
  }
  .cart-item {
    position: absolute;
    background: #fff;
    transition: ease-in-out 0.2s;
    box-shadow: 0 0 10px #dedede;
    border-radius: 10px;
    right: 0;
    bottom: 0;
    .content {
      display: flex;
      padding: 11px 20px 9px;
    }

    .content img {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 50%;
    }

    .content > div {
      text-align: left;
      margin-left: 10px;
      width: 180px;
    }

    .content h3 {
      margin: 0;
      font-size: 16px;
      font-weight: normal;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .content p {
      margin: 0;
      font-size: 12px;
      color: #777;
    }
  }
}
</style>

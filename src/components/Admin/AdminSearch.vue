<template>
  <div class="item search">
    <div class="input-search">
      <input
        type="search"
        class="form-control"
        ref="search"
        v-model="searchProduct"
        @keyup="searchByName(searchProduct)"
        placeholder="Search Products"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSearch",
  data() {
    return {
      search: false,
      searchProduct: ""
    };
  },
  methods: {
    searchByName(search) {
      if (search.length) {
        this.$store.commit("userHasSearched", true);
        this.$store.commit("userSearchTitle", search);
      } else {
        this.$store.commit("userHasSearched", false);
        this.$store.commit("userSearchTitle", "");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  padding: 0 10px;
  display: flex;
  align-items: center;

  &.search {
    .input-search {
      display: flex;
      align-items: center;
      z-index: 9;
      width: 300px;
    }
    input {
      border: none;
      box-shadow: none;
      font-size: 14px;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
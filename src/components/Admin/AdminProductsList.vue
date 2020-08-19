<template>
  <div class="products-list">
    <table class="table table-bordered text-center table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Modify</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in productsBySearch" :key="index">
          <td>
            <img
              v-for="(image,index) in product.data().image"
              :src="image"
              class="img-fluid mr-2"
              width="50px"
              :key="index"
            />
          </td>
          <td>{{ product.data().title }}</td>
          <td>{{ product.data().price }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#product_modal"
              @click.prevent="editProduct(product)"
            >
              <i class="fa fa-pencil-square-o"></i>
            </button>
            <button class="btn btn-danger ml-2" @click.prevent="deleteProduct(product.id)">
              <i class="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  name: "AdminProductsList",
  data() {
    return {
      products: []
    };
  },
  created() {
    this.productsList();
  },
  methods: {
    getByTitle(list, keyword) {
      const search = keyword.trim().toLowerCase();
      if (search == "") return list;
      return list.filter(
        item =>
          item
            .data()
            .title.toLowerCase()
            .indexOf(search) > -1
      );
    },
    productsList() {
      db.collection("products").onSnapshot(querySnapshot => {
        this.products = [];
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
        this.$store.commit("productsList", this.products);
      });
    },
    editProduct(doc) {
      this.$store.commit("editProductId", doc.id);
      this.$store.commit("currentProductEdit", doc.data());
      this.$store.commit("currentModalStatus", "editProduct");
    },

    deleteProduct(doc) {
      db.collection("products")
        .doc(doc)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          this.productsList();
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  },
  computed: {
    productsBySearch() {
      let allProducts = this.$store.state.products,
        search = this.$store.state.userInfo.productTitleSearched;
      return this.getByTitle(allProducts, search);
    }
  }
};
</script>

<template>
  <div class="products-content">
    <div class="products-form">
      <form @submit.prevent="addProduct()">
        <div class="form-row">
          <div class="col-md-6 offset-md-3 mb-3">
            <label for="product_name">Search Product</label>
            <input
              type="text"
              name="name"
              class="form-control"
              v-model="search"
            />
            <div v-if="errors[0].title" class="invalid-feedback">
              {{ errors[0].title }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="product_name">Product Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              :class="errors[0].title ? 'is-invalid' : ''"
              id="product_name"
              v-model="title"
            />
            <div v-if="errors[0].title" class="invalid-feedback">
              {{ errors[0].title }}
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="product_price">Product Price</label>
            <input
              type="number"
              name="price"
              class="form-control"
              :class="errors[0].price ? 'is-invalid' : ''"
              id="product_price"
              v-model="price"
            />
            <div v-if="errors[0].price" class="invalid-feedback">
              {{ errors[0].price }}
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mb-3">Save Data</button>
      </form>
    </div>
    <div class="products list">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsBySearch" :key="index">
            <th scope="row">{{ product.id }}</th>
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
                Edit Product
              </button>
              <button
                class="btn btn-danger ml-4"
                @click.prevent="deleteProduct(product.id)"
              >
                Delete Product
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="product-modal">
      <!-- Modal -->
      <div
        class="modal fade"
        id="product_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="addProduct()">
              <div class="modal-body">
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                    <label for="product_name">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      :class="errors[0].title ? 'is-invalid' : ''"
                      v-model="productModal.title"
                    />
                    <div v-if="errors[0].title" class="invalid-feedback">
                      {{ errors[0].title }}
                    </div>
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="product_price">Product Price</label>
                    <input
                      type="number"
                      name="price"
                      class="form-control"
                      :class="errors[0].price ? 'is-invalid' : ''"
                      v-model="productModal.price"
                    />
                    <div v-if="errors[0].price" class="invalid-feedback">
                      {{ errors[0].price }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  @click.prevent="updateProudct(activeProduct)"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "../../firebase";
export default {
  name: "AdminProducts",
  data() {
    return {
      title: "",
      price: "",
      products: [],
      productModal: {
        title: "",
        price: "",
      },
      search: "",
      activeProduct: "",
      errors: [
        {
          title: "",
          price: "",
          
        },
      ],
    };
  },
  created() {
    this.productsList();
  },
  computed: {
    productsBySearch() {
      return this.getProductByTitle();
      
    },
  },
  methods: {
    editProduct(doc) {
      this.activeProduct = doc.id;
      this.productModal = doc.data();
    },
    updateProudct(doc) {
      db.collection("products")
        .doc(doc)
        .update(this.productModal)
        .then(function() {
          console.log("Document successfully updated!");
        });
    },
    deleteProduct(doc) {
      db.collection("products")
        .doc(doc)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    getByTitle(list, keyword) {
      const search = keyword.trim().toLowerCase();
      if (!search.length) return list;
      return list.filter(
        (item) =>
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
    checkForm() {
      if (this.title.length < 3) {
        this.errors[0].title = "Title must to be more than 3 characters ";
      }
      if (!this.title) {
        this.errors[0].title = "Title required.";
      }
      if (this.price.length < 1) {
        this.errors[0].price = "Price required.";
      }
    },
    reset() {
      this.title = "";
      this.price = "";
    },
    productsList() {
      db.collection("products")
        .orderBy("title", "asc")
        .onSnapshot((querySnapshot) => {
          this.products = [];
          querySnapshot.forEach((doc) => {
            this.products.push(doc);
          });
        });
    },
    addProduct() {
      if (this.title.length > 2 && this.price.length > 0) {
        db.collection("products")
          .add({
            title: this.title,
            price: this.price,
          })
          .then(() => {
            this.productsList();
            this.title = "";
            this.price = "";
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
      this.errors[0].title = "";
      this.errors[0].price = "";

      this.checkForm();
    },
  },
};
</script>

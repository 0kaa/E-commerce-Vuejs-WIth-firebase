<template>
  <div class="products-form">
    <div class="product-form-header d-flex align-items-center justify-content-between mb-4">
      <h3>Products List</h3>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="tooltip"
        data-placement="top"
        title="Tooltip on top"
      >Tooltip on top</button>
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#product_modal"
        @click="newProduct"
      >Add Product</button>
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
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="productModalLabel">
                {{
                currentModal != "newProduct"
                ? "Edit: " + currentProduct.title
                : "Add New Product"
                }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div class="modal-body">
                <div class="form-group row">
                  <label
                    class="col-sm-3 col-form-label col-form-label-sm p-0 d-flex align-items-center justify-content-center"
                  >Product Name</label>

                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      :class="errors.title ? 'is-invalid' : ''"
                      v-model="currentProduct.title"
                    />
                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    class="col-sm-3 col-form-label col-form-label-sm p-0 d-flex align-items-center justify-content-center"
                  >Product Image</label>

                  <div class="col-sm-9">
                    <div class="d-flex align-items-center">
                      <div v-if="currentProduct.image.length" class="mr-4">
                        <div class="d-flex align-items-center justify-content-center">
                          <div
                            class="position-relative mr-2"
                            v-for="(image,index) in currentProduct.image"
                            :key="index"
                          >
                            <img class="img-fluid" width="80" :src="image" />
                            <span class="close-btn" @click="deleteImg(image,index)">×</span>
                          </div>
                        </div>
                      </div>
                      <label class="btn btn-primary position-relative" for="file-input">
                        <input
                          type="file"
                          @change="onUpload"
                          accept="image/*"
                          id="file-input"
                          class="input-file"
                        />
                        <span>Upload</span>
                      </label>
                    </div>
                    <div v-if="uploading">
                      <p>
                        {{ uploadValue.toFixed() + "%" }}
                        <progress
                          id="progress"
                          :value="uploadValue"
                          max="100"
                        ></progress>
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Price -->
                <div class="form-group row">
                  <label
                    class="col-sm-3 col-form-label col-form-label-sm p-0 d-flex align-items-center justify-content-center"
                  >Product Price</label>

                  <div class="col-sm-9">
                    <input
                      type="number"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      :class="errors.price ? 'is-invalid' : ''"
                      v-model="currentProduct.price"
                    />
                    <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  @click.prevent="updateProudct(currentProductId)"
                  v-if="currentModal === 'editProduct'"
                >Save changes</button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  v-if="currentModal === 'newProduct'"
                  @click.prevent="addProduct()"
                >Add Product</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, fb } from "../../firebase";
import $ from "jquery";
export default {
  name: "AdminProductsForm",
  data() {
    return {
      uploadValue: 0,
      uploading: false,
      product: {
        title: "",
        price: "",
        image: []
      },
      errors: {
        title: "",
        price: ""
      }
    };
  },
  mounted() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
  methods: {
    onUpload(event) {
      let file = event.target.files[0];
      let storageRef = fb.storage().ref(`products/${file.name}`);
      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploading = true;
          this.uploadValue = progress;
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.currentProduct.image.push(downloadURL);
            this.uploading = false;
          });
        }
      );
    },
    deleteImg(img, index) {
      var desertRef = fb.storage().refFromURL(img);
      this.currentProduct.image.splice(index, 1);
      // Delete the file
      desertRef
        .delete()
        .then(function(succ) {
          console.log(succ);
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    },
    newProduct() {
      this.$store.commit("currentModalStatus", "newProduct");
      this.$store.commit("currentProductEdit", this.product);
    },
    checkForm() {
      if (this.currentProduct.title.length < 3) {
        this.errors.title = "Title must to be more than 3 characters ";
      }
      if (!this.currentProduct.title) {
        this.errors.title = "Title required.";
      }
      if (this.currentProduct.price.length < 1) {
        this.errors.price = "Price required.";
      }
    },
    updateProudct(doc) {
      this.errors.title = "";
      this.errors.price = "";
      db.collection("products")
        .doc(doc)
        .update(this.currentProduct)
        .then(function() {
          console.log("Document successfully updated!");
        });

      this.checkForm();
      $("#product_modal").modal("hide");
    },
    addProduct() {
      this.errors.title = "";
      this.errors.price = "";
      if (
        this.currentProduct.title.length > 2 &&
        this.currentProduct.price.length > 0
      ) {
        db.collection("products")
          .add(this.currentProduct)
          .then(() => {
            this.currentProduct.title = "";
            this.currentProduct.price = "";
            this.currentProduct.image = [];
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }

      this.checkForm();
      $("#product_modal").modal("hide");
    }
  },
  computed: {
    currentProduct() {
      let current = this.$store.state.systemInfo.currentProductEdit;
      return current;
    },
    currentModal() {
      let current = this.$store.state.systemInfo.modalStatus;
      return current;
    },

    currentProductId() {
      let currentId = this.$store.state.systemInfo.editProductId;
      return currentId;
    }
  }
};
</script>

<style lang="scss" scoped>
.products-form {
  .product-modal {
    .modal-content {
      .close {
        outline: 0;
      }

      .modal-body {
        input {
          &.input-file {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            opacity: 0;
            height: 100%;
            cursor: pointer;
          }
        }
        .close-btn {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 20px;
          color: white;
          line-height: 1;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #00000061;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

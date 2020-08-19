<template>
  <div class="products-content">
    <admin-products-form></admin-products-form>
    <admin-products-list></admin-products-list>
  </div>
</template>
<script>
import AdminProductsList from "../../components/Admin/AdminProductsList";
import AdminProductsForm from "../../components/Admin/AdminProductsForm";

export default {
  name: "AdminProducts",
  components: { AdminProductsList, AdminProductsForm }
};
</script>

<template>
  <div class="admin-home d-flex">
    <admin-sidebar></admin-sidebar>
    <div class="router-view">
      <AdminNavbar></AdminNavbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
export default {
  name: "AdminHome",
  components: { AdminSidebar, AdminNavbar }
};
</script>

<style lang="scss" scoped>
.admin-home {
  height: 100%;
  overflow: auto;
  .router-view {
    padding: 20px 30px;
    flex: 1 1 100%;
  }
}
</style>

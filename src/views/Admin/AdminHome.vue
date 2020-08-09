<template>
  <div class="admin-home d-flex">
    <admin-sidebar></admin-sidebar>
    <div style="padding:50px;flex: 1 1 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "../../components/Admin/AdminSidebar";
export default {
  name: "AdminHome",
  components: { AdminSidebar },
};
</script>

<style lang="scss" scoped>
.admin-home {
  height: 100%;
}
</style>

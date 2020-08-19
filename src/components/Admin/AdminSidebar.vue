<template>
  <div class="admin-sidebar" :class="closed ? 'is-close' : ''" @click="toggleSidebar">
    <div class="sidebar-content" @click.stop>
      <div class="d-flex align-items-center justify-content-center mb-4 logo-brand">
        <img src="/logo.png" class="img-fluid" width="40" :class="closed ? 'm-0' : 'mr-2'" />
        <h5 class="text-capitalize" v-if="!closed">Dashboard</h5>
      </div>

      <ul class="list-unstyled navbar-nav" :class="closed ? 'is-close' : ''">
        <li class="nav-item">
          <router-link exact class="nav-link" to="/">
            <i class="fa fa-home" :class="closed ? 'm-0' : ''"></i>
            <span class="title" v-if="!closed">My Site</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link exact class="nav-link" to="/admin/">
            <i class="fa fa-home" :class="closed ? 'm-0' : ''"></i>
            <span class="title" v-if="!closed">Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">
            <i class="fa fa-shopping-cart" :class="closed ? 'm-0' : ''"></i>
            <span class="title" v-if="!closed">Products</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/users">
            <i class="fa fa-user" :class="closed ? 'm-0' : ''"></i>
            <span class="title" v-if="!closed">Users</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logOut">
            <i class="fa fa-sign-out" :class="closed ? 'm-0' : ''"></i>
            <span class="title" v-if="!closed">Log Out</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fb } from "../../firebase";
export default {
  name: "AdminSidebar",
  data() {
    return {
      closed: false
    };
  },
  methods: {
    toggleSidebar() {
      this.closed = !this.closed;
    },
    logOut() {
      fb.auth().signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.admin-sidebar {
  width: 300px;
  color: #222;
  flex: 1 1 auto;
  background-color: #efefef;
  transition: all 0.2s ease-in-out;
  padding: 20px;
  &.is-close {
    width: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .navbar-nav {
    &.is-close {
      .nav-item .nav-link {
        margin-bottom: 10px;
        &.router-link-active {
          background-color: #262c49;
          box-shadow: none;
          color: #c2c6dc;
        }
      }
    }
    .nav-item {
      .nav-link {
        padding: 10px 15px;
        color: #222;
        margin-bottom: 20px;
        border-radius: 4px;
        font-size: 15px;
        transition: all 0.3s ease-in-out;
        display: flex;
        align-items: center;
        &.router-link-active {
          background-color: #0b78ff;
          color: #fff;
          i {
            color: #fff;
          }
        }
        i {
          font-size: 18px;
          margin-right: 10px;
          color: #0b78ff;
        }
      }
      &:last-child {
        .nav-link {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>

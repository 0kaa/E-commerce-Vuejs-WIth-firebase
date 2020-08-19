<template>
  <div class="admin-navbar mb-5">
    <div class="navbar-content">
      <div class="info d-flex align-items-center justify-content-between">
        <admin-search></admin-search>
        <div class="item user-info d-flex align-items-center">
          <div class="user-details text-right">
            <div class="username text-capitalize">{{ user }}</div>
          </div>
          <div class="user-image">
            <img src="/avatar.jpg" class="img-fluid rounded-circle" width="40" height="40" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb } from "../../firebase";
import AdminSearch from "./AdminSearch";

export default {
  name: "AdminNavbar",
  components: { AdminSearch },
  data() {
    return {
      user: ""
    };
  },

  created() {
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.displayName;
      } else {
        this.user = "";
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.admin-navbar {
  background-color: #efefef;
  border-radius: 0.5rem;
  padding: 0.8rem 1rem;
  .navbar-content {
    position: relative;
    .icons {
      .item {
        a {
          color: #c2c6dc;
          margin: 0 5px;
          transition: all 0.2s linear;
          &:hover {
            color: #5952c1;
          }
        }
      }
    }
    .info {
      .item {
        padding: 0 10px;
        display: flex;
        align-items: center;

        a {
          color: #c2c6dc;
          font-size: 22px;
          text-decoration: none;
        }
        &.user-info {
          .user-details {
            margin: 0 10px;
            .username {
              font-size: 14px;
              font-weight: 600;
            }
            .user-status {
              font-size: 11px;
            }
          }
        }
      }
    }
  }
}
</style>

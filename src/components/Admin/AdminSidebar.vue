<template>
  <div class="admin-sidebar">
    <h3 class="text-capitalize">{{ user }}</h3>
    <ul class="list-unstyled">
      <li>
        <router-link to="/admin/">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/admin/products">Products</router-link>
      </li>
      <li>
        <router-link to="/admin/users">Users</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { fb, db } from "../../firebase";
export default {
  name: "AdminSidebar",
  data() {
    return {
      user: "",
    };
  },
  created() {
    this.userName();
  },
  methods: {
    userName() {
      fb.auth().onAuthStateChanged((user) => {
        if (user) {
          let dbRef = db.collection("users").doc(user.uid);
          dbRef
            .get()
            .then((doc) => {
              this.user = doc.data().name;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // No user is signed in.
          this.user = "Welcome User";
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-sidebar {
  width: 300px;
  background-color: #1b1b1b;
  padding: 20px;
  color: #fff;
  text-align: center;
  flex: 1 1 auto;
  transition: all 0.2s ease-in-out;
  &.is-close {
    margin-left: -300px;
  }
}
</style>

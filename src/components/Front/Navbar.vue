<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">E-commerce</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form
          class="form-inline my-2 my-lg-0 ml-auto"
          @submit.prevent="searchByName(search)"
        >
          <input
            class="form-control mr-sm-2"
            type="search"
            v-model="search"
            placeholder="Search"
            aria-label="Search"
            @keyup="searchByName(search)"
          />
        </form>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="user">
            <router-link class="nav-link text-capitalize" to="/admin"
              >{{ user }} <span class="sr-only">(current)</span></router-link
            >
          </li>
          <li class="nav-item" v-if="session" @click="logOut">
            <a class="nav-link" href="#">Log out</a>
          </li>
          <li class="nav-item" v-if="!session">
            <router-link to="/login" class="nav-link">Log in</router-link>
          </li>
          <li class="nav-item" v-if="!session">
            <router-link to="/sign" class="nav-link">Sign in</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { fb, db } from "../../firebase";
export default {
  name: "Navbar",
  data() {
    return {
      search: "",
      user: "",
      session: "",
    };
  },
  created() {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        let dbRef = db.collection("users").doc(user.uid);
        dbRef
          .get()
          .then((doc) => {
            this.user = doc.data().name;
            this.session = true;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.session = false;
      }
    });
  },
  methods: {
    logOut() {
      fb.auth().signOut();
    },
    searchByName(search) {
      if (search.length) {
        this.$store.commit("userHasSearched", true);
        this.$store.commit("userSearchTitle", search);
      } else {
        this.$store.commit("userHasSearched", false);
        this.$store.commit("userSearchTitle", "");
      }
    },
  },
};
</script>

<template>
  <section>
    <table class="table table-bordered text-center table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Modify</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.email }}</td>
          <td>
            <select @change="changeRole(user.id, $event)" class="custom-select">
              <option :selected="user.role.admin" value="admin" v-text="'Admin'"></option>
              <option :selected="user.role.user" value="user" v-text="'User'"></option>
            </select>
          </td>
          <td>
            <button class="btn btn-primary" @click="deleteUser(user.id)" v-text="'Delete user'"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import { fb, db } from "../../firebase";
export default {
  name: "AdminUsers",

  data() {
    return {
      users: []
    };
  },

  created() {
    this.usersList();
  },

  methods: {
    deleteUser(uid) {
      var deleteUser = fb.functions().httpsCallable("deleteUser");
      var data = { id: uid };
      deleteUser(data)
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    usersList() {
      db.collection("roles")
        .orderBy("email", "asc")
        .onSnapshot(querySnapshot => {
          this.users = [];
          querySnapshot.forEach(doc => {
            this.users.push(doc.data());
          });
        });
    },

    changeRole(uid, event) {
      var addMessage = fb.functions().httpsCallable("setUserRole");

      var data = { uid: uid, role: { [event.target.value]: true } };

      addMessage(data)
        .then(function(result) {
          console.log(result);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
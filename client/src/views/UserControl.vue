<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">User</span>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-btn slot="activator" color="primary" dark>Create New User</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New User</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="form_data.username" label="Username" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Password" v-model="form_data.password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select :items="user_roles" v-model="form_data.role_id" item-text="role_name" item-value="role_id" label="User Role" required></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea name="input-7-1" box label="Keterangan" v-model="form_data.user_description" auto-grow></v-textarea>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="createUser">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table :headers="headers" :items="users" :search="search">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.username }}</td>
          <td class="text-xs-left">{{ props.item.role_name }}</td>
          <td class="text-xs-left">{{ props.item.user_description }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>

  import axios from 'axios';

  export default {
    data() {
      return {
        dialog: false,
        form_data: {
          username: '', 
          password: '', 
          role_id: 0,
          user_description: '',
        },
        search: '',
        headers: [{
            text: 'Username',
            value: 'username'
          },
          {
            text: 'Role',
            value: 'role_name'
          },
          {
            text: 'User Description',
            value: 'user_description'
          },
        ],
        users: [],
        user_roles:[]
      }
    }, 
    methods: {
      // handle if user is not authenticated
      async initialize() {
        return axios.get('http://localhost:3000/api/users')
          .then(result => this.users = result.data);
      }, 
      // handle if user is not authenticated
      async getRoles() {
        return axios.get('http://localhost:3000/api/roles')
          .then(result => this.user_roles = result.data);
      }, 
      async createUser() {
        return axios.post('http://localhost:3000/api/user/add', this.form_data)
          .then(() => this.$router.go()).catch((error) => console.log(error));
      }
    }, 
    created() {
      this.initialize();
      this.getRoles();
    }
  }

</script>

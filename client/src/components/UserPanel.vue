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
              <span class="headline">{{ form_title }}</span>
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
              <v-btn color="blue darken-1" flat @click="closeDialog">Close</v-btn>
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
          <td><v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon></td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>

  import axios from '@/services/service.api.js';

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
        form_index: -1,
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
          {
            text: 'action'
          }
        ],
        users: [],
        user_roles:[]
      }
    }, 
    methods: {
      // handle if user is not authenticated
      async initialize() {
        return axios.get('users')
          .then(result => this.users = result.data);
      }, 
      // handle if user is not authenticated
      async getRoles() {
        return axios.get('roles')
          .then(result => this.user_roles = result.data);
      }, 
      async createUser() {
        if (this.form_index > -1) {
          return axios.put('users/edit', this.form_data)
            .then((result) => {
              if (result.data.success) {
                this.$router.go();
              }
            }).catch((error) => console.log(error));
        } else {
          return axios.post('user/add', this.form_data)
            .then(() => this.$router.go()).catch((error) => console.log(error));
        }
      }, 
      editItem(item) {
        this.form_index = this.users.indexOf(item);
        this.form_data = Object.assign({}, item);
        this.dialog = true;
      },
      closeDialog () {
        this.dialog = false
        setTimeout(() => {
          this.form_data = Object.assign({}, {})
          this.form_index = -1
        }, 300)
      },
    }, 
    created() {
      this.initialize();
      this.getRoles();
    }, 
    computed: {
      form_title() {
        return this.form_index > -1 ? 'Edit User' : 'New User';
      }
    }
  }

</script>

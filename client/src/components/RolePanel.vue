<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Roles</span>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-btn slot="activator" color="primary" dark>Create New Role</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">New Role</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field v-model="form_data.role_name" label="Nama Role" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click="createRole">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table :headers="headers" :items="roles" :search="search">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.role_id }}</td>
          <td class="text-xs-left">{{ props.item.role_name }}</td>
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
          role_name: '',
        },
        search: '',
        headers: [
          {
            text: 'Role ID',
            value: 'role_id'
          },
          {
            text: 'Role Name',
            value: 'role_name'
          },
        ],
        roles: [],
        user_roles:[]
      }
    }, 
    methods: {
      // handle if user is not authenticated
      async initialize() {
        return axios.get('http://localhost:3000/api/roles')
          .then(result => this.roles = result.data);
      },
      async createRole() {
        return axios.post('http://localhost:3000/api/roles/add', this.form_data)
          .then(() => this.$router.go()).catch((error) => console.log(error));
      }
    }, 
    created() {
      this.initialize();
    }
  }

</script>

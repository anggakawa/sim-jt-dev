<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>STO OFFICE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">NEW STO OFFICE</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout  row wrap>
                <!-- <v-flex xs12>
                  <v-text-field v-model="editedItem.sto_office_id" label="STO Office ID"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="activities" v-model="editedItem.activity_next_id" item-text="activity_name" item-value="activity_id" label="Activity Next ID" required></v-select>
                </v-flex> -->
                <v-flex xs12>
                  <v-text-field v-model="editedItem.sto_office_name" label="STO Office Name"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers" :items="office_opts" :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.sto_office_id }}</td>
        <td>{{ props.item.sto_office_name }}</td>
        <td class="justify-center">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
       <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
    </v-data-table>
  </v-container>
</template>

<script>
  import axios from '@/services/service.api.js';

  export default {
    data: () => ({
      dialog: false,
       search: '',
      option_values: [
        {
          text: 'next', 
          value: 1,
        },
        {
          text: 'alternate',
          value: 2,
        },
        {
          text: 'back',
          value: 3,
        },
        {
          text: 'nothing',
          value: 4,
        },
      ],
      headers: [
        { text: 'STO Office ID', value: 'sto_office_id' },
        { text: 'STO Office Name', value: 'sto_office_name' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      office_opts: [],
      activities: [],
      editedIndex: -1,
      editedItem: {
        sto_office_id: "FIRST",
        sto_office_name: '',
      },
      defaultItem: {
          sto_office_id: '',
        sto_office_name: '',
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NEW STO OFFICE' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize();
      this.getActivities();
    },

    methods: {

      initialize () {
        return axios.get('/offices')
          .then(result => this.office_opts = result.data);
      },

      editItem (item) {
        this.editedIndex = this.office_opts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.office_opts.indexOf(item);
        if(confirm('Are you sure you want to delete this item?')) {
          return axios.delete('deleteOffice/' + item.sto_office_id)
            .then(() => this.office_opts.splice(index, 1));
        }
      },

      getActivities() {
        return axios.get('activities').then((result) => {
          this.activities = result.data;
        });
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          return axios.put('updateOffice/'  + this.editedItem.sto_office_id, this.editedItem).then((result) => {
            if (result.data.success) {
              Object.assign(this.office_opts[this.editedIndex], this.editedItem);
              this.close();
            }
          }).catch(error => console.log(error));
        } else {
          return axios.post('offices/add', this.editedItem)
            .then(() => this.$router.go());
        }
        this.close();
      }
    }
  }
</script>

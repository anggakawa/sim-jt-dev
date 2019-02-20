<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Activity Control</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout  row wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.activity_name" label="Activity name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.activity_description" label="Activity Description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="roles" v-model="editedItem.role_id" item-text="role_name" item-value="role_id" label="User Role" required></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="options_select" v-model="editedItem.require_attachment" item-text="text" item-value="value" label="Require Attachment" required></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="options_select" v-model="editedItem.require_information" item-text="text" item-value="value" label="Require Information" required></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="options_select" v-model="editedItem.require_status" item-text="text" item-value="value" label="Require Status" required></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="options_select" v-model="editedItem.can_close" item-text="text" item-value="value" label="Can Close" required></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select :items="options_select" v-model="editedItem.can_choose_vendor" item-text="text" item-value="value" label="Can Choose Vendor" required></v-select>
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
      :headers="headers" :items="activities"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.activity_id }}</td>
        <td>{{ props.item.activity_name }}</td>
        <td>{{ props.item.activity_description }}</td>
        <td>{{ props.item.role_name }}</td>
        <td>{{ YesOrNo(props.item.require_status) }}</td>
        <td>{{ YesOrNo(props.item.require_information) }}</td>
        <td>{{ YesOrNo(props.item.require_attachment) }}</td>
        <td>{{ YesOrNo(props.item.can_close) }}</td>
        <td>{{ YesOrNo(props.item.can_choose_vendor) }}</td>
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
    </v-data-table>
  </v-container>
</template>

<script>
  import axios from '@/services/service.api.js';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Activity ID', 
          value: 'activity_id',
        },
        {
          text: 'Nama Aktivitas',
          value: 'activity_name',
        },
        { text: 'Deskripsi Aktivitas', value: 'activity_description' },
        { text: 'Role', value: 'role_name' },
        { text: 'Require Status', value: 'require_status' },
        { text: 'Require Information', value: 'require_information' },
        { text: 'Require Attachment', value: 'require_attachment'},
        { text: 'Can Close', value: 'can_close' },
        { text: 'Can Choose Vendor', value: 'can_choose_vendor' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      activities: [],
      roles: [],
      options_select: [
        {
          text: 'Ya', 
          value: 1,
        },
        {
          text: 'Tidak', 
          value: 0,
        },
      ],
      editedIndex: -1,
      editedItem: {
        activity_id: 0,
        activity_name: '',
        activity_description: '',
        role_id: 0,
        require_status: '',
        require_information: '', 
        require_attachment: '',
        can_close: '',
        can_choose_vendor: '',
      },
      defaultItem: {
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize();
      this.getRoles();
    },

    methods: {

      YesOrNo(item) {
        return item === 1 ? 'Ya' : 'Tidak';
      },

      initialize () {
        return axios.get('activities')
          .then(result => this.activities = result.data);
      },
      
      getRoles () {
        return axios.get('roles')
          .then((result) => this.roles = result.data);
      },

      editItem (item) {
        this.editedIndex = this.activities.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.activities.indexOf(item);
        if(confirm('Are you sure you want to delete this item?')) {
          return axios.delete('activity/' + item.activity_id)
            .then(() => this.activities.splice(index, 1));
        }
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
          Object.assign(this.activities[this.editedIndex], this.editedItem)
        } else {
          return axios.post('activity/add', this.editedItem)
            // .then(() => this.activities.push(this.editedItem))
            // .then(() => this.close())
            .then(() => this.$router.go());
        }
        this.close();
      }
    }
  }
</script>

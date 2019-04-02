<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Activity Connections</v-toolbar-title>
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
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select :items="activities" v-model="editedItem.activity_id" item-text="activity_name" item-value="activity_id" label="Activity ID" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="activities" v-model="editedItem.activity_next_id" item-text="activity_name" item-value="activity_id" label="Activity Next ID" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="activities" v-model="editedItem.activity_alternate_id" item-text="activity_name" item-value="activity_id" label="Activity Alternate ID" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="activities" v-model="editedItem.activity_back_id" item-text="activity_name" item-value="activity_id" label="Activity Back ID" required></v-select>
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
      :headers="headers" :items="activity_cons"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.activity_name }}</td>
        <td>{{ convertToActivity(props.item.activity_next_id) }}</td>
        <td>{{ convertToActivity(props.item.activity_alternate_id) }}</td>
        <td>{{ convertToActivity(props.item.activity_back_id) }}</td>
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
        <span>there's no data :(</span>
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
        text: 'Nama Aktivitas',
        value: 'activity_name',
      },
      { text: 'Aktivitas Selanjutnya', value: 'activity_next_id' },
      { text: 'Aktivitas Alternative', value: 'activity_alt_id' },
      { text: 'Aktivitas Sebelumnya', value: 'activity_back_id' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    activities: [],
    activity_cons: [],
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
      activity_next_id: null,
      activity_alternate_id: null,
      activity_back_id: null,
    },
    defaultItem: {
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
    this.getAllActivities();
  },

  methods: {

    convertToActivity(item) {
      const activities = this.activities;
      for (let index = 0; index < activities.length; index++) {
        const element = activities[index];
        if (element.activity_id === item) {
          return element.activity_name;
        }
      }
    },

    initialize() {
      return axios.get('activity-step/all')
        .then(result => this.activity_cons = result.data);
    },

    getAllActivities() {
      return axios.get('activities')
        .then(result => this.activities = result.data)
        .then(() => this.activities.push({
          activity_name: 'NULL',
          activity_id: null,
        }));
    },

    editItem(item) {
      this.editedIndex = this.activity_cons.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.activity_cons.indexOf(item);
      if (confirm('Are you sure you want to delete this item?')) {
        return axios.delete(`activity-step/${item.activity_connections_id}`)
          .then(() => this.activity_cons.splice(index, 1));
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios.put('activity-step/', this.editedItem)
          .then((result) => {
            if (result.data.success) {
              Object.assign(this.activity_cons[this.editedIndex], this.editedItem);
              this.close();
            }
          });
      } else {
        return axios.post('activity-step', this.editedItem)
          .then((res) => {
            this.$router.go();
          });
      }
    },
  },
};
</script>

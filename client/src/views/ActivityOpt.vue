<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Activity Options</v-toolbar-title>
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
                  <v-select :items="activities" v-model="editedItem.activity_id"
                    item-text="activity_name" item-value="activity_id" label="Activity" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.option_text" label="Option Text"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select :items="option_values" v-model="editedItem.option_value"
                    item-text="text" item-value="value" label="Option Value" required></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.value_description" label="Value Description"></v-text-field>
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
      :headers="headers" :items="activity_opts"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.activity_options_id }}</td>
        <td>{{ props.item.activity_name }}</td>
        <td>{{ props.item.option_text }}</td>
        <td>{{ props.item.option_value }}</td>
        <td>{{ props.item.value_description }}</td>
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
      {
        text: 'Activity Options ID',
        value: 'activity_options_id',
      },
      {
        text: 'Nama Aktivitas',
        value: 'activity_name',
      },
      { text: 'Option Text', value: 'option_text' },
      { text: 'Option Value', value: 'option_value' },
      { text: 'Value Description', value: 'value_description' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    activity_opts: [],
    activities: [],
    editedIndex: -1,
    editedItem: {
      activity_options_id: '',
      activity_id: '',
      option_text: '',
      option_value: '',
      value_description: '',
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
    this.getActivities();
  },

  methods: {

    initialize() {
      return axios.get('activity-options/all')
        .then(result => this.activity_opts = result.data);
    },

    editItem(item) {
      this.editedIndex = this.activity_opts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.activity_opts.indexOf(item);
      if (confirm('Are you sure you want to delete this item?')) {
        return axios.delete(`activity-options/${item.activity_options_id}`)
          .then(() => this.activity_opts.splice(index, 1));
      }
    },

    getActivities() {
      return axios.get('activities').then((result) => {
        this.activities = result.data;
      });
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
        return axios.put('activity-options/edit', this.editedItem).then((result) => {
          if (result.data.success) {
            Object.assign(this.activity_opts[this.editedIndex], this.editedItem);
            this.close();
          }
        }).catch(error => console.log(error));
      }
      return axios.post('activity-options', this.editedItem)
        .then(() => this.$router.go());

      this.close();
    },
  },
};
</script>

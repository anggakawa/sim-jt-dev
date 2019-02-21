<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 style="margin: 20px">Tugas</h2>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line
              hide-details></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="tasks" :search="search">
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.order_id }}</td>
              <td>{{ props.item.activity_name }}</td>
              <td>
                <router-link :to="{ name: 'order', 
              params: { order_id: props.item.order_id } }">
                  Lihat
                </router-link>
              </td>
            </template>
            <template slot="no-data">
              <v-alert :value="true" color="green darken-2" icon="info">
                Yeay, saat ini sedang tidak ada tugas
              </v-alert>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from '@/services/service.api.js';

  export default {
    data() {
      return {
        search: '',
        headers: [{
            text: 'Order ID',
            align: 'center',
            sortable: false,
            value: 'order_id'
          },
          {
            text: 'Aktivitas',
            value: 'activity_name'
          },
          {
            text: 'Aksi'
          }
        ],
        tasks: []
      }
    },
    methods: {
      getTasks() {
        axios.get('/tasks/' + this.$store.getters.roleStatus)
          .then((result) => this.tasks = result.data);
      }
    },
    created() {
      this.getTasks();
    }
  }

</script>

<style>

</style>

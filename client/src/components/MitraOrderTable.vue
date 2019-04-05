<template>
  <v-card>
    <v-card-title>
      <h2 style="margin: 20px">Mitra Review</h2>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="dataMitra" :search="search">
      <template slot="items" slot-scope="props">
        <td>{{ changeDate(props.item.date) }}</td>
        <td>{{ props.item.user_description }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.order_id }}</td>
        <td>
          <v-chip v-if="props.item.open_status === 1" color="green" text-color="white">{{
            checkStatus(props.item.open_status) }}</v-chip>
          <v-chip v-if="props.item.open_status === 2" color="red" text-color="white">{{
            checkStatus(props.item.open_status) }}</v-chip>
          <v-chip v-if="props.item.open_status === 3" color="grey darken-2" text-color="white">{{
            checkStatus(props.item.open_status) }}</v-chip>
          <v-chip v-if="props.item.open_status === 4" color="blue darken-2" text-color="white">{{
            checkStatus(props.item.open_status) }}</v-chip>
        </td>
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
</template>

<script>
import axios from '@/services/service.api.js';
import moment from 'moment';

export default {
  data() {
    return {
      search: '',
      loaded: false,
      headers: [
        {
          text: 'Tanggal',
          value: 'date',
        },
        {
          text: 'User Description',
          align: 'center',
          value: 'user_description',
        },
        {
          text: 'username',
          value: 'username',
        },
        {
          text: 'Order ID',
          value: 'order_id',
        },
        {
          text: 'Status',
          value: 'open_status',
        },
        {
          text: 'Lihat',
          sortable: false,
        },
      ],
      vendor_history: [],
    };
  },
  methods: {
    changeDate(props) {
      return moment(props).format('DD MMMM YYYY');
    },
    checkStatus(props) {
      if (props === 1) {
        return 'ONGOING';
      } if (props === 2) {
        return 'CLOSED';
      } if (props === 3) {
        return 'CANCELED';
      }
      return 'FINISHING';
    },
  },
  mounted() {
    // this.vendor_history = this.dataMitra;
  },
  props: ['data-mitra'],
};
</script>

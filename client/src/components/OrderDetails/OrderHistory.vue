<template>
  <v-layout row wrap>
    <v-flex xs12>
          <h2>Riwayat Order</h2>
        </v-flex>

        <v-flex xs12 class="new-table">
          <v-data-table :headers="headers" :items="order_logs"
            class="elevation-5" :rows-per-page-items="[10,20,30]">
            <template slot="items" slot-scope="props">
              <td>{{ new Date(props.item.date).toISOString().slice(0, 19).replace('T', ' ') }}</td>
              <td class="text-xs-left">{{  props.item.username }}</td>
              <td class="text-xs-left">{{ props.item.user_description }}</td>
              <td class="text-xs-left">{{ props.item.activity_name }}</td>
              <td class="text-xs-left">{{ props.item.information }}</td>
              <td class="text-xs-left">{{ props.item.attachment_name }}</td>
              <td class="text-xs-left">{{ props.item.attachment_id }}</td>
            </template>
          </v-data-table>
        </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [{
        text: 'Tanggal',
        value: '',
      },
      {
        text: 'User',
        value: '',
      },
      {
        text: 'Loker',
        value: '',
      },
      {
        text: 'Aktivitas',
        value: '',
      },
      {
        text: 'Keterangan',
        value: '',
      },
      {
        text: 'Nama Lampiran', 
        value: '',
      },
      {
        text: 'Lampiran',
        value: '',
      },
      ],
      order_logs: [],
      headers_activity: [{
        text: 'Nomor',
        value: 'number',
        sortable: true,
      },
      {
        text: 'Task',
        value: '',
        sortable: false,
      },
      {
        text: 'Action',
        value: '',
        sortable: false,
      },
      ],
      task_description: 'Hello there',
      options: [
        { text: 'YES', value: true },
        { text: 'NO', value: false },
      ],
    };
  },
  methods: {
    initialize() {
      return axios.get('http://localhost:3000/api/order-history/' + this.$route.params.order_id)
        .then(result => {
          this.order_logs = result.data
        });
    }
  }, 
  created() {
    this.initialize();
  },
}
</script>

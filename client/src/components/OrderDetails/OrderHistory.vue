<template>
  <v-layout row wrap>
    <v-flex xs12>
          <h2>Riwayat Order</h2>
        </v-flex>

        <v-flex xs12 class="new-table">
          <v-data-table :headers="headers" :items="order_logs"
            class="elevation-5" :rows-per-page-items="[10,20,30]">
            <template slot="items" slot-scope="props">
              <td>{{ changeDate(props.item.date) }}</td>
              <td class="text-xs-left">{{  props.item.username }}</td>
              <td class="text-xs-left">{{ props.item.user_description }}</td>
              <td class="text-xs-left">{{ props.item.activity_name }}</td>
              <td class="text-xs-left">{{ props.item.information }}</td>
              <td class="text-xs-left">{{ props.item.attachment_name }}</td>
              <td class="text-xs-left">
                <!-- <a v-show="props.item.order_attachment_id > 0"
                  :href="downloadFile(props.item.order_attachment_id)">Download File</a> -->
                <v-btn class="download-btn" color="info" v-show="props.item.order_attachment_id > 0"
                  @click="downloadFile(props.item.order_attachment_id, props.item.attachment_name)">Download File</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/services/service.api.js';
import moment from 'moment';

export default {
  data() {
    return {
      headers: [{
        text: 'Tanggal',
        value: 'date',
      },
      {
        text: 'User',
        value: 'username',
      },
      {
        text: 'Loker',
        value: 'user_description',
      },
      {
        text: 'Aktivitas',
        sortable: false,
      },
      {
        text: 'Keterangan',
        sortable: false,
      },
      {
        text: 'Nama Lampiran',
        sortable: false,
      },
      {
        text: 'Lampiran',
        sortable: false,
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
      return axios.get(`order-history/${this.$route.params.order_id}`)
        .then((result) => {
          this.order_logs = result.data;
        });
    },
    downloadFile(props, name) {
      return axios({
        method: 'get',
        url: 'download/' + props,
        responseType: 'blob'
        }).then(result => {
          // console.log(result);
          const url = window.URL.createObjectURL(new Blob([result.data], { type: result.data.type}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name);
          document.body.appendChild(link);
          link.click();
        });

      // untuk download
      // return `http://localhost:3000/api/download/${props}`;
      // return axios.get(`download/${props}`);
    },
    changeDate(props) {
      return moment(props).format('DD MMMM YYYY, HH:mm:ss');
    },
  },
  created() {
    this.initialize();
  },
};
</script>

<style>
.download-btn {
  max-width: 80px;
  font-size: 10px;
}
</style>


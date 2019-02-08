<template>
  <v-layout row wrap>
    <v-flex xs12>
          <h2>Riwayat Order</h2>
        </v-flex>

        <v-flex xs12 class="new-table">
          <v-data-table :headers="headers" :items="order_logs"
            class="elevation-5" :rows-per-page-items="[10,20,30]">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.log_date }}</td>
              <td class="text-xs-left">{{ props.item.username }}</td>
              <td class="text-xs-left">{{ props.item.user_description }}</td>
              <td class="text-xs-left">{{ props.item.activity }}</td>
              <td class="text-xs-left">{{ props.item.information }}</td>
              <td class="text-xs-left">{{ props.item.attachment_id }}</td>
            </template>
          </v-data-table>
        </v-flex>
  </v-layout>
</template>

<script>
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
        text: 'Lampiran',
        value: '',
      },
      ],
      order_logs: [{
        log_date: new Date().toDateString(),
        username: 'anggakawa',
        user_description: 'Admin',
        information: 'Inisiasi Pengerjaan',
        activity: 'Initialization',
        attachment_id: 1,
      },
      {
        log_date: new Date().toDateString(),
        username: 'ccan_user',
        user_description: 'CCAN',
        information: 'Pembuatan NDE, sudah menyerahkan',
        activity: 'Pembuatan NDE',
        attachment_id: 2,
      },
      ],
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
}
</script>

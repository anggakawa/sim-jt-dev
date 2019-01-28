<template>
  <v-container grid-list-xl>
    <v-card style="padding: 20px">
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Detail Order</h2>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="date" readonly label="Tanggal">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="params" readonly label="Nomor Order">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="customer_name" readonly label="Nama Pelanggan">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="customer_address" readonly label="Alamat Pelanggan">
          </v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-text-field v-model="customer_coordinat_latitude"
            readonly label="Koordinat Pelanggan (Latitude)">
          </v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-text-field v-model="customer_coordinat_longitude"
            readonly label="Koordinat Pelanggan (Longitude)">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="sto_office" readonly label="Kantor STO"> // gunakan select
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="pic_name" readonly label="Nama PIC">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="pic_contact" readonly label="Kontak PIC">
          </v-text-field>
        </v-flex>
        <v-flex xs6 v-if="vendor_name.length > 0">
          <v-text-field v-model="vendor_name" readonly label="Nama Vendor">
          </v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>

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

        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <h2>Aktivitas</h2>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <span class="headline">To Do List</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 style="font-size: 18px">
                    {{ task_description }}
                  </v-flex>
                  <v-flex xs12>
                    <v-select v-model="selected_option" :items="options"
                      :item-text="text" :item-value="value" label="Keputusan" required></v-select>
                  </v-flex>
                  <v-flex xs12 v-show="true">
                    <v-textarea name="input-7-1" box label="Keterangan" auto-grow></v-textarea>
                  </v-flex>
                  <v-flex xs12 v-show="true">
                    <input type="file" name="Upload Dokumen">
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="purple" flat>Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      params: '',
      date: new Date(),
      customer_name: 'Angga',
      service_name: 'ASTINET_100MBPS',
      sto_office: 'WITEL BANJARMASIN',
      customer_address: 'JL. Pahlawan Nomor 21 Banjarmasin',
      customer_coordinat_latitude: '3.21314',
      customer_coordinat_longitude: '-21.21314',
      pic_contact: '081123131xxx',
      pic_name: 'Lukman',
      vendor_name: 'Telkom',
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
  mounted() {
    if (this.$route.params.order_id) {
      this.params = this.$route.params.order_id;
    }
  },
};

</script>

<style scoped>

</style>

<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Order Baru</span>
          </v-card-title>
          <!-- form template -->
          <v-card-text>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.order_id" label="Nomor Order"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.customer_name"
                    label="Nama Pelanggan"></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-menu :close-on-content-click="false" v-model="calendar_menu"
                    :nudge-right="40" lazy transition="scale-transition" offset-y
                    full-width min-width="290px">
                    <v-text-field slot="activator" v-model="editedItem.date" label="Tanggal"
                      prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="editedItem.date"
                      @input="calendar_menu = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex md6>
                  <v-text-field v-model="editedItem.service_name"
                    prepend-icon="network_wifi" label="Jenis Layanan"></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field v-model="editedItem.customer_coordinat_latitude"
                    label="Latitude" prepend-icon="place"></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field v-model="editedItem.customer_coordinat_longitude"
                    label="Longitude"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.customer_address"
                    label="Alamat Pelanggan"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.sto_office"
                    label="Kantor STO"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.pic_name"
                    label="Nama PIC"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.pic_contact"
                    label="Kontak PIC"></v-text-field>
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
    <v-data-table :headers="headers" :items="orders" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.order_id }}</td>
        <td class="text-xs-left">{{ props.item.customer_name }}</td>
        <td class="text-xs-left">{{ props.item.service_name }}</td>
        <td class="text-xs-left">{{ props.item.sto_office }}</td>
        <td class="justify-center" v-if="true">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
        <td>
          <router-link :to="{ name: 'order',
            params: { order_id: props.item.order_id }}">Lihat</router-link>
        </td>
      </template>
      <template slot="no-data">
        There's no data to display
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    calendar_menu: false,
    headers: [{
      text: 'Tanggal',
      value: 'date',
      sortable: true,
    },
    {
      text: 'Nomor Order',
      align: 'left',
      sortable: false,
      value: 'order_id',
    },
    {
      text: 'Nama Pelanggan',
      value: 'customer_name',
    },
    {
      text: 'Jenis Layanan',
      value: 'service_name',
    },
    {
      text: 'STO',
      value: 'sto_office',
    },
    {
      text: 'Actions',
      value: 'action',
      sortable: false,
    },
    {
      text: 'Links',
      value: 'links',
      sortable: false,
    },
    ],
    orders: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      order_id: '',
      customer_name: '',
      service_name: '',
      sto_office: '',
      customer_address: '',
      customer_coordinat_latitude: '',
      customer_coordinat_longitude: '',
      pic_contact: '',
      pic_name: '',
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
  },

  methods: {
    initialize() {
      this.orders = [{
        date: '2019-10-1',
        order_id: 'IDN2299080',
        customer_name: 'Angga',
        service_name: 'ASTINET_500MBPS',
        sto_office: 'Witel Kalsel',
      },
      {
        date: '2018-10-02',
        order_id: 'ID112341',
        customer_name: 'Jarwo',
        service_name: 'ASTINET_500MBPS',
        sto_office: 'Witel Kalsel',
      },
      {
        date: '2019-01-01',
        order_id: 'IDN2080',
        customer_name: 'Rika',
        service_name: 'ASTINET_100MBPS',
        sto_office: 'Witel Kalsel',
      },
      ];
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item);
      confirm('Are you sure you want to delete this item?') && this.orders.splice(index, 1);
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
        Object.assign(this.orders[this.editedIndex], this.editedItem);
      } else {
        this.orders.push(this.editedItem);
      }
      this.close();
    },
  },
};

</script>

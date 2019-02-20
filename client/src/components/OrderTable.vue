<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Orders</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="red darken-3" dark class="mb-2" v-if="this.$store.getters.roleStatus === '1' || this.$store.getters.roleStatus === '4'">New Item</v-btn>
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
                  <v-select :items="offices" v-model="editedItem.sto_office_id" 
                    item-text="sto_office_name" item-value="sto_office_id" label="Kantor STO" required></v-select>
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
    <v-data-table :headers="headers" :items="orders" class="elevation-1" :pagination.sync="pagination">
      <template slot="headers" slot-scope="props">
          <th v-for="header in props.headers" :key="header.text" 
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)" class="text-xs-left" 
          >
          <v-icon small>arrow_upward</v-icon>
          {{ header.text }}
          </th>
          <th v-if="checkIfAdmin()">Aksi</th>
      </template>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.order_id }}</td>
        <td class="text-xs-left">
          <v-chip v-if="props.item.open_status" color="green" text-color="white">{{ checkStatus(props.item.open_status) }}</v-chip>
          <v-chip v-else color="red" text-color="white">{{ checkStatus(props.item.open_status) }}</v-chip>
        </td>
        <td class="text-xs-left">{{ props.item.customer_name }}</td>
        <td class="text-xs-left">{{ props.item.service_name }}</td>
        <td class="text-xs-left">{{ props.item.sto_office_name }}</td>
        <td>
          <router-link :to="{ name: 'order',
            params: { order_id: props.item.order_id }}">Lihat</router-link>
        </td>
        <td v-if="checkIfAdmin()" class="justify-center">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">
        There's no data to display
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    pagination: {
      sortBy: 'order_id'
    },
    calendar_menu: false,
    headers: [{
      text: 'Tanggal',
      value: 'date',
    },
    {
      text: 'Nomor Order',
      align: 'left',
      sortable: false,
      value: 'order_id',
    },
    {
      text: 'Status',
      value: 'open_status'
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
      text: 'Links',
      value: 'links',
      sortable: false,
    },
    ],
    orders: [],
    offices: [],
    editedIndex: -1,
    editedItem: {
      date: '',
      order_id: '',
      customer_name: '',
      service_name: '',
      sto_office_id: '',
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
    async initialize() {
      await Promise.all([
        axios.get('http://localhost:3000/api/orders')
          .then((result) => this.orders = result.data),
        axios.get('http://localhost:3000/api/offices')
          .then((result) => this.offices = result.data)  
      ]);
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item);
      if(confirm('Are you sure you want to delete this item?')){
        axios.delete('http://localhost:3000/api/order/' + item.order_id)
          .then(() => this.$router.go());
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
        Object.assign(this.orders[this.editedIndex], this.editedItem);
      } else {
        axios.post('http://localhost:3000/api/orders/add', this.editedItem)
          .then(() => this.$router.go());
      }
      this.close();
    },

    checkIfAdmin() {
      return this.$store.getters.roleStatus === '1';
    },
    
    checkStatus(props) {
      return props ? 'ONGOING' : 'CLOSED';
    }, 

    changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }

  },
};

</script>

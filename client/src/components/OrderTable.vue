<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs2>
        <v-card color="yellow darken-2" class="white--text" @click="changeOrder(0)" style="cursor: pointer">
          <v-card-title primary-title>
            <div>
              <h3 class="title font-weight-medium">Total</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center font-weight-medium display-1">
              {{ countAllOrder }}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs2>
        <v-card id="order-ongoing" color="green darken-2" class="white--text" @click="changeOrder(1)" style="cursor: pointer">
          <v-card-title primary-title>
            <div>
              <h3 class="title font-weight-medium">Order Ongoing</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center font-weight-medium display-1">
              {{ countOrderOpen }}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs2>
        <v-card color="red darken-2" class="white--text" @click="changeOrder(2)" style="cursor: pointer">
          <v-card-title primary-title>
            <div>
              <h3 class="title font-weight-medium">Order Closed</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center font-weight-medium display-1">
              {{countOrderClosed }}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs2>
        <v-card color="grey darken-2" class="white--text" @click="changeOrder(3)" style="cursor: pointer">
          <v-card-title primary-title>
            <div>
              <h3 class="title font-weight-medium">Canceled Order</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center font-weight-medium display-1">
              {{countCanceledOrder}}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs2>
        <v-card color="blue darken-2" class="white--text" @click="changeOrder(4)" style="cursor: pointer">
          <v-card-title primary-title>
            <div>
              <h3 class="title font-weight-medium">Finishing Order</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="text-xs-center font-weight-medium display-1">
              {{countFinishingOrder}}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-toolbar flat color="white">
            <v-toolbar-title>Orders</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line
              hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <v-btn slot="activator" color="red darken-3" dark class="mb-2" v-if="this.$store.getters.roleStatus === '1' || this.$store.getters.roleStatus === '4'">New
                Item</v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>
                <!-- form template -->
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field :disabled="!checkEditedIndex" v-model="editedItem.order_id" label="Nomor Order"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.customer_name" label="Nama Pelanggan"></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-menu :close-on-content-click="false" v-model="calendar_menu"
                          :nudge-right="40" lazy transition="scale-transition" offset-y full-width
                          min-width="290px">
                          <v-text-field slot="activator" v-model="editedItem.date" label="Tanggal"
                            prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="editedItem.date" @input="calendar_menu = false"></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex md6>
                        <!-- <v-text-field v-model="editedItem.service_name" prepend-icon="network_wifi"
                          label="Jenis Layanan"></v-text-field> -->
                        <v-select :items="telkom_services" v-model="editedItem.service_name"
                          label="Jenis Layanan" required></v-select>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field v-model="editedItem.customer_coordinat_latitude" label="Latitude"
                          prepend-icon="place"></v-text-field>
                      </v-flex>
                      <v-flex md6>
                        <v-text-field v-model="editedItem.customer_coordinat_longitude" label="Longitude"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.customer_address" label="Alamat Pelanggan"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-select :items="offices" v-model="editedItem.sto_office_id" item-text="sto_office_name"
                          item-value="sto_office_id" label="Kantor STO" required></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.pic_name" label="Nama PIC"></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field v-model="editedItem.pic_contact" label="Kontak PIC"></v-text-field>
                      </v-flex>
                      <v-flex xs12 v-if="checkEditedIndex">
                        <v-textarea name="input-7-1" box label="Keterangan" v-model="editedItem.information"
                          auto-grow></v-textarea>
                      </v-flex>
                      <v-flex xs12 v-if="!checkEditedIndex">
                        <v-text-field label="Keterangan"
                         hint="1 for Ongoing, 2 for Closed, 3 for Canceled, 4 for Finishing" type="number" v-model="editedItem.open_status" persistent-hint></v-text-field>
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
          <v-data-table :search="search" :headers="headers" :items="orders" class="elevation-1" :pagination.sync="pagination"
            :rows-per-page-items="[25,50,100]">
            <template slot="headers" slot-scope="props" class="table-headers">
              <th v-show="checkIfAdmin()">Aksi</th>
              <th v-for="header in props.headers" :key="header.text" :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)" class="text-xs-left">
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </template>
            <template slot="items" slot-scope="props">
              <tr style="cursor: pointer" @click="linkto(props.item.order_id)">
              <td v-show="checkIfAdmin()" class="justify-center">
                <v-chip>
                  <v-icon small class="mr-2" @click.stop="editItem(props.item)">
                    edit
                  </v-icon>
                  <v-icon small @click.stop="deleteItem(props.item)">
                    delete
                  </v-icon>
                </v-chip>
              </td>
              <td>{{ changeDate(props.item.date) }}</td>
              <td class="text-xs-left">{{ props.item.order_id }}</td>
              <td class="text-xs-left">
                <v-chip v-if="props.item.open_status === 1" color="green" text-color="white">{{
                  checkStatus(props.item.open_status) }}</v-chip>
                <v-chip v-if="props.item.open_status === 2" color="red" text-color="white">{{
                  checkStatus(props.item.open_status) }}</v-chip>
                <v-chip v-if="props.item.open_status === 3" color="grey darken-2" text-color="white">{{
                  checkStatus(props.item.open_status) }}</v-chip>
                <v-chip v-if="props.item.open_status === 4" color="blue darken-2" text-color="white">{{
                  checkStatus(props.item.open_status) }}</v-chip>
              </td>
              <td class="text-xs-left">{{ props.item.customer_name }}</td>
              <td class="text-xs-left">{{ props.item.service_name }}</td>
              <td class="text-xs-left">{{ props.item.activity_name }}</td>
              <td class="text-xs-left">{{ props.item.role_name }}</td>
              <td class="text-xs-left">{{ props.item.user_description }}</td>
              <td class="text-xs-left">{{ props.item.sto_office_name }}</td>
              <!-- <td>
                <router-link :to="{ name: 'order',
              params: { order_id: props.item.order_id }}">Lihat</router-link>
              </td> -->
              </tr>
            </template>
            <template slot="no-data">
              There's no data to display
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '@/services/service.api.js';
import moment from 'moment';

export default {
  data: () => ({
    search: '',
    dialog: false,
    order_origin: [],
    order_open: [],
    order_closed: [],
    order_canceled: [],
    order_finishing: [],
    pagination: {
      sortBy: 'order_id',
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
      value: 'open_status',
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
      text: 'Aktivitas',
      value: 'activity_name',
    },
    {
      text: 'Loker',
      value: 'role_name',
    },
    {
      text: 'Nama Mitra',
      value: 'user_description'
    },
    {
      text: 'STO',
      value: 'sto_office',
    },
      // {
      //   text: 'Links',
      //   value: 'links',
      //   sortable: false,
      // },
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
      information: '',
      open_status: '',
    },
    defaultItem: {

    },
    telkom_services: [
      'VPN IP', 'ASTINET', 'METRO', 'IP PBX', 'OTHERS',
    ],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },

    checkEditedIndex() {
      return this.editedIndex === -1;
    },

    countOrderOpen() {
      return this.order_open.length;
    },

    countOrderClosed() {
      return this.order_closed.length;
    },

    countAllOrder() {
      return this.order_origin.length;
    },

    countCanceledOrder() {
      return this.order_canceled.length;
    },

    countFinishingOrder() {
      return this.order_finishing.length;
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
      Promise.all([
        axios.get('orders')
          .then((result) => {
            // console.log(result.data);
            this.orders = result.data;
            this.order_origin = result.data;
            this.order_open = result.data.filter(value => value.open_status === 1);
            this.order_closed = result.data.filter(value => value.open_status === 2);
            this.order_canceled = result.data.filter(value => value.open_status === 3);
            this.order_finishing = result.data.filter(value => value.open_status === 4);
          }),
        axios.get('offices')
          .then(result => this.offices = result.data),
      ]);
    },

    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item);
      this.$swal("Are you sure?", {
        buttons: true
      }).then((confirm) => {
        if (confirm) {
          axios.delete(`order/${item.order_id}`)
            .then(() => this.$router.go());
        }
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
        axios.put('order/edit', this.editedItem).then((result) => {
          if (result.data.success) {
            window.alert('Data berhasil diubah');
            Object.assign(this.orders[this.editedIndex], this.editedItem);
          }
        });
      } else {
        axios.post('orders/add', this.editedItem)
          .then(() => this.$router.go());
      }
      this.close();
    },

    checkIfAdmin() {
      return this.$store.getters.roleStatus === '1';
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

    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },

    changeOrder(checker) {
      if (checker === 0) {
        this.orders = this.order_origin;
      } else if (checker === 1) {
        this.orders = this.order_open;
      } else if (checker === 2) {
        this.orders = this.order_closed;
      } else if (checker === 3) {
        this.orders = this.order_canceled;
      } else {
        this.orders = this.order_finishing;
      }
    },

    linkto(props) {
      this.$router.push({
        name: 'order',
        params: { order_id: props },
      });
    },

    changeDate(props) {
      return moment(props).format('DD-MMMM-YYYY');
    },

  },
};

</script>

<style>
  table.v-table tbody tr td {
    font-size: 12px;
    /* margin: 0px; */
  }
  table.v-table thead tr th{
    font-size: 10px;
  }
</style>

<template>
  <v-layout row wrap>
      <v-flex xs6>
        <h2>Detail Order</h2>
      </v-flex>
      <v-flex xs6 class="text-xs-right">
        <!-- <v-chip v-if="order_desc.open_status" color="green" text-color="white">{{ checkStatus(order_desc.open_status) }}</v-chip>
        <v-chip v-else color="red" text-color="white">{{ checkStatus(order_desc.open_status) }}</v-chip> -->
        <v-chip v-if="order_desc.open_status === 1" color="green" text-color="white">{{
                  checkStatus(order_desc.open_status) }}</v-chip>
                <v-chip v-if="order_desc.open_status === 2" color="red" text-color="white">{{
                  checkStatus(order_desc.open_status) }}</v-chip>
                <v-chip v-if="order_desc.open_status === 3" color="grey darken-2" text-color="white">{{
                  checkStatus(order_desc.open_status) }}</v-chip>
                <v-chip v-if="order_desc.open_status === 4" color="blue darken-2" text-color="white">{{
                  checkStatus(order_desc.open_status) }}</v-chip>
      </v-flex>
    <v-flex xs6>
      <v-text-field :value="changeDate(order_desc.date)" readonly label="Tanggal">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.order_id" readonly label="Nomor Order">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.customer_name" readonly label="Nama Pelanggan">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.customer_address" readonly label="Alamat Pelanggan">
      </v-text-field>
    </v-flex>
    <v-flex xs3>
      <v-text-field v-model="order_desc.customer_coordinat_latitude" readonly label="Koordinat Pelanggan (Latitude)">
      </v-text-field>
    </v-flex>
    <v-flex xs3>
      <v-text-field v-model="order_desc.customer_coordinat_longitude" readonly label="Koordinat Pelanggan (Longitude)">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.sto_office_name" readonly label="Kantor STO">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.pic_name" readonly label="Nama PIC">
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-text-field v-model="order_desc.pic_contact" readonly label="Kontak PIC">
      </v-text-field>
    </v-flex>
    <v-flex xs6 v-if="vendor_name.length > 0">
      <v-text-field v-model="vendor_name" readonly label="Nama Vendor">
      </v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '@/services/service.api.js';
import moment from 'moment';

export default {
  data() {
    return {
      order_desc: {},
      vendor_name: 'Tidak Ada',
    };
  },
  created() {
    this.getOrderDetails();
    this.getVendor();
  },
  methods: {
    getOrderDetails() {
      return axios.get(`order/${this.$route.params.order_id}`)
        .then((result) => {
          this.order_desc = result.data[0];
        });
    },
    changeDate(props) {
      return moment(props).format('DD MMMM YYYY, HH:mm:ss');
    },
    getVendor() {
      return axios.get(`order-vendor/${this.$route.params.order_id}`)
        .then((result) => {
          if (result.data.length > 0) {
            this.vendor_name = result.data[0].username;
          }
        });
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
};


</script>

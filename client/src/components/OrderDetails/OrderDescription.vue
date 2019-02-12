<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h2>Detail Order</h2>
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
      <v-text-field v-model="order_desc.sto_office_name" readonly label="Kantor STO"> // gunakan select
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
  import axios from 'axios';

  export default {
    data() {
      return {
        order_desc: {},
        vendor_name: 'Telkom',
      }
    },
    created() {
      this.getOrderDetails();
    },
    methods: {
      getOrderDetails() {
        return axios.get('http://localhost:3000/api/order/' + this.$route.params.order_id)
          .then(result => {  
            this.order_desc = result.data[0]
          });
      }, 
      changeDate(props) {
        return new Date(props).toISOString().slice(0, 19).replace('T', ' ')
      }
    }
  }


</script>

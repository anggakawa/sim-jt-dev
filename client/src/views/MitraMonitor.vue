<template>
  <v-container grid-list-lg v-if="this.$store.getters.roleStatus !== '3'">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title><h2 style="margin-left: 20px">Jumlah Order Yang Diterima Mitra</h2></v-card-title>
          <chart v-if="loaded" :chartdata="vendor_history"/>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <MitraStats />
      </v-flex>
      <v-flex xs12>
        <MitraOrderTable v-if="loaded" :data-mitra="vendor_history"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '@/services/service.api.js';
import chart from '@/components/chart.js';
import MitraOrderTable from '@/components/MitraOrderTable.vue';
import MitraStats from '@/components/MitraStats.vue';
import moment from 'moment';

  export default {
    components: {
      chart,
      MitraOrderTable,
      MitraStats
    },
    data() {
      return {
        loaded: false,
        vendor_history: []
      }
    },
    methods: {
      getVendorHistory() {
        axios.get('/mitra-history/all')
          .then((result) => {
            this.vendor_history = result.data;
            this.loaded = true;
          });
      },
    },
    mounted() {
      this.loaded = false;
      this.getVendorHistory();
    }
  }
</script>

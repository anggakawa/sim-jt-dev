<template>
  <v-container grid-list-xl>
    <v-card style="padding: 40px">
      <OrderDescription />
      <v-divider></v-divider>
      <OrderHistory />
      <v-divider></v-divider>
      <OrderActivity />
    </v-card>
  </v-container>
</template>

<script>
import OrderDescription from './OrderDetails/OrderDescription.vue';
import OrderHistory from './OrderDetails/OrderHistory.vue';
import OrderActivity from './OrderDetails/OrderActivity.vue';


export default {
  components: {
    OrderDescription,
    OrderHistory,
    OrderActivity,
  },
};

</script>

<style scoped>

</style>

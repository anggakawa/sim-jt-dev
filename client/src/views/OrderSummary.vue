<template>
  <OrderTable />
</template>

<script>
// import OrderTable from '../components/OrderTable.vue';
const OrderTable = () => import('../components/OrderTable.vue');

export default {
  components: {
    OrderTable,
  },
};
</script>

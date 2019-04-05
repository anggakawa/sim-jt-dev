<template>
  <OrderTable />
</template>

<script>

const OrderTable = () => import('../components/OrderTable.vue');

export default {
  components: {
    OrderTable,
  },
};
</script>

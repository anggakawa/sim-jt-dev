<template>
  <OrderDetail />
</template>

<script>
const OrderDetail = () => import('../components/OrderDetail.vue');

export default {
  components: {
    OrderDetail,
  },
};
</script>

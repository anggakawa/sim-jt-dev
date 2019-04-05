<template>
  <div>
    <ActivityList />
    <ActivityConn />
  </div>
</template>

<script>
const ActivityList = () => import('../components/ActivityList.vue');
const ActivityConn = () => import('../components/ActivityConn.vue');

export default {
  data() {
    return {

    };
  },
  components: {
    ActivityList,
    ActivityConn,
  },
};
</script>

<template>
  <div>
    <ActivityList />
    <ActivityConn />
  </div>
</template>

<script>
import ActivityList from '../components/ActivityList.vue';
import ActivityConn from '../components/ActivityConn.vue';

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

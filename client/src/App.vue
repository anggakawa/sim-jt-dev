<template>
  <v-app :dark="false">
    <navigation-drawer v-if="this.$route.name !== 'login'"/>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    NavigationDrawer,
  },
};


</script>

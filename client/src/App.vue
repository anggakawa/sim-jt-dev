<template>
  <v-app :dark="false">
    <navigation-drawer v-if="this.$route.name !== 'login'"/>
    <v-content>
      <router-view />
    </v-content>
    <v-footer class="grey darken-3 justify-center white--text">
      <div>&copy;{{ new Date().getFullYear() }} - <strong>Witel Kalsel</strong></div>
    </v-footer>
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

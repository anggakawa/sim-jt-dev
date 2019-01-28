<template>
  <div>

    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app>
      <v-toolbar>
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="{path: item.path}">
          <v-list-tile-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

  </div>

</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      clipped: false,
      items: [
        {
          action: 'home',
          title: 'Home',
          path: '/',
        },
        {
          action: 'dashboard',
          title: 'Dashboard',
          path: '/orders',
        },
      ],
    };
  },
};

</script>

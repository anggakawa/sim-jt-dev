<template>
  <div v-if="this.$store.getters.roleStatus === '1'">
    <v-divider></v-divider>
    <v-list-tile v-for="item in admin_items" :key="item.title" :to="{path: item.path}">
          <v-list-tile-action>
            <v-icon>{{ item.action }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admin_items : [
        {
          action: 'supervisor_account', 
          title: 'Users', 
          path: '/users',
        },
        {
          action: 'timeline',
          title: 'Activities',
          path: '/activities',
        },
        {
          action: 'event_note',
          title: 'Activity Track',
          path: '/activity-track',
        }
      ]
    }
  }
}
</script>

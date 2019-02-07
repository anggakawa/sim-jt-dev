<template>
  <div>
    <UserPanel />
    <RolePanel />
  </div>
</template>

<script>
import UserPanel from '../components/UserPanel.vue';
import RolePanel from '../components/RolePanel.vue';

export default {
  components: {
    UserPanel,
    RolePanel,
  }
}
</script>

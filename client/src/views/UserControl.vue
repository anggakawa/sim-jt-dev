<template>
  <div>
    <UserPanel />
    <RolePanel />
  </div>
</template>

<script>
const UserPanel = () => import('../components/UserPanel.vue');
const RolePanel = () => import('../components/RolePanel.vue');

export default {
  components: {
    UserPanel,
    RolePanel,
  },
};
</script>

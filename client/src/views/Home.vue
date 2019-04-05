<template>
  <div>
    <HelloWorld />
  </div>
</template>

<script>
const HelloWorld = () => import('../components/HelloWorld.vue');

export default {
  components: {
    HelloWorld,
  },
};
</script>

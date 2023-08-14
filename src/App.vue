<script>
// eslint-disable-next-line
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'; // Import the Navbar component
export default {
  components: {
    Navbar,
  },
};
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
</style>

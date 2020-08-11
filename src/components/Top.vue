<template>
  <div class="top">
    <AppHeader />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default {
  name: "Top",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" scoped>
</style>

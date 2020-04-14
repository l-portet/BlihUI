<template>
  <div id="app">
    <ui-traffic-light v-if="showTrafficLight" />
    <ui-spinner :active="loading" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UiTrafficLight from '@/components/ui/UiTrafficLight';
import UiSpinner from '@/components/ui/UiSpinner';

export default {
  name: 'App',
  components: {
    UiSpinner,
    UiTrafficLight
  },
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  created() {
    this.showTrafficLight = process.platform === 'darwin';
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';
</style>

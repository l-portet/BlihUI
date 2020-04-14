<template>
  <vue-element-loading
    :active="active"
    spinner="mini-spinner"
    is-full-screen
    background-color="rgba(0, 0, 0, .3)"
    color="#1768e5"
    duration="0.5"
  />
</template>

<script>
import VueElementLoading from 'vue-element-loading';

export default {
  name: 'UiSpinner',
  props: {
    active: {
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    VueElementLoading
  }
};
</script>

<style lang="scss">
.velmld-spinner {
  animation-name: ScaleUp;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  animation-delay: 0;
  animation-iteration-count: 1;
  animation-direction: normal;
}

@keyframes ScaleUp {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>

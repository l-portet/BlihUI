<template>
  <nav class="ui-nav">
    <router-link :to="backRoute">
      <img src="@/assets/icons/arrow-left.png" alt="arrow left white" />
      Back
    </router-link>
    <slot></slot>
  </nav>
</template>

<script>

export default {
  name: 'UiNav',
  props: {
    backRoute: {
      type: Object,
      required: true
    }
  },
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {}
};
</script>

<style lang="scss">
.ui-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 0;

  a {
    color: rgba(255, 255, 255, 1);
    opacity: 0.8;
    transition: opacity 0.1s ease-in-out;

    &:hover {
      opacity: 1;
    }

    img {
      height: 12px;
      margin-right: 5px;
    }
  }
}
</style>

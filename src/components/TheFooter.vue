<template>
  <footer>
    <the-logo class="logo" />
    <div class="footer-content">
      <slot></slot>
    </div>
  </footer>
</template>

<script>
import TheLogo from '@/components/TheLogo';

export default {
  name: 'TheFooter',
  components: {
    TheLogo
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

footer {
  position: relative;
  // padding: 13px 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
  // padding-left: 80px;

  &:after {
    content: '';
    position: absolute;
    width: calc(100% + 25px * 2);
    left: -25px;
    top: 0;
    margin: 0;
    border: none;
    border-bottom: 2px solid rgba(55, 55, 55, 0.6);
  }

  .logo {
    width: 70px;
    margin-top: 5px;
    pointer-events: none;
  }

  .footer-content {
    width: 100%;
    height: 100%;

    *:not(.footer-content) {
      @extend .no-drag;
    }
  }
}
</style>

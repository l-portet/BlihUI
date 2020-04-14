<template>
  <div class="page page-home">
    <the-header />
    <the-repos-list />
    <the-footer>
      <div class="footer-content">
        <span
          >{{
            $store.getters.repos ? $store.getters.repos.length : 0
          }}
          Repositories</span
        >
        <ui-button
          class="btn-new-repo"
          type="primary"
          @click="$router.push({ name: 'New' })"
          >New</ui-button
        >
      </div>
    </the-footer>
  </div>
</template>

<script>
import UiButton from '@/components/ui/UiButton';
// import UiSpinner from '@/components/ui/UiSpinner';
import TheHeader from '@/components/TheHeader';
import TheReposList from '@/views/Home/TheReposList';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'Home',
  components: {
    UiButton,
    // UiSpinner,
    TheHeader,
    TheReposList,
    TheFooter
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('fetchData');
  }
};
</script>

<style lang="scss">
.page-home {
  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      color: rgba(255, 255, 255, 0.5);
    }

    .btn-new-repo {
      margin-right: 0px;
    }
  }
}
</style>

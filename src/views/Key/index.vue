<template>
  <div class="page page-key">
    <the-header :show-keys-link="false" />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Keys' }"> </ui-nav>
      <h2>Key</h2>
      <h3>{{ key.name }}</h3>
      <textarea v-model="key.data" rows="10" readonly></textarea>
    </div>
    <the-footer>
      <div class="footer-content">
        <ui-button type="danger" class="btn-delete" @click="deleteKey"
          >Delete</ui-button
        >
      </div>
    </the-footer>
  </div>
</template>

<script>
// import UiSpinner from '@/components/ui/UiSpinner';
import UiButton from '@/components/ui/UiButton';
import UiNav from '@/components/ui/UiNav';
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'Keys',
  components: {
    // UiSpinner,
    TheHeader,
    TheFooter,
    UiButton,
    UiNav
  },
  data() {
    return {
      loading: false,
      key: null
    };
  },
  methods: {
    async deleteKey() {
      try {
        this.$store.dispatch('enableLoading');
        await this.$store.dispatch('deleteKey', { name: this.key.name });
      } catch (e) {
        window.alert(`Oops! ${e}.`);
        console.log(e);
      } finally {
        this.$store.dispatch('disableLoading');
        this.$store.dispatch('fetchData');
        this.$router.push({ name: 'Keys' });
      }
    }
  },
  created() {
    this.key = this.$route.params.key;
  }
};
</script>

<style lang="scss">
.page-key {
  .page-content {
  }

  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-delete {
      margin: 0;
    }
  }
}
</style>

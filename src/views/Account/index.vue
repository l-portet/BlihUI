<template>
  <div class="page page-account">
    <ui-spinner :active="loading" />
    <the-header />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Home' }">
        <span class="changes-status">{{ changesState }}</span>
      </ui-nav>
      <h2>Account</h2>
      <label>
        Display name
        <input v-model="displayName" type="text" />
      </label>
    </div>
    <the-footer>
      <div class="footer-content">
        <ui-button class="btn-new-repo" type="danger" @click="logout"
          >Log out</ui-button
        >
      </div>
    </the-footer>
  </div>
</template>

<script>
import UiButton from '@/components/ui/UiButton';
import UiSpinner from '@/components/ui/UiSpinner';
import TheHeader from '@/components/TheHeader';
import UiNav from '@/components/ui/UiNav';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'Home',
  components: {
    UiButton,
    UiSpinner,
    TheHeader,
    UiNav,
    TheFooter
  },
  data() {
    return {
      loading: false,
      changesState: 'No changes'
    };
  },
  methods: {
    async logout() {
      this.loading = true;
      await this.$store.dispatch('logout');
      this.loading = false;
      this.$router.push({ name: 'Login' });
    }
  },
  computed: {
    displayName: {
      get() {
        return this.$store.getters.displayName;
      },
      set(val) {
        console.log(val);
        this.changesState = 'Saving...';
        this.$store.dispatch('setCustomDisplayName', { name: val });
        this.changesState = 'Saved';
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.page-account {
  .changes-status {
    color: rgba(255, 255, 255, 0.5);
  }

  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-new-repo {
      margin-right: 0px;
    }
  }
}
</style>

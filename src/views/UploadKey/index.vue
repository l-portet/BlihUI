<template>
  <div class="page page-upload-key">
    <the-header :show-keys-link="false" />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Keys' }"> </ui-nav>
      <h2>Upload a key</h2>
      <label>
        Key data
        <textarea v-model="key" rows="10" placeholder="ssh-rsa"></textarea>
      </label>
    </div>
    <the-footer>
      <div class="footer-content">
        <ui-button type="primary" class="btn-delete" @click="uploadKey"
          >Upload</ui-button
        >
      </div>
    </the-footer>
  </div>
</template>

<script>
import UiButton from '@/components/ui/UiButton';
import UiNav from '@/components/ui/UiNav';
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';

export default {
  name: 'Keys',
  components: {
    TheHeader,
    TheFooter,
    UiButton,
    UiNav
  },
  data() {
    return {
      loading: false,
      key: ''
    };
  },
  methods: {
    async uploadKey() {
      if (!this.key.length) return;

      try {
        this.$store.dispatch('enableLoading');
        await this.$store.dispatch('uploadKey', { key: this.key });
      } catch (e) {
        window.alert(`Oops! Unable to upload your key, check its format.`);
        console.log(e);
      } finally {
        this.$store.dispatch('disableLoading');
        this.$store.dispatch('fetchData');
        this.$router.push({ name: 'Keys' });
      }
      console.log('upload');
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.page-upload-key {
  .page-content {
    label {
      margin-top: 10px;
    }
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

<template>
  <div class="page page-new">
    <the-header />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Home' }"> </ui-nav>
      <h2>New repository</h2>
      <label>
        Name
        <input v-model="name" type="text" placeholder="repo_name" />
      </label>
      <label>ACL</label>
      <RepoAcl :acl="acl" @aclchange="onAclChange" />
    </div>
    <the-footer>
      <div class="footer-content">
        <ui-button type="primary" class="btn-create" @click="createRepo"
          >Create</ui-button
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
import RepoAcl from '@/components/RepoAcl';

export default {
  name: 'New',
  components: {
    // UiButton,
    // UiSpinner,
    TheHeader,
    TheFooter,
    UiButton,
    UiNav,
    RepoAcl
  },
  data() {
    return {
      loading: false,
      name: '',
      acl: []
    };
  },
  methods: {
    onAclChange(acl) {
      console.log(acl);
      console.log(this.acl);
    },
    async createRepo() {
      let proms = [];
      if (!this.name.length) return;
      this.$store.dispatch('enableLoading');

      try {
        await this.$store.dispatch('createRepo', { name: this.name });

        for (let i = 0; i < this.acl.length; i++) {
          proms.push(
            this.$store.dispatch('setRepoAcl', {
              name: this.name,
              acl: this.acl[i]
            })
          );
        }

        await Promise.all(proms);
      } catch (e) {
        console.error(e)
        window.alert('Oops! Unable to create repo.');
      } finally {
        this.$store.dispatch('disableLoading');
        this.$router.push({ name: 'Home' })
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.page-new {
  label {
    display: block;
  }

  .page-content {
    overflow: scroll;
  }

  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-create {
      // margin-top: 20px;
      // float: right;
      // width: 100%;
      // margin-left: 50%;
      // transform: translateX(-50%);
      margin: 0;
      float: right;
    }
  }
}
</style>

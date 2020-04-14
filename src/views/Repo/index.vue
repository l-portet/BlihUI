<template>
  <div class="page page-repo">
    <the-header />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Home' }">
        <span>{{ changesState }}</span>
      </ui-nav>

      <repo-item v-if="repo" :repo="repo" class="repo-item" />
      <the-repo-details v-if="repo" :repo="repo" @aclchange="onAclChange" />
    </div>
    <the-footer>
      <div class="footer-content">
        <ui-button type="default" @click="cloneRepo">
          Clone
        </ui-button>
        <ui-button type="danger" @click="deleteRepo">
          Delete
        </ui-button>
      </div>
    </the-footer>
  </div>
</template>

<script>
import UiButton from '@/components/ui/UiButton';
import UiNav from '@/components/ui/UiNav';
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import RepoItem from '@/components/RepoItem';
import TheRepoDetails from '@/views/Repo/TheRepoDetails';

import sortRepoAcl from '@/utils/sort-repo-acl';
const { dialog } = require('electron').remote;

export default {
  name: 'Repo',
  components: {
    UiButton,
    UiNav,
    TheHeader,
    TheFooter,
    RepoItem,
    TheRepoDetails
  },
  data() {
    return {
      repo: null,
      changesState: 'No changes'
    };
  },
  methods: {
    async getRepoInfo() {
      try {
        this.$store.dispatch('enableLoading');
        this.repo = this.$route.params.repo;
        let res = await this.$store.dispatch('getRepoInfo', {
          name: this.repo.name
        });
        this.repo = { ...this.repo, ...res };
        this.repo = sortRepoAcl(this.repo);
      } catch (e) {
        window.alert(`Oops! Cannot fetch repository infos.`);
        this.$router.push({ name: 'Home' });
      } finally {
        this.$store.dispatch('disableLoading');
      }
    },
    cloneRepo() {
      // TODO Do a real git clone
      window.alert(
        `git clone git@git.epitech.eu:/${this.$store.state.email}/${this.repo.name}`
      );
    },
    deleteRepo() {
      const options = {
        type: 'warning',
        title: 'Deletion',
        message: 'Delete this repo ?',
        defaultId: 0,
        buttons: ['No', 'Yes']
      };
      dialog.showMessageBox(options, async index => {
        // Index === 1 === 'Yes'
        if (index === 1) {
          this.$store.dispatch('enableLoading');
          try {
            await this.$store.dispatch('deleteRepo', { name: this.repo.name });
            this.$router.push({ name: 'Home' });
          } catch (e) {
            window.alert('Oops! Unable to delete repo.');
            this.getRepoInfo();
          } finally {
            this.$store.dispatch('disableLoading');
          }
        }
      });
    },
    async onAclChange(acl) {
      this.changesState = 'Saving...';
      try {
        await this.$store.dispatch('setRepoAcl', {
          name: this.repo.name,
          acl
        });
        this.changesState = 'Saved';
      } catch (e) {
        this.getRepoInfo();
        this.changesState = 'Failed to save';
        window.alert(`Oops! ${e}.`);
      }
    }
  },
  created() {
    this.getRepoInfo();
  }
};
</script>

<style lang="scss">
.page-repo {
  padding: 0 25px;

  .page-content {
    margin: 0;

    span {
      color: rgba(255, 255, 255, 0.5);
    }

    .repo-item {
      padding: 5px calc(10% - 40px);
      margin-top: 0px;

      h6 {
        font-weight: 600;
      }
    }
  }
  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    * {
      margin-left: 15px;
      margin-right: 0;
    }
  }
}
</style>

<template>
  <div class="the-repos-list">
    <div class="repos-filters">
      <ui-select v-model="sortType" class="repos-sort" placeholder="Sort by">
        <option value="name">Name</option>
        <option value="year">Year</option>
      </ui-select>
      <div class="repos-search">
        <img src="@/assets/icons/magnify.png" alt="magnify icon white" />
        <input v-model="searchPattern" type="text" placeholder="Search" />
      </div>
    </div>
    <div class="repos-items">
      <repo-item
        v-for="(repo, index) in filteredRepos"
        :key="index"
        :repo="repo"
        @click="$router.push({ name: 'Repo', params: { repo } })"
      />
      <span class="empty-state" v-if="!filteredRepos.length">No repos found</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UiSelect from '@/components/ui/UiSelect';
import RepoItem from '@/components/RepoItem';
import sortByName from '@/utils/sort-by-name';
import sortByYear from '@/utils/sort-by-year';

export default {
  name: 'TheReposList',
  components: {
    UiSelect,
    RepoItem
  },
  data() {
    return {
      sortType: '',
      searchPattern: ''
    };
  },
  computed: {
    ...mapGetters(['repos']),
    filteredRepos() {
      let repos = this.repos;

      // Apply search
      if (this.searchPattern.length) {
        repos = repos.filter(item =>
          item.name.toLowerCase().includes(this.searchPattern.toLowerCase())
        );
      }

      // Sort repos
      switch (this.sortType) {
        case 'name':
          repos.sort(sortByName);
          break;
        case 'year':
          repos.sort(sortByYear);
          break;
      }

      return repos;
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss">
.the-repos-list {
  padding: 15px 0;
  height: calc(100vh - (60px * 2));
  max-height: calc(100vh - (60px * 2));
  box-sizing: border-box;
  position: relative;

  .repos-filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .repos-sort {
      width: 50%;
      margin-right: 5px;
    }

    .repos-search {
      position: relative;
      margin-left: 5px;
      width: 100%;

      img {
        position: absolute;
        width: 16px;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
      }
      input {
        margin: 0;
        padding-left: 40px;

        &:focus {
          padding-lleft: 38px;
        }
      }
    }
  }

  .repos-items {
    position: relative;
    height: calc(100% - 55px);
    overflow: scroll;
    box-sizing: border-box;
    margin-top: 15px;

    .repo-item {
      cursor: pointer;
      transition: background 0.1s ease-in-out;
      padding: 15px;

      &:hover {
        background: rgba(40, 40, 40, 1);
      }
    }

    .repo-item:first-of-type {
      margin-top: 5px;
    }

    .repo-item:last-of-type {
      margin-bottom: 15px;
    }
  }
}
</style>

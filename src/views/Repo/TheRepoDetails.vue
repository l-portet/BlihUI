<template>
  <div class="the-repo-details">
    <div class="details-row">
      <div class="details-row-key">
        UUID
      </div>
      <div class="details-row-value">
        {{ repo.uuid }}
      </div>
    </div>
    <div class="details-row">
      <div class="details-row-key">
        Date
      </div>
      <div class="details-row-value">
        {{ repo.creation_time | formatDate }}
      </div>
    </div>
    <div class="details-row">
      <div class="details-row-key">
        ACL
      </div>
      <div class="details-row-value">
        <repo-acl :acl="repo.acl || []" @aclchange="onAclChange" />
      </div>
    </div>
  </div>
</template>

<script>
// import UiSpinner from '@/components/ui/UiSpinner';
import RepoAcl from '@/components/RepoAcl';

import formatDate from '@/filters/format-date';

export default {
  name: 'TheRepoDetails',
  props: {
    repo: {
      type: Object,
      required: true,
      validator: val => val.tag && val.name && val.year
    }
  },
  components: {
    // UiSpinner,
    RepoAcl
  },
  data() {
    return {};
  },
  methods: {
    onAclChange(acl) {
      this.$emit('aclchange', acl);
    }
  },
  filters: {
    formatDate
  },
  mounted() {}
};
</script>

<style lang="scss">
.the-repo-details {
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  .details-row {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 5px 0;

    .details-row-key {
      width: 10%;
      text-align: right;
      margin-right: 8px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: 500;
    }
    .details-row-value {
      width: 90%;
      text-align: left;
      margin-left: 8px;
    }
  }
}
</style>

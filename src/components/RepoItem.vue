<template>
  <div class="repo-item" @click="$emit('click')">
    <div class="repo-type" :style="`background: ${repo.color || ''}`">
      {{ repo.tag }}
    </div>
    <div class="repo-infos">
      <h6>{{ repo.name }}</h6>
      <p>{{ repo.year }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoItem',
  props: {
    repo: {
      type: Object,
      required: true,
      validator: val => val.tag && val.name && val.year
    }
  },
  components: {
    // UiButton,
    // UiSpinner
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss">
.repo-item {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  // outline: 2px solid red;
  margin: 0;
  border-radius: 7px;

  .repo-type {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
    font-weight: 700;
    margin-right: 15px;
  }

  .repo-infos {
    * {
      margin: 0;
    }
    h6 {
      margin-bottom: 5px;
    }
    p {
      color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>

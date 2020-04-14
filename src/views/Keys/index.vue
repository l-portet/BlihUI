<template>
  <div class="page page-keys">
    <the-header :show-keys-link="false" />
    <div class="page-content">
      <ui-nav :back-route="{ name: 'Home' }"> </ui-nav>
      <h2>Keys</h2>
      <ul class="keys">
        <li v-for="(key, index) in keys" :key="index" class="key-item">
          <router-link
            :to="{ name: 'Key', params: { key } }"
            tag="button"
            type="button"
            name="button"
          >
            {{ key.name }}
            <img src="@/assets/icons/arrow-right.png" alt="arrow right white" />
          </router-link>
        </li>
      </ul>
      <span class="empty-state" v-if="!keys.length">No keys found</span>
    </div>
    <the-footer>
      <div class="footer-content">
        <span>{{ `${keys.length} Key${keys.length > 1 ? 's' : ''}` }}</span>
        <ui-button
          type="primary"
          class="btn-upload"
          @click="$router.push({ name: 'UploadKey' })"
          >Add a key</ui-button
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

import { mapState } from 'vuex';

export default {
  name: 'Keys',
  components: {
    TheHeader,
    TheFooter,
    UiButton,
    UiNav
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['keys'])
  },
  mounted() {}
};
</script>

<style lang="scss">

.page-keys {
  .keys {
    .key-item {
      border-radius: 7px;
      transition: background 0.1s ease-in-out;

      &:hover {
        background: rgba(40, 40, 40, 1);
      }

      button {
        display: flex;
        justify-content: space-between;
        text-align: left;
        padding: 10px 10px;
        position: relative;
        width: 100%;
        margin-bottom: -5px;

        img {
          position: relative;
          height: 15px;
          right: 5px;
          top: 2px;
          opacity: 0;
          transform: translateX(-15px);
          transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
        }
      }
      &:hover button img {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  .footer-content {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    span {
      color: rgba(255, 255, 255, 0.5);
    }

    .btn-upload {
      margin-right: 0;
    }
  }
}
</style>

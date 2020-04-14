<template>
  <header :class="{ 'move-header': moveHeader }">
    <router-link :to="{ name: 'Account' }" class="user-infos no-drag">
      <h6>{{ displayName }}</h6>
      <p>{{ email }}</p>
    </router-link>
    <nav class="no-drag">
      <router-link v-if="showKeysLink" :to="{ name: 'Keys' }"
        >SSH Keys</router-link
      >
      <button
        type="button"
        name="button"
        :class="{ 'btn-refresh': true, spinning: loading }"
        @click="refreshData"
      >
        <img src="@/assets/icons/refresh.png" alt="" />
      </button>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { remote } from 'electron';

export default {
  name: 'TheHeader',
  props: {
    showKeysLink: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  components: {},
  data() {
    return {
      loading: false,
      moveHeader: false
    };
  },
  methods: {
    async refreshData() {
      this.loading = true;
      await this.$store.dispatch('fetchData');
      this.loading = false;
    }
  },
  computed: {
    ...mapState({
      email: state => state.email
    }),
    ...mapGetters(['displayName'])
  },
  created() {
    let win = remote.BrowserWindow.getFocusedWindow();

    this.moveHeader = process.platform === 'darwin';

    win.on('enter-full-screen', () => {
      this.moveHeader = false;
    });
    win.on('leave-full-screen', () => {
      this.moveHeader = true;
    });
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/vars';

header {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;

  &.move-header .user-infos {
    padding-left: 60px;
  }

  &:after {
    content: '';
    position: absolute;
    width: calc(100% + 25px * 2);
    left: -25px;
    bottom: 0;
    margin: 0;
    border: none;
    border-bottom: 2px solid rgba(55, 55, 55, 0.6);
  }

  .user-infos {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:hover * {
      color: rgba(255, 255, 255, 1);
    }

    h6,
    p {
      margin: 0;
      transition: color 0.1s ease-in-out;
    }

    h6 {
      color: $color-text-light;
    }

    p {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.85em;
      margin-top: 2px;
    }
  }

  nav {
    * {
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.5);
      transition: color 0.1s ease-in-out, opacity 0.1s ease-in-out,
        transform 0.1s ease-in-out;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }

    button {
      width: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: right;

      img {
        width: inherit;
        margin: 0;
        opacity: 0.5;
      }
      &:hover img {
        opacity: 1;
        transform: rotate(0.1turn);
      }

      &.spinning img {
        animation-name: Spinning;
        animation-duration: 0.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-delay: 0;
      }
    }
  }
}

@keyframes Spinning {
  0% {
    transform: rotate(0.1turn);
    opacity: 1;
  }
  100% {
    transform: rotate(1.1turn);
    opacity: 1;
  }
}
</style>

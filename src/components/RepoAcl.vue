<template>
  <div class="repo-acl">
    <div class="acl-item" v-for="(aclItem, index) in acl" :key="index">
      <div class="acl-item-name">
        {{ aclItem.name }}
      </div>
      <div class="acl-item-rights">
        <button
          v-for="(right, rightIdx) in aclItem.rights"
          :key="rightIdx"
          :class="{ selected: right.enabled }"
          type="button"
          name="button"
          @click="toggleAclRight(aclItem, right)"
        >
          {{ right.name }}
        </button>
      </div>
      <button
        type="button"
        name="button"
        class="btn-delete"
        @click="deleteAcl(index)"
      >
        <img src="@/assets/icons/round-close.png" alt="round close icon" />
      </button>
    </div>
    <div :class="['acl-item', 'acl-item-new', isInputFocused ? 'focused' : '']">
      <input
        v-model="newAcl.name"
        type="text"
        placeholder="john.doe@epitech.eu"
        @focus="isInputFocused = true"
        @blur="isInputFocused = false"
        @keypress.enter="addNewAcl()"
      />
      <div class="acl-item-rights">
        <button
          v-for="(right, rightIdx) in newAcl.rights"
          :key="rightIdx"
          :class="{ selected: right.enabled }"
          type="button"
          name="button"
          @click="toggleNewAclRight(right)"
        >
          {{ right.name }}
        </button>
      </div>
      <button type="button" name="button" class="btn-add" @click="addNewAcl">
        <img src="@/assets/icons/round-plus.png" alt="round plus icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepoAcl',
  props: {
    acl: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      isInputFocused: false,
      newAcl: {}
    };
  },
  computed: {},
  methods: {
    toggleAclRight(acl, right) {
      right.enabled = !right.enabled;
      this.$emit('aclchange', acl);
    },
    deleteAcl(aclIndex) {
      let acl = this.acl[aclIndex];

      this.acl.splice(aclIndex, 1);
      this.$emit('aclchange', { name: acl.name, rights: [] });
    },
    toggleNewAclRight(right) {
      right.enabled = !right.enabled;
    },
    addNewAcl() {
      if (!this.newAcl.name || !this.newAcl.rights.some(item => item.enabled))
        return;
      this.$emit('aclchange', { ...this.newAcl });

      let aclIndex = -1;
      if (
        (aclIndex = this.acl.findIndex(
          item => item.name === this.newAcl.name
        )) !== -1
      ) {
        this.acl.splice(aclIndex, 1);
      }

      this.acl.push(this.newAcl);
      this.clearNewAcl();
    },
    clearNewAcl() {
      this.newAcl = {
        name: '',
        rights: [
          {
            name: 'r',
            enabled: true
          },
          {
            name: 'w',
            enabled: false
          },
          {
            name: 'a',
            enabled: false
          }
        ]
      };
    }
  },
  created() {
    this.clearNewAcl();
  }
};
</script>

<style lang="scss">
@import '@/assets/styles/vars';

.repo-acl {
  .acl-item {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 10px 0;
    border-radius: 7px;

    &.acl-item-new {
      position: relative;
      background: #272727;
      margin-top: 10px;
      border: 2px solid $border-color-inactive;

      &.focused {
        color: green !important;
        border: 2px solid $border-color-focus;
      }

      input {
        width: 100%;
        margin: 0;
        box-sizing: border-box;
        border: none;
      }

      .acl-item-rights {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 10px 0;
        margin-right: 6px;
      }

      .btn-add {
        position: relative;
        width: 15px;
        height: 100%;
        padding: 10px 0;
        margin-right: 12px;
        top: 1px;
        opacity: 0.3;
        transition: opacity 0.1s ease-in-out;

        &:hover, &:focus {
          opacity: 1;
        }

        img {
          width: inherit;
        }
      }
    }

    &:first-of-type {
      margin-top: 0;
    }

    .acl-item-name {
      width: 70%;
      word-break: break-all;
    }
    .acl-item-rights {
      padding-right: 35px;

      button {
        color: rgba(255, 255, 255, 0.3);
        transition: color 0.1s ease-in-out;
        font-weight: 600;
        margin: 0;
        padding: 0 5px;
        text-transform: uppercase;

        &.selected {
          color: rgba(255, 255, 255, 1);
        }

        &:hover, &:focus {
          color: $color-text-light;
        }
      }
    }

    &:hover .btn-delete, &:focus .btn-delete {
      opacity: 0.3;
    }

    .btn-delete {
      position: absolute;
      right: 14px;
      height: 100%;
      width: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.1s ease-in-out;
      margin-top: 1px;

      &:hover, &:focus {
        opacity: 1;
      }

      img {
        width: inherit;
      }
    }
  }
}
</style>

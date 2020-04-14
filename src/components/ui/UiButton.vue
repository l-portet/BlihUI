<template>
  <button :class="['ui-button', type, `size-${size}`, block ? 'block' : '']" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'default'
    },
    size: {
      type: String,
      required: false,
      default: 'normal'
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    block: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {}
};
</script>

<style lang="scss">
@import '@/assets/styles/vars';

.ui-button {
  font: inherit;
  border-radius: 4px;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5px 10px;
  color: $color-text;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  &.size-normal {
    padding: 2px 13px 3px 13px;
  }

  &.block {
    width: 100%;
    margin: 5px 0px;
  }

  &.default {
    background: linear-gradient(to top, #787878, #8b8b8b);

    &:active {
      background: #787878;
    }
  }
  &.primary {
    background: linear-gradient(to top, #1768e5, #145ccc);

    &:active {
      background: #1359c6;
    }
  }

  &.danger {
    background: linear-gradient(to top, #B82020, #E12F2F);

    &:active {
      background: #B82020;
    }
  }

  &[disabled] {
    opacity: 0.9;
    color: rgba(255, 255, 255, 0.5);
    filter: grayscale(0.5);
    cursor: not-allowed;
  }
}
</style>

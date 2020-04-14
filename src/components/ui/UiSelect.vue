<template>
  <label :class="['ui-select', isFocused ? 'focused' : '']">
    <select
      v-model="val"
      :class="{ 'placeholder-shown': showPlaceholder }"
      @focus="isFocused = true"
      @blur="isFocused = false"
      ref="select"
    >
      <option value="" selected hidden>{{ placeholder }}</option>
      <slot></slot>
      <!--<option value="">Name</option>
      <option value="">Date</option> -->
    </select>
    <img src="@/assets/icons/sort.png" alt="sort icon white">
  </label>
</template>

<script>
export default {
  name: 'UiSelect',
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {},
  data() {
    return {
      val: this.value,
      isFocused: false
    };
  },
  watch: {
    val(value) {
      this.$emit('input', value);
    }
  },
  computed: {
    showPlaceholder() {
      return this.val === '';
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '@/assets/styles/vars';

.ui-select {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #272727;
  border-radius: 7px;
  border: none;
  width: 100%;
  outline: none;
  font: inherit;
  font-weight: 400;
  line-height: 1em;
  box-sizing: border-box;
  margin: 0;
  border: 2px solid $border-color-inactive;

  &:focus {
    background: green;
  }

  &.focused {
    border: 2px solid $border-color-focus;
  }

  select {
    margin: 0;
    width: calc(100% - 5px);
    background: none;
    font-size: 1em;
    outline: none;
    border: none;
    color: $color-text-light;
    font: inherit;
    appearance: none;
    padding: 8.5px 15px;

    &::-ms-expand {
    }
    &.placeholder-shown {
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  img {
    position: absolute;
    right: 10px;
    height: 14px;
    opacity: .6;
    pointer-events: none;
  }
}
</style>

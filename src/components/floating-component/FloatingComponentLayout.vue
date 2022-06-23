<template>
  <div style="center">
    custom component props: content: {{ content }}
    <br />
    <br />
    <img alt="vue img" class="center" src="@/assets/logo.svg" width="125" height="125" />
    <br />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FloatingComponentLayout",
  props: {
    content: {
      type: String,
      default: "content",
      required: false,
    },
  },
}
</script>

<style scoped>
.center {
  object-fit: scale-down;
}
</style>

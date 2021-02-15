<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'Error',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong :('
    }
  }
};
</script>

<style></style>

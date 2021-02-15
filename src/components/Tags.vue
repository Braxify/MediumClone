<template>
  <ul class="tag-list">
    <li class="tag-default tag-pill tag-outline" v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'tag', params: { slug: tag } }">
        {{ tag }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>

<style></style>

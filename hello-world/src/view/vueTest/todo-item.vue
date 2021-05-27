<template>
  <li>
      {{title}} <button @click="$emit('remove')">remove</button>
  </li>
</template>

<script>
export default {
    props:['title']
}
</script>

<style>

</style>
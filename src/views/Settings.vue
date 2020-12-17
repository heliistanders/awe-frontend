<template>
  <div class="about">
    <h1>This is a settings page</h1>
    <button v-on:click="test">test</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Settings',
  computed: {
    ...mapState({
      searchQuery: 'searchQuery'
    })
  },
  methods: {
    test() {
      console.log(this.searchQuery)
    }
  }
}
</script>
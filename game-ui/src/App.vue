<template>
  <v-app>
    <GameBoard />
  </v-app>
</template>
<script>
import GameBoard from './components/page'
export default {
  name: 'App',
  components: { GameBoard },
  data () {
      return {
      }
  }
};
</script>
<style>

</style>

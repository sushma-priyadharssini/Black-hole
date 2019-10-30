<template>
  <v-app>
    <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 1" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 2" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked"  outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 3" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 4" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 5" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 6" :key="n" class="ma-2 pa-2" :id="key++" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-btn small>Reset</v-btn>
        </v-row>
    </v-col>
  </v-row>
  </v-container>
  </v-app>
</template>

<script>
let firstPlayerCount = 1,
secondPlayerCount = 1;
//player, game;
export default {
  name: 'App',
  data () {
      return {
        justify: 'center',
        key: 0
      }
  },
  methods: {
    markClicked (event) {
      if (event.srcElement.innerText === '?') {
        event.srcElement.innerHTML = firstPlayerCount;
        event.srcElement.style.backgroundColor = 'aquamarine';
        if (firstPlayerCount === 10 || secondPlayerCount === 10) {
          this.gameOver();
        } else {
            firstPlayerCount++;
        }
      }
    },
    gameOver () {
      alert('Game Over');
    },
    getCurrentPlayerValue () {
      return ;
    },
    getCurrentPlayer () {
      return ;
    }
  }
};
</script>
<style>
</style>

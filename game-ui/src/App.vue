<template>
  <v-app>
    <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 1" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 2" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 3" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 4" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 5" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
        </v-row>
        <v-row :align="center" :justify="justify" class="grey lighten-5">
          <v-card v-for="n in 6" :key="n" class="ma-2 pa-2" outlined tile>?</v-card>
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

export default {
  name: 'App',
  data () {
      return {
        alignmentsAvailable: [
          'start',
          'center',
          'end',
          'baseline',
          'stretch',
        ],
        alignment: 'center',
        dense: false,
        justifyAvailable: [
          'start',
          'center',
          'end',
          'space-around',
          'space-between',
        ],
        justify: 'center',
      }
    }
};
</script>

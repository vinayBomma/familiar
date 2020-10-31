<template>
  <div>
    <v-container fluid>
      <v-card
        flat
        style="border-radius: 20px;background-image: linear-gradient( 108deg,  rgba(0,166,81,1) 9.3%, rgba(0,209,174,1) 118.3% );"
      >
        <v-card-title class="justify-center">
          <v-icon x-large color="white">mdi-check-circle</v-icon>
        </v-card-title>
        <v-card-text
          class="subheading"
          style="letter-spacing: 2px; text-align:center;"
          >This page will list all the groups!</v-card-text
        >
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Groups",
  data() {
    return {};
  },
  methods: {},
};
</script>

<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="(group, j) in groups" :key="j">
          <v-card
            class="rounded-lg ml-2 mr-2 mb-2"
            flat
            dark
            style="background-image: linear-gradient( 108deg,  rgba(0,166,81,1) 9.3%, rgba(0,209,174,1) 118.3% );"
          >
            <v-card-title
              >{{ group.name }}
              <v-layout class="justify-end center">
                <!-- <v-btn text>Open</v-btn> -->
                <v-icon @click="chatWindow = true">mdi-open-in-new</v-icon>
              </v-layout>
            </v-card-title>
            <v-card-text
              class="subtitle-2"
              style="letter-spacing: 2px; text-align:left;"
              >{{ group.totalMembers }} members</v-card-text
            >
          </v-card>
        </v-flex>

        <v-dialog v-model="chatWindow" fullscreen>
          <v-card light>
            <v-toolbar dark color="cyan">
              <v-btn icon dark @click="chatWindow = null">
                <v-icon>mdi-keyboard-backspace</v-icon>
              </v-btn>
              <v-toolbar-title>School Group</v-toolbar-title>
            </v-toolbar>
            <v-text-field placeholder="Type a message" bottom>
              <template v-slot:prepend>
                <v-icon color="yellow darken-1">mdi-emoticon-outline</v-icon>
              </template>
              <template v-slot:append>
                <v-icon>mdi-send</v-icon>
              </template>
            </v-text-field>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Chats",
  data() {
    return {
      chatWindow: null,
      groups: [
        { id: 1, name: "Bomma Family", totalMembers: 5 },
        { id: 2, name: "School Group Da Silva", totalMembers: 7 },
      ],
    };
  },
};
</script>

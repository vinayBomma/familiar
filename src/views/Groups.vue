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
              <v-layout class="justify-end">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on"
                      >mdi-dots-horizontal</v-icon
                    >
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in items" :key="index">
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-layout>
            </v-card-title>
            <v-card-text
              class="subtitle-2"
              style="letter-spacing: 2px; text-align:left;"
              >{{ group.totalMembers }} members</v-card-text
            >
          </v-card>
        </v-flex>
        <v-btn fixed bottom right fab class="ma-3">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Groups",
  data() {
    return {
      items: [
        { title: "Map" },
        { title: "Chat" },
        { title: "Settings" },
        { title: "Share" },
      ],
      groups: [
        { id: 1, name: "Bomma Family", totalMembers: 5 },
        { id: 2, name: "School Group Da Silva", totalMembers: 7 },
      ],
    };
  },
};
</script>

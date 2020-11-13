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

        <v-btn
          @click="showDialog = !showDialog"
          fixed
          bottom
          right
          fab
          class="ma-3"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog v-model="showDialog" fullscreen>
          <v-card>
            <v-toolbar dark color="cyan">
              <v-btn icon dark @click="showDialog = !showDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Create Group</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text @click="createGroup">
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list>
              <v-subheader>Details</v-subheader>
              <v-list-item>
                <!-- <v-row md-4 class="ma-1"> -->
                <v-text-field
                  outlined
                  clearable
                  shaped
                  v-model="grpName"
                  label="Group Name"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                  outlined
                  shaped
                  readonly
                  v-model="inviteCode"
                  label="Invite Code"
                >
                  <template v-slot:append-outer>
                    <v-btn text color="cyan" @click="genCode">Generate</v-btn>
                  </template>
                  <template v-slot:append>
                    <v-icon @click="copyCode">mdi-content-copy</v-icon>
                  </template>
                </v-text-field>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-subheader>Share</v-subheader>
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="green darken-2" large>mdi-whatsapp</v-icon>
                </v-list-item-action>
                <v-list-item-content>Share on Whatsapp</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="cyan" large>mdi-twitter</v-icon>
                </v-list-item-action>
                <v-list-item-content>Share on Twitter</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-icon color="blue darken-4" large>mdi-facebook</v-icon>
                </v-list-item-action>
                <v-list-item-content>Share on Facebook</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "@/configFirebase";

export default {
  name: "Groups",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      showDialog: null,
      inviteCode: null,
      grpName: null,
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
  methods: {
    createGroup() {
      console.log(this.grpName);
      console.log(this.inviteCode);
      console.log(this.user.data.uid);
      this.showDialog = null;

      // if(this.grpName && this.inviteCode){
      //   db.collection('groups').doc().set({
      //     name: this.grpName,
      //     inviteCode: this.inviteCode,
      //     admin:
      //   })
      // }
    },
    genCode() {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      this.inviteCode = result;
    },
    copyCode() {
      if (this.inviteCode) {
        navigator.clipboard.writeText(this.inviteCode);
      }
    },
  },
};
</script>

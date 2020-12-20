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
              >{{ group.members }} members</v-card-text
            >
          </v-card>
        </v-flex>

        <v-btn
          @click="createDialog = !createDialog"
          fixed
          bottom
          right
          fab
          class="ma-3"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog v-model="createDialog" fullscreen>
          <v-card>
            <v-toolbar dark color="cyan">
              <v-btn icon dark @click="createDialog = !createDialog">
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

        <!-- <v-dialog light v-model="joinDialog">
          <v-card>
            <v-card-title class="justify-center subheading">
              Join Group
            </v-card-title>
            <v-card-text class="mt-2">
              <v-text-field
                label="Enter Code"
                shaped
                outlined
                v-model="enterCode"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="joinDialog = null">Cancel</v-btn>
              <v-btn color="cyan white--text" right @click="joinGroup"
                >Join</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->

        <v-snackbar
          shaped
          timeout="3000"
          v-model="snackbar"
          top
          right
          color="yellow darken-2"
          >{{ msg }}</v-snackbar
        >
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
      createDialog: null,
      // joinDialog: null,
      inviteCode: null,
      enterCode: null,
      grpName: null,
      snackbar: null,
      msg: null,
      items: [
        { title: "Map" },
        { title: "Chat" },
        { title: "Settings" },
        { title: "Share" },
      ],
      groups: [],
    };
  },
  methods: {
    createGroup() {
      if (this.grpName && this.inviteCode) {
        let batch = db.batch();
        let groups = db.collection("groups").doc();
        let users = db.collection("users").doc(this.user.data.uid);

        batch.set(groups, {
          name: this.grpName,
          inviteCode: this.inviteCode,
          admin: this.user.data.uid,
          members: [this.user.data.uid],
          totalMembers: 1,
        });

        batch.update(users, {
          inGroup: firebase.firestore.FieldValue.arrayUnion(groups.id),
        });

        console.log(groups.id);

        batch.commit().then(() => {
          this.createDialog = null;
          this.msg = "New Group created";
          this.snackbar = true;
          this.$router.go({name: "groups"})
        });
      }
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
        this.msg = "Invite code copied to clipboard";
        this.snackbar = true;
      }
    },
    joinGroup() {
      if (this.enterCode) {
        let batch = db.batch();

        console.log("Code entered: ", this.enterCode);
        db.collection("groups")
          .where("inviteCode", "==", this.enterCode)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              this.msg = "Invalid Code";
              this.snackbar = true;
            }
            querySnapshot.forEach((doc) => {
              let member = doc.data().members;
              if (member.includes(this.user.data.uid)) {
                this.msg = "You are already a member of this group";
                this.snackbar = true;
              } else {
                member.push(this.user.data.uid);
                let groups = db.collection("groups").doc(doc.id);
                let users = db.collection("users").doc(this.user.data.uid);

                batch.update(groups, {
                  members: member,
                  totalMembers: firebase.firestore.FieldValue.increment(1),
                });

                batch.update(users, {
                  inGroup: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

                batch.commit().then(() => {
                  this.msg = "Joined the group!";
                  this.snackbar = true;
                  this.$router.go({name: "groups"})
                });
              }
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
        this.joinDialog = null;
      }
    },
  },
  created() {
    db.collection("groups")
      .where("members", "array-contains", this.user.data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let groupData = {};
          groupData.name = doc.data().name;
          groupData.members = doc.data().totalMembers;
          this.groups.push(groupData)
        });
      });
  },
};
</script>

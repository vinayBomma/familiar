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
                <v-icon @click="openWindow(group)">mdi-open-in-new</v-icon>
              </v-layout>
            </v-card-title>
            <v-card-text
              class="subtitle-2"
              style="letter-spacing: 2px; text-align:left;"
              >{{ group.members }} members</v-card-text
            >
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="chatWindow" fullscreen>
      <v-card>
        <v-app-bar fixed>
          <v-btn icon dark @click="closeWindow">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
          <v-toolbar-title>{{ groupName }}</v-toolbar-title>
        </v-app-bar>

        <!-- ======================  Messed up code ahead -->

        <v-layout>
          <v-col md="6" sm="6" offset-md="3" offset-sm="3" class="mt-5">
            <v-card class="grey darken-2 mt-8 rounded-lg">
              <v-card-text>
                <div class="body-2 text-center">
                  This is the beginning of your chat history
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout v-for="(msg, j) in messages" :key="j">
          <template v-if="msg.authorUID == user.data.uid">
            <template v-if="j == messages.length - 1">
              <v-col
                md="6"
                sm="6"
                offset-md="6"
                offset-sm="6"
                style="height: 170px"
              >
                <v-card class="float-right teal darken-2" min-width="150">
                  <v-card-text>
                    <div class="caption">
                      You
                      <span class="caption" style="float: right">{{
                        msg.createdAt
                          .toDate()
                          .toLocaleTimeString("en-US")
                          .slice(0, -6) +
                          " " +
                          msg.createdAt
                            .toDate()
                            .toLocaleTimeString("en-US")
                            .slice(-2)
                      }}</span>
                    </div>
                    <div class="body-2">{{ msg.message }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
            <template v-else>
              <v-col md="6" sm="6" offset-md="6" offset-sm="6">
                <v-card class="float-right teal darken-2" min-width="150">
                  <v-card-text>
                    <div class="caption">
                      You
                      <span class="caption" style="float: right">
                        {{
                          msg.createdAt
                            .toDate()
                            .toLocaleTimeString("en-US")
                            .slice(0, -6) +
                            " " +
                            msg.createdAt
                              .toDate()
                              .toLocaleTimeString("en-US")
                              .slice(-2)
                        }}
                      </span>
                    </div>
                    <div class="body-2">{{ msg.message }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </template>

          <!-- ============================ Part 2  -->

          <template v-else>
            <template v-if="j == messages.length - 1">
              <v-col md="6" sm="6" cols="9" style="height: 170px">
                <v-card class="float-left indigo darken-1" min-width="200">
                  <v-card-text>
                    <div class="caption">
                      {{ msg.author }}
                      <span class="caption" style="float: right">{{
                        msg.createdAt
                          .toDate()
                          .toLocaleTimeString("en-US")
                          .slice(0, -6) +
                          " " +
                          msg.createdAt
                            .toDate()
                            .toLocaleTimeString("en-US")
                            .slice(-2)
                      }}</span>
                    </div>
                    <div class="body-2">{{ msg.message }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
            <template v-else>
              <v-col md="6" sm="6" cols="9">
                <v-card class="float-left indigo darken-1" min-width="200">
                  <v-card-text>
                    <div class="caption">
                      {{ msg.author }}
                      <span class="caption" style="float: right">{{
                        msg.createdAt
                          .toDate()
                          .toLocaleTimeString("en-US")
                          .slice(0, -6) +
                          " " +
                          msg.createdAt
                            .toDate()
                            .toLocaleTimeString("en-US")
                            .slice(-2)
                      }}</span>
                    </div>
                    <div class="body-2">{{ msg.message }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </template>
        </v-layout>

        <v-layout v-if="devMsg">
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">
                  Developer
                  <span class="caption" style="float: right">12:00</span>
                </div>
                <div class="body-2">
                  Seems you have discovered the chat feature!
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-footer fixed padless class="my-n6">
          <v-layout>
            <v-col>
              <v-text-field
                filled
                rounded
                placeholder="Type a message"
                v-model="msg"
                required
                v-on:keyup.enter="sendMessage"
              >
                <template v-slot:append-outer>
                  <v-icon @click="sendMessage">mdi-send</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-layout>
        </v-footer>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import { db } from "@/configFirebase";

export default {
  name: "Chats",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      chatWindow: null,
      groupID: null,
      isSender: null,
      msg: null,
      groupName: null,
      groups: [],
      messages: [],
      devMsg: null,
    };
  },
  methods: {
    openWindow(i) {
      this.groupName = i.name;
      this.groupID = i.id;
      this.fetchMessage();
      this.chatWindow = true;
      // this.scrollMessage();
    },
    fetchMessage() {
      db.collection("groups")
        .doc(this.groupID)
        .collection("chats")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          if (this.messages.length >= 6) {
            this.devMsg = true;
          }
          this.messages = [];
          // this.scrollMessage();
          querySnapshot.forEach((doc) => {
            this.messages.push(doc.data());
          });
        });
    },
    closeWindow() {
      this.messages = [];
      this.chatWindow = null;
    },
    // scrollMessage() {
    //   // let box = this.$el.querySelector(".scroll");
    //   let box = document.querySelector(".scroll");
    //   box.scrollTop = box.scrollHeight;
    // },
    sendMessage() {
      if (this.msg) {
        db.collection("groups")
          .doc(this.groupID)
          .collection("chats")
          .doc()
          .set({
            message: this.msg,
            author: this.user.data.displayName,
            authorUID: this.user.data.uid,
            createdAt: new Date(),
          })
          .then(() => {
            this.msg = null;
            // this.scrollMessage();
          });
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
          groupData.id = doc.id;
          groupData.name = doc.data().name;
          groupData.members = doc.data().totalMembers;
          this.groups.push(groupData);
        });
      });

    // window.addEventListener("beforeunload", (event) => {
    //   this.messages = [];
    //   this.chatWindow = null;
    // });
  },
  // beforeDestroy() {
  //   this.messages = [];
  //   this.chatWindow = null;
  // },
};
</script>

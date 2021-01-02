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
                    <v-list-item ripple v-for="(item, index) in items" :key="index" @click="itemClick(item.title)">
                      <v-list-item-content>
                        <v-list-item-title>{{
                          item.title
                        }}</v-list-item-title>
                      </v-list-item-content>
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
          color="cyan"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-bottom-sheet v-model="createDialog" inset>
          <v-sheet class="text-center" height="370px" dark>
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
                <v-divider></v-divider>
                <v-list-item ripple>
                  <v-list-item-icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Share
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <!-- <v-list> -->
              <!-- <v-subheader>Share</v-subheader>
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
              </v-list> -->
            </v-card>
          </v-sheet>
        </v-bottom-sheet>

        <v-dialog v-model="groupSettings" fullscreen>
          <v-card>
            <v-toolbar dark color="cyan">
              <v-btn icon dark @click="groupSettings = !groupSettings">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Group Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark text>
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-list>
              <v-subheader>Admin Settings</v-subheader>
              <v-list-item>
                <v-text-field
                  outlined
                  clearable
                  shaped
                  v-model="grpName"
                  label="Edit Name"
                ></v-text-field>
              </v-list-item>
              <v-list-item>
                <v-text-field
                  outlined
                  shaped
                  readonly
                  v-model="inviteCode"
                  label="Change Code"
                >
                  <template v-slot:append-outer>
                    <v-btn text color="cyan" @click="genCode">Generate</v-btn>
                  </template>
                  <template v-slot:append>
                    <v-icon @click="copyCode">mdi-content-copy</v-icon>
                  </template>
                </v-text-field>
              </v-list-item>

              <v-list-item ripple @click="listMembers = !listMembers">
                <v-list-item-icon>
                    <v-icon>mdi-account-supervisor</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Assign Admin</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-account-remove</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Remove Member</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-delete-forever</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Delete Group</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-account-group</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>List Members</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-share-variant</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Share</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-exit-to-app</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Exit Group</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item ripple>
                <v-list-item-icon>
                    <v-icon>mdi-alert-octagon</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Report Group</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>

        <v-dialog v-model="listMembers" light max-width="500">
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-android</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  jack reacher
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-web</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  peter parker
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>

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
      groupSettings: null,
      inviteCode: null,
      grpName: null,
      snackbar: null,
      msg: null,
      items: [{ title: "Map" }, { title: "Chat" }, { title: "Settings" }],
      groups: [],
      listMembers: null,
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
          this.$router.go({ name: "groups" });
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
    itemClick(option) {
      if (option == "Map") {
        console.log("Heading to Map");
        this.$router.push({ path: "/" });
      } else if (option == "Chat") {
        console.log("Heading to chats");
        this.$router.push({ path: "/chats" });
      } else if (option == "Settings") {
        this.groupSettings = true;
        console.log("Opening settings");
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
          this.groups.push(groupData);
        });
      });
  },
};
</script>

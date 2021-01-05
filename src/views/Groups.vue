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
                    <v-list-item
                      ripple
                      v-for="(item, index) in items"
                      :key="index"
                      @click="itemClick(item.title, group)"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
            </v-toolbar>
            <v-list>
              <div v-if="showAdminControls">
                <v-subheader>Admin Controls</v-subheader>
                <v-list-item
                  ripple
                  v-for="settings in adminSettings"
                  :key="settings.icon"
                  @click="adminControls(settings.id)"
                >
                  <v-list-item-icon>
                    <v-icon>{{ settings.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ settings.text }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      settings.desc_text
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>

              <v-divider v-if="showAdminControls"></v-divider>
              <v-subheader>General</v-subheader>

              <v-list-item
                ripple
                v-for="setting in generalSettings"
                :key="setting.icon"
                @click="generalControls(setting.id)"
              >
                <v-list-item-icon>
                  <v-icon>{{ setting.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ setting.text }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    setting.desc_text
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>

        <!-- ----------------  Edit Name ------------------ -->
        <v-dialog v-model="editNameDialog" max-width="500" persistent>
          <v-card>
            <v-card-title class="overline justify-center"
              >Edit Name</v-card-title
            >
            <v-card-text>
              <v-text-field
                color="cyan"
                outlined
                clearable
                shaped
                v-model="grpNameSetting"
                label="Edit Name"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="editNameDialog = !editNameDialog"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('editName')"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ============================================== -->

        <!-- ----------------  Change Code ------------------ -->

        <v-dialog v-model="editCodeDialog" max-width="500" persistent>
          <v-card>
            <v-card-title class="overline justify-center"
              >Change Code</v-card-title
            >
            <v-card-text>
              <v-text-field
                outlined
                shaped
                readonly
                v-model="inviteCodeSetting"
                label="Change Code"
              >
                <template v-slot:append>
                  <v-icon @click="saveToDB('copyCode')"
                    >mdi-content-copy</v-icon
                  >
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="cyan" text @click="genCode()">Generate</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="editCodeDialog = !editCodeDialog"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('changeCode')"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ============================================== -->

        <!-- ----------------  Assign Admin -------------------- -->
        <v-dialog v-model="assignAdminList" max-width="500" persistent>
          <v-card>
            <v-list>
              <v-list-item v-for="(users, m) in filteredUsers" :key="m">
                <v-list-item-avatar>
                  <img :src="users.photo" />
                </v-list-item-avatar>
                <v-list-item-content>
                  {{ users.displayName }}
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox
                    color="cyan"
                    v-model="assignAdminBox"
                    :value="users.uid"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="closeFeature('assign')"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('assign')">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ================================================= -->

        <!-- ----------------  Remove Member -------------------- -->
        <v-dialog v-model="removeMemberList" max-width="500" persistent>
          <v-card>
            <v-list>
              <v-list-item v-for="(users, m) in userList" :key="m">
                <v-list-item-avatar>
                  <img :src="users.photo" />
                </v-list-item-avatar>
                <v-list-item-content>
                  {{ users.displayName }}
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox
                    color="cyan"
                    v-model="removeMemberBox"
                    :value="users.uid"
                  ></v-checkbox>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="closeFeature('remove')"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('remove')"
                >Remove</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ================================================= -->

        <!-- --------------- Delete Group ------------------ -->
        <v-dialog v-model="deleteGroup" max-width="500">
          <v-card>
            <v-card-text class="overline text-center"
              >Are you sure you want to delete this group?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="deleteGroup = !deleteGroup"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('delete')"
                >Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ============================================= -->

        <!-- --------------- List Members ----------------- -->
        <v-dialog v-model="listMembers" max-width="500" persistent>
          <v-card>
            <v-list>
              <v-list-item v-for="(users, m) in userList" :key="m">
                <v-list-item-avatar>
                  <img :src="users.photo" />
                </v-list-item-avatar>
                <v-list-item-content>
                  {{ users.displayName }}
                </v-list-item-content>
                <v-list-item-action v-if="users.isAdmin">
                  <v-chip color="teal">Group Admin</v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="cyan" text @click="closeFeature('list')"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- =========================================== -->

        <!-- --------------- Exit Group ------------------ -->
        <v-dialog v-model="exitGroup" max-width="500">
          <v-card>
            <v-card-text class="overline text-center"
              >Are you sure you want to exit this group?</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="exitGroup = !exitGroup"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('exit')">Exit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ========================================= -->

        <!-- --------------- Report Group ------------------ -->
        <v-dialog v-model="reportGroup" max-width="500">
          <v-card>
            <v-card-title class="overline justify-center"
              >Report Group</v-card-title
            >
            <v-card-text>
              <v-textarea
                auto-grow
                color="cyan"
                outlined
                label="Description"
                v-model="reportText"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="reportGroup = !reportGroup"
                >Cancel</v-btn
              >
              <v-btn color="cyan" text @click="saveToDB('report')"
                >Report</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- ========================================= -->

        <!-- ----------------  Snackbar ------------------ -->
        <v-snackbar
          rounded="pill"
          timeout="3000"
          v-model="snackbar"
          top
          right
          color="teal"
          class="text-justify"
          >{{ msg }}</v-snackbar
        >
        <!-- ============================================== -->
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
    filteredUsers() {
      return this.userList.filter((item) => !item.isAdmin);
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
      adminSettings: [
        {
          id: 1,
          icon: "mdi-pencil",
          text: "Edit Name",
          desc_text: "Edit group name",
        },
        {
          id: 2,
          icon: "mdi-key",
          text: "Change Code",
          desc_text: "Change invite code of group",
        },
        {
          id: 3,
          icon: "mdi-account-supervisor",
          text: "Assign Admin",
          desc_text: "Assign admin status to members",
        },
        {
          id: 4,
          icon: "mdi-account-remove",
          text: "Remove Member",
          desc_text: "Remove members from the group",
        },
        {
          id: 5,
          icon: "mdi-delete-forever",
          text: "Delete Group",
          desc_text: "Delete the group. This can't be undone!",
        },
      ],
      generalSettings: [
        {
          id: 1,
          icon: "mdi-account-group",
          text: "List Members",
          desc_text: "List all the members in the group",
        },
        {
          id: 2,
          icon: "mdi-share-variant",
          text: "Share",
          desc_text: "Share the group with your contacts",
        },
        {
          id: 3,
          icon: "mdi-content-copy",
          text: "Copy Invite Code",
          desc_text: "Copy invite code to clipboard",
        },
        {
          id: 4,
          icon: "mdi-exit-to-app",
          text: "Exit Group",
          desc_text: "Leave the group",
        },
        {
          id: 5,
          icon: "mdi-alert-octagon",
          text: "Report Group",
          desc_text: "Report this group to the developer",
        },
      ],
      grpNameSetting: null,
      inviteCodeSetting: null,
      userList: [],
      groups: [],
      groupID: null,
      editNameDialog: null,
      editCodeDialog: null,
      showAdminControls: null,
      assignAdminList: null,
      assignAdminBox: [],
      removeMemberList: null,
      removeMemberBox: [],
      deleteGroup: null,
      listMembers: null,
      exitGroup: null,
      reportGroup: null,
      reportText: null,
    };
  },
  methods: {
    adminControls(option) {
      if (option == 1) {
        this.editNameDialog = !this.editNameDialog;
      } else if (option == 2) {
        this.editCodeDialog = !this.editCodeDialog;
      } else if (option == 3) {
        this.usersListFetch();
        this.assignAdminList = !this.assignAdminList;
      } else if (option == 4) {
        this.usersListFetch();
        this.removeMemberList = !this.removeMemberList;
      } else if (option == 5) {
        this.deleteGroup = !this.deleteGroup;
      }
    },
    generalControls(option) {
      if (option == 1) {
        this.usersListFetch();
        this.listMembers = !this.listMembers;
      } else if (option == 2) {
        console.log("share");
      } else if (option == 3) {
        if (this.inviteCodeSetting) {
          navigator.clipboard.writeText(this.inviteCodeSetting);
          this.msg = "Invite code copied to clipboard";
          this.snackbar = true;
        }
      } else if (option == 4) {
        this.exitGroup = !this.exitGroup;
      } else if (option == 5) {
        this.reportGroup = !this.reportGroup;
      }
    },
    saveToDB(option) {
      if (option == "assign") {
        if (this.assignAdminBox.length > 0) {
          let batch = db.batch();
          let groups = db.collection("groups").doc(this.groupID);
          let users;

          this.assignAdminBox.forEach((data) => {
            users = db.collection("users").doc(data);

            batch.update(groups, {
              admin: firebase.firestore.FieldValue.arrayUnion(data),
            });

            batch.update(users, {
              isAdmin: firebase.firestore.FieldValue.arrayUnion(this.groupID),
            });
          });
          batch.commit().then(() => {
            this.assignAdminList = !this.assignAdminList;
            this.assignAdminBox = [];
            this.userList = [];
            this.msg = "New admins assigned";
            this.snackbar = true;
          });
        } else {
          this.msg = "Select atleast one user";
          this.snackbar = true;
        }
      } else if (option == "remove") {
        if (this.removeMemberBox.length > 0) {
          let batch = db.batch();
          let groups = db.collection("groups").doc(this.groupID);
          let users;

          this.removeMemberBox.forEach((data) => {
            users = db.collection("users").doc(data);

            batch.update(groups, {
              members: firebase.firestore.FieldValue.arrayRemove(data),
            });

            batch.update(groups, {
              totalMembers: firebase.firestore.FieldValue.increment(-1),
            });

            batch.update(users, {
              inGroup: firebase.firestore.FieldValue.arrayRemove(this.groupID),
            });
          });
          batch.commit().then(() => {
            this.removeMemberList = !this.removeMemberList;
            this.removeMemberBox = [];
            this.userList = [];
            this.msg = "Users removed successfully";
            this.snackbar = true;
          });
        } else {
          this.msg = "Select atleast one user";
          this.snackbar = true;
        }
      } else if (option == "delete") {
        db.collection("groups")
          .doc(this.groupID)
          .delete()
          .then(() => {
            this.msg = "Group deleted successfully";
            this.snackbar = true;
            this.$router.go({ name: "groups" });
          })
          .catch((err) => {
            console.log("Errarta: ", err);
          });
      } else if (option == "exit") {
        let batch = db.batch();
        let groups = db.collection("groups").doc(this.groupID);
        let users = db.collection("users").doc(this.user.data.uid);

        batch.update(groups, {
          members: firebase.firestore.FieldValue.arrayRemove(
            this.user.data.uid
          ),
        });

        batch.update(groups, {
          totalMembers: firebase.firestore.FieldValue.increment(-1),
        });

        batch.update(users, {
          inGroup: firebase.firestore.FieldValue.arrayRemove(this.groupID),
        });

        batch.commit().then(() => {
          this.userList = [];
          this.msg = "Exited the group successfully";
          this.snackbar = true;
          this.$router.go({ name: "groups" });
        });
      } else if (option == "report") {
        if (this.reportText) {
          db.collection("reports")
            .doc()
            .set({
              author: this.user.data.displayName,
              text: this.reportText,
              groupReported: this.grpNameSetting,
            });
          this.msg = "Report sent successfully";
          this.snackbar = true;
          this.reportGroup = !this.reportGroup;
        } else {
          this.msg = "Report text is empty";
          this.snackbar = true;
        }
      } else if (option == "editName") {
        if (this.grpNameSetting) {
          db.collection("groups")
            .doc(this.groupID)
            .set(
              {
                name: this.grpNameSetting,
              },
              { merge: true }
            );
          this.msg = "Group name edited successfully";
          this.snackbar = true;
          this.editNameDialog = !this.editNameDialog;
        } else {
          this.msg = "Group name is empty";
          this.snackbar = true;
        }
      } else if (option == "copyCode") {
        if (this.inviteCodeSetting) {
          navigator.clipboard.writeText(this.inviteCodeSetting);
          this.msg = "Invite code copied to clipboard";
          this.snackbar = true;
        }
      } else if (option == "changeCode") {
        if (this.inviteCodeSetting) {
          db.collection("groups")
            .doc(this.groupID)
            .set(
              {
                inviteCode: this.inviteCodeSetting,
              },
              { merge: true }
            );
          this.msg = "Invite code changed successfully";
          this.snackbar = true;
          this.editCodeDialog = !this.editCodeDialog;
        }
      }
    },
    closeFeature(feature) {
      if (feature == "list") {
        this.listMembers = !this.listMembers;
        this.userList = [];
      } else if (feature == "remove") {
        this.removeMemberList = !this.removeMemberList;
        this.userList = [];
      } else if (feature == "assign") {
        this.assignAdminList = !this.assignAdminList;
        this.userList = [];
      }
    },
    usersListFetch() {
      db.collection("users")
        .where("inGroup", "array-contains", this.groupID)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let userData = {};
            userData.uid = doc.id;
            userData.photo = doc.data().photo;
            userData.displayName = doc.data().displayName;
            userData.isAdmin = null;
            if (doc.data().isAdmin) {
              if (doc.data().isAdmin.includes(this.groupID)) {
                userData.isAdmin = true;
              }
            }
            this.userList.push(userData);
          });
        });
    },
    createGroup() {
      if (this.grpName && this.inviteCode) {
        let batch = db.batch();
        let groups = db.collection("groups").doc();
        let users = db.collection("users").doc(this.user.data.uid);

        batch.set(groups, {
          name: this.grpName,
          inviteCode: this.inviteCode,
          admin: [this.user.data.uid],
          members: [this.user.data.uid],
          totalMembers: 1,
        });

        batch.update(users, {
          inGroup: firebase.firestore.FieldValue.arrayUnion(groups.id),
          isAdmin: firebase.firestore.FieldValue.arrayUnion(groups.id),
        });

        batch.commit().then(() => {
          this.createDialog = null;
          this.msg = "New Group created";
          this.snackbar = true;
          this.$router.go({ name: "groups" });
        });
      } else {
        this.msg = "Please fill all fields";
        this.snackbar = true;
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
      this.inviteCodeSetting = result;
    },
    copyCode() {
      if (this.inviteCode) {
        navigator.clipboard.writeText(this.inviteCode);
        this.msg = "Invite code copied to clipboard";
        this.snackbar = true;
      }
    },
    itemClick(option, i) {
      if (option == "Map") {
        this.$router.push({ path: "/" });
      } else if (option == "Chat") {
        this.$router.push({ path: "/chats" });
      } else if (option == "Settings") {
        this.groupID = i.id;
        db.collection("groups")
          .doc(this.groupID)
          .get()
          .then((doc) => {
            if (doc.data().admin.includes(this.user.data.uid)) {
              this.showAdminControls = true;
            }
            this.grpNameSetting = doc.data().name;
            this.inviteCodeSetting = doc.data().inviteCode;
          });
        this.groupSettings = true;
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
  },
};
</script>

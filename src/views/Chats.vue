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
      </v-layout>
    </v-container>

    <v-dialog v-model="chatWindow" fullscreen>
      <v-card>
        <v-toolbar dark color="cyan">
          <v-btn icon dark @click="chatWindow = null">
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>
          <v-toolbar-title>School Group</v-toolbar-title>
        </v-toolbar>
        <!-- ===================================== -->
        <!-- <v-container fluid> -->
        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">
                  You
                  <span class="caption" style="float: right">9:29 pm</span>
                </div>
                <div>Reached grandma's place just now</div>
                <!-- <span class="caption" style="float: right">9:29 pm</span> -->
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" cols="9">
            <v-card class="float-left indigo darken-1">
              <v-card-text>
                <div class="caption">
                  Vinay
                  <span class="caption" style="float: right">9:29 pm</span>
                </div>
                <div>Okay great. I'll be there in an hour.</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" cols="9">
            <v-card class="float-left indigo darken-1">
              <v-card-text>
                <div class="caption">
                  Vinay
                  <span class="caption" style="float: right">9:30 pm</span>
                </div>
                <div>
                  If you guys need anything, let me know.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <!-- <v-layout>
          <v-col md="6" sm="6">
            <v-card class="rounded-r-xl float-left indigo darken-1">
              <v-card-text>
                <div class="caption">Sarah</div>
                <div>
                  Won't be coming to the party today, feeling a bit sick
                </div>
                <div class="caption text-right">9:35 pm</div></v-card-text
              >
            </v-card>
          </v-col>
        </v-layout> -->

        <v-layout>
          <v-col md="6" sm="6" cols="9">
            <v-card class="float-left indigo darken-1">
              <v-card-text>
                <div class="caption">
                  Sarah
                  <span class="caption" style="float: right">9:35 pm</span>
                </div>
                <div>
                  Won't be coming to the party today, feeling a bit sick.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <!-- <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="rounded-l-xl float-right teal darken-2">
              <v-card-text>
                <div class="caption">You</div>
                <div>We will miss you! Take care.</div>
                <div class="caption text-right">9:36 pm</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout> -->

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">
                  You
                  <span class="caption" style="float: right">9:38 pm</span>
                </div>
                <div>We will miss you! Take care.</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">
                  You
                  <div class="caption float-right">9:45 pm</div>
                </div>
                <div>Going out to get some groceries.</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">You
                  <div class="caption float-right">9:54 pm</div>
                </div>
                <div>There's a long queue in the supermarket. Might be a bit late.</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" cols="9">
            <v-card class="float-left indigo darken-1">
              <v-card-text>
                <div class="caption">
                  Praneet
                  <span class="caption" style="float: right">9:55 pm</span>
                </div>
                <div>
                  Okay. Let us know when you reach your home.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">You
                  <div class="caption float-right">9:56 pm</div>
                </div>
                <div></div>
                Yeah of course!
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">You
                  <div class="caption float-right">11:05 pm</div>
                </div>
                <div></div>
                Sorry for not updating you guys. Met an old friend and we got
                talking.
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">You
                  <div class="caption float-right">11:05 pm</div>
                </div>
                <div></div>
                The last message doesn't show up.
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" cols="9">
            <v-card class="float-left indigo darken-1">
              <v-card-text>
                <div class="caption">
                  Praneet
                  <span class="caption" style="float: right">9:55 pm</span>
                </div>
                <div>
                  Okay. Let us know when you reach your home.
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>

        <v-layout>
          <v-col md="6" sm="6" offset-md="6" offset-sm="6">
            <v-card class="float-right teal darken-2">
              <v-card-text>
                <div class="caption">You
                  <div class="caption float-right">11:05 pm</div>
                </div>
                <div></div>
                Just somthing i wanted to say
              </v-card-text>
            </v-card>
          </v-col>
        </v-layout>
        <!-- ======================================= -->
        <v-footer fixed padless>
          <v-layout>
            <v-col>
              <v-text-field filled rounded placeholder="Type a message">
                <template v-slot:append-outer>
                  <v-icon>mdi-send</v-icon>
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

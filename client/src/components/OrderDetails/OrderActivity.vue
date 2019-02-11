<template>
  <v-layout row wrap>
    <!-- <v-flex xs12>
      <h2>Aktivitas</h2>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">To Do List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 style="font-size: 18px">
                {{ task_description }}
              </v-flex>
              <v-flex xs12>
                <v-select v-model="selected_option" :items="options" item-text="optiontext"
                  item-value="optionvalue" label="Keputusan" required></v-select>
              </v-flex>
              <v-flex xs12 v-show="true">
                <v-textarea name="input-7-1" box label="Keterangan" auto-grow></v-textarea>
              </v-flex>
              <v-flex xs12 v-show="true">
                <input type="file" name="Upload Dokumen">
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple" flat>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex> -->
    <v-flex xs12>
      <h2>Aktivitas</h2>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <span class="headline">To Do List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 style="font-size: 18px">
                {{ task_description }}
              </v-flex>
              <v-flex xs12>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">User Profile</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal first name*" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Legal last name*" hint="example of persistent helper text"
                              persistent-hint required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Email*" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Password*" type="password" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*"
                              required></v-select>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-autocomplete :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                              label="Interests" multiple></v-autocomplete>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <v-flex xs12>
                <v-select v-model="selected_option" :items="options" item-text="optiontext"
                  item-value="optionvalue" label="Keputusan" required></v-select>
              </v-flex>
              <v-flex xs12 v-show="true">
                <v-textarea name="input-7-1" box label="Keterangan" auto-grow></v-textarea>
              </v-flex>
              <v-flex xs12 v-show="true">
                <input type="file" name="Upload Dokumen">
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple" flat>Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
        selected_option: '',
        task_description: 'Hello there',
        options: [{
            optiontext: 'YES',
            optionvalue: true
          },
          {
            optiontext: 'NO',
            optionvalue: false
          },
        ],
      };
    },
  }

</script>

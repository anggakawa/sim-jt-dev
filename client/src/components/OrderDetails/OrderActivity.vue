<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h2>Aktivitas</h2>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <!-- <v-card-title>
          <span class="headline">To Do List</span>
        </v-card-title> -->
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 style="font-size: 15px">
                <h2>{{ current_activity.activity_name }}</h2>
                <p style="padding-top: 25px">{{ current_activity.activity_description }}</p>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <h2>TASK</h2>
              </v-flex>
              <v-flex xs10>
                <v-select v-model="selected_option" :items="vendors" item-text="optiontext"
                  item-value="optionvalue" label="Pilih Vendor" required></v-select>
              </v-flex>
              <v-flex xs2>
                <v-btn block :loading="loading2" :disabled="loading2" color="success" @click="loader = 'loading2'">
                  SIMPAN
                  <span slot="loader">Loading...</span>
                </v-btn>
              </v-flex>
              <v-flex xs10 v-if="current_activity.require_status">
                <v-select v-model="selected_option" :items="options" item-text="optiontext"
                  item-value="optionvalue" label="Keputusan" required></v-select>
              </v-flex>
              <v-flex xs2>
                <v-btn block :loading="loading2" :disabled="loading2" color="success" @click="loader = 'loading2'">
                  SIMPAN
                  <span slot="loader">Loading...</span>
                </v-btn>
              </v-flex>
              <v-flex xs10 v-if="current_activity.require_information">
                <v-textarea name="input-7-1" box label="Keterangan" auto-grow></v-textarea>
              </v-flex>
              <v-flex xs2 v-if="current_activity.require_information">
                <v-btn block :loading="loading2" :disabled="loading2" color="success" @click="loader = 'loading2'">
                  SIMPAN
                  <span slot="loader">Loading...</span>
                </v-btn>
              </v-flex>
              <v-flex xs12 v-if="current_activity.require_attachment">
                Silahkan Upload Lampiran Yang Dibutuhkan
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-btn slot="activator" color="success">Upload Files</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Upload Lampiran</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <input type="file" name="Upload Dokumen">
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <v-flex xs12 v-if="current_activity.can_close">
                Apakah anda ingin menutup (close) Order?
                <v-btn color="success" dark @click="dialog2 = true">
                  CLOSE ORDER
                </v-btn>
                <v-dialog v-model="dialog2" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Close Order?</v-card-title>
                    <v-card-text>
                      <p>Anda akan menutup order, apakah anda yakin?</p>
                      *<b>Anda tidak dapat membatalkan aksi ketika sudah melakukan close order</b>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="dialog2 = false">
                        Cancel
                      </v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="dialog2 = false">
                        Agree
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="purple" flat>Next</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        loader: null,
        dialog: false,
        dialog2: false,
        loading2: false,
        selected_option: '',
        selected_vendor: '',
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
        current_activity: {},
        vendors: [],
      };
    },
    watch: {
      loader() {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    },
    methods: {
      getCurrentActivity() {
        axios.get('http://localhost:3000/api/current-activity/' + this.$route.params.order_id)
          .then((result) => this.current_activity = result.data[0]);
      },
      getVendors() {
        axios.get('http://localhost:3000/api/vendors')
          .then((result) => console.log(result));
      }

    },
    created() {
      this.getCurrentActivity();
      this.getVendors();
    },
  }

</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>

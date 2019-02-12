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

              <v-flex xs12 v-if="current_activity.require_attachment">
                Silahkan Pilih Vendor
                <v-dialog v-model="dialog4" persistent max-width="600px">
                  <v-btn slot="activator" color="success">Pilih Vendor</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Pilih Vendor</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-select v-model="selected_vendor" :items="vendors" item-text="user_description"
                              item-value="user_id" label="Pilih Vendor" required></v-select>
                          </v-flex>
                          <v-flex xs12>
                            <v-textarea name="input-7-1" box label="Keterangan" v-model="vendor_information" auto-grow></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog4 = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="saveOrderVendor">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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

              <v-flex xs12>
                Masukkan Informasi dan Keputusan
                <v-dialog v-model="dialog3" persistent max-width="600px">
                  <v-btn slot="activator" color="success">Tambahkan Informasi</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Informasi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 v-if="current_activity.require_status">
                            <v-select v-model="selected_option" :items="options" item-text="optiontext"
                              item-value="optionvalue" label="Keputusan" required></v-select>
                          </v-flex>
                          <v-flex xs12 v-if="current_activity.require_information">
                            <v-textarea name="input-7-1" box label="Keterangan" auto-grow></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog3 = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="saveToOrderLog">Save</v-btn>
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
        dialog3: false,
        dialog4: false,
        loading2: false,
        selected_option: null,
        selected_vendor: '',
        vendor_information: '',
        options: [{
            optiontext: 'YES',
            optionvalue: 1
          },
          {
            optiontext: 'NO',
            optionvalue: 0
          },
        ],
        information: '',
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
          .then((result) => this.vendors = result.data);
      },
      saveToOrderLog() {
        axios.post('http://localhost:3000/api/order-history/post', {
          order_id: this.$route.params.order_id,
          activity_id: this.current_activity.activity_id,
          information: this.information,
          status: this.selected_option,
          date: new Date().toISOString().slice(0, 19).replace('T', ' '),
          user_id: localStorage.getItem('user-id'),
        }).then(() => this.dialog3 = false);
      }, 
      saveOrderVendor() {
        axios.post('http://localhost:3000/api/order-vendor', {
          order_id: this.$route.params.order_id, 
          vendor_id: this.selected_vendor,
          vendor_information: this.vendor_information,
        }).then(() => this.dialog4 = false);
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

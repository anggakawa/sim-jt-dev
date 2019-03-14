<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h2>Aktivitas</h2>
    </v-flex>
    <v-flex xs12>
      <v-card v-if="checkIfEligible()">
        <v-form ref="form" lazy-validation>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step v-if="current_activity.can_choose_vendor" :complete="e1 > 1" step="1">Pilih Vendor</v-stepper-step>
            <v-divider v-if="current_activity.can_choose_vendor"></v-divider>
            <v-stepper-step v-if="current_activity.require_information || current_activity.require_status" :complete="e1 > 2" step="2">Tambah Informasi</v-stepper-step>
            <v-divider v-if="current_activity.require_information || current_activity.require_status"></v-divider>
            <v-stepper-step v-if="current_activity.require_attachment" :complete="e1 > 3" step="3">Tambah Lampiran</v-stepper-step>
            <v-divider v-if="current_activity.require_attachment"></v-divider>
            <v-stepper-step v-if="current_activity.can_close" step="4">Tutup Order</v-stepper-step>
          </v-stepper-header>
        </v-stepper>

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
              
              <v-flex xs12 v-if="current_activity.can_choose_vendor">
                Silahkan Pilih Vendor
                <v-dialog v-model="dialog4" persistent max-width="600px">
                  <v-btn round slot="activator" color="success">Pilih Vendor</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Pilih Vendor</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <v-select v-model="selected_vendor" :items="vendors" item-text="user_description"
                            :rules="[v => !!v || 'Item is required']" item-value="user_id" label="Pilih Vendor" required></v-select>
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

              <v-flex xs12>
                Tekan untuk memasukkan informasi dan lampiran
                <v-btn round :loading="loading2" :disabled="loading2"
                  @click="createNewOrderHistory" color="blue-grey"
                  class="white--text">
                  <v-icon>add</v-icon>
                  Order Log
                </v-btn>
              </v-flex>

              <v-container v-show="showActivity">

              <v-flex xs12>
                1. Masukkan Informasi dan Keputusan
                <v-dialog v-model="dialog3" persistent max-width="600px">
                  <v-btn round slot="activator" color="success" @click="getOptions()">Tambahkan Informasi</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Informasi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 v-if="current_activity.require_status">
                            <v-select v-model="selected_option" :items="options" item-text="option_text"
                              item-value="option_value" label="Keputusan" required></v-select>
                          </v-flex>
                          <v-flex xs12 v-if="current_activity.require_information">
                            <v-textarea v-model="information" name="input-7-1" box label="Keterangan"
                              :rules="[v => !!v || 'Item is required']" auto-grow required></v-textarea>
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

              <v-flex xs12 v-if="current_activity.require_attachment">
                2. Silahkan Upload Lampiran Yang Dibutuhkan
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-btn round slot="activator" color="success">Upload Files</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Upload Lampiran</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12>
                            <p class="font-weight-bold font-italic body-2">{{ current_activity.activity_description }}</p>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <input type="file" id="file" ref="files" name="Upload Dokumen" multiple
                             :rules="[v => !!v || 'Item is required']" v-on:change="handleFileUploads()" required>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" flat @click="uploadFiles()">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- <v-dialog v-model="dialog" persistent max-width="600px">
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
                </v-dialog> -->
              </v-flex>


              </v-container>

              <v-flex xs12 v-if="current_activity.can_close">
                Apakah anda ingin menutup (close) atau membatalkan Order?
                <v-btn round color="success" dark @click="dialog2 = true">
                  CLOSE ORDER
                </v-btn>
                <v-dialog v-model="dialog2" max-width="440">
                  <v-card>
                    <v-card-title class="headline">Close Order?</v-card-title>
                    <v-card-text>
                      <p>Anda akan menutup order, apakah anda yakin?</p>
                      *<b>Anda tidak dapat membatalkan aksi ketika sudah melakukan close order</b>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="green darken-1" flat="flat" @click="dialog2 = false">
                        Close Dialog
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click="closeOrder(3)">
                        Cancel Order
                      </v-btn>
                      <v-btn color="green darken-1" flat="flat" @click="closeOrder(2)">
                        Agree Order
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
          <v-btn color="purple" :disabled="!checkSteps()" flat @click="getAndUpdateStep()">Next</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
      <v-card class="text-md-center" v-else>
        <div style="padding: 50px; font-size: 20px">
          No activity to do
        </div>
      </v-card>
    </v-flex>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      vertical
    >
      {{ msg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  
  </v-layout>
</template>

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

<script>
  import FileUpload from './UploadForm.vue';
  import axios from '@/services/service.api.js';

  export default {
    data() {
      return {
        timeout: 6000,
        snackbar: false,
        msg: '',
        loader: null,
        e1: 0,
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        loading2: false,
        selected_option: 1,
        selected_vendor: '',
        vendor_information: '',
        insert_id: '',
        options: [],
        information: '',
        current_activity: {},
        vendors: [],
        files: [],
        showActivity: false,
      };
    },
    watch: {
      loader() {
        const l = this.loader;
        this[l] = !this[l];
        this.msg = 'Histori order tersimpan';

        setTimeout(() => {
          this[l] = false;
          this.showActivity = true;
          this.snackbar = true;
        }, 3000)

        this.loader = null;
      }
    },
    methods: {
      getCurrentActivity() {
        axios.get('current-activity/' + this.$route.params.order_id)
          .then((result) => this.current_activity = result.data[0])
          .catch((error) => console.log(error));
      },
      getVendors() {
        axios.get('vendors')
          .then((result) => this.vendors = result.data)
          .catch((error) => console.log(error));
      },
      createNewOrderLog() {
        
      }
      ,
      saveToOrderLog() {
        // axios.post('order-history/post', {
        //     order_id: this.$route.params.order_id,
        //     activity_id: this.current_activity.activity_id,
        //     information: this.information,
        //     status: this.selected_option,
        //   })
        //   .then((result) => {
        //     this.insert_id = result.data.insertId;
        //   })
        //   .then(() => {
        //     this.e1 = 3;
        //     this.dialog3 = false;
        //   })
        //   .catch((error) => console.log(error));
        axios.put('order-history/edit', {
            order_id: this.$route.params.order_id,
            information: this.information,
            status: this.selected_option,
            order_logs_id: this.insert_id
          })
          .then(() => {
            this.e1 = 3;
            this.dialog3 = false;
          })
          .catch((error) => console.log(error));  
      },
      saveOrderVendor() {
        axios.post('order-vendor', {
          order_id: this.$route.params.order_id,
          vendor_id: this.selected_vendor,
          vendor_information: this.vendor_information,
        }).then(() => {
          this.el1 = 2;
          this.dialog4 = false;
        }).catch((error) => console.log(error));
      },
      getOptions() {
        axios.get('activity-options/' + this.current_activity.activity_id)
          .then(result => this.options = result.data)
          .catch((error) => console.log(error));
      },
      async getAndUpdateStep() {
        if (confirm('apakah anda yakin? anda tidak akan bisa mengubah kembali kegiatan ini')) {
          const result = await axios.get('activity-step/' + this.current_activity
            .activity_id + '/' + this.selected_option);
          return axios.put('current-activity/' + this.$route.params.order_id +
              '/' + result.data[0].next_step)
            .then(() => this.$router.go())
            .catch((error) => console.log(error));
        }
      },
      closeOrder(props) {
        axios.put('order/' + this.$route.params.order_id + '/' + props)
          .then(() => {
            this.dialog2 = false;
          })
      },
      uploadFiles() {
        // console.log(typeof this.insert_id === typeof 1)
        if ((typeof this.insert_id === typeof 1)) {
          let formData = new FormData();
          for (let index = 0; index < this.files.length; index++) {
            let file = this.files[index];
            // formData.append('files[' + index + '' , file);
            formData.append('attachments', file);
          }
          return axios.post('uploads/' + this.insert_id,
              formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            ).then(() => console.log('success')).then(() => {
                this.e1 = 4;
                this.dialog = false;
              })
            .catch((error) => console.log(error));
        }
        this.dialog = false;
      },
      handleFileUploads() {
        this.files = this.$refs.files.files;
      },
      checkIfEligible() {
        return parseInt(this.$store.getters.roleStatus) === this.current_activity.role_id ||
          parseInt(this.$store.getters.roleStatus) === 1;
      }, 
      checkSteps() {
        return this.e1 > 0;
      },
      createNewOrderHistory() {
        this.loader = 'loading2';
        return axios.post('order-history/new', {
          order_id: this.$route.params.order_id,
          activity_id: this.current_activity.activity_id
        })
        .then((result) => {
          this.insert_id = result.data.insertId;
        });
      }
    },
    created() {
      Promise.all([
        this.getCurrentActivity(),
        this.getVendors()
      ]);
    },
  }

</script>

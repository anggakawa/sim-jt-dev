<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div style="margin-bottom: 30px; padding-top: 5px">
        <h2 id="activity-title">Aktivitas</h2>
        <v-chip label :color="chip_color" text-color="white" id="chip"><span class="font-weight-medium">{{ getDay }}</span></v-chip>
      </div>
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
                            <v-select v-model="replaced" :items="options_select" item-text="text"
                            :rules="[v => !!v || 'Item is required']" item-value="value" label="Status Pemilihan" required></v-select>
                          </v-flex>
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

              <v-flex xs12 v-if="current_activity.require_information || current_activity.require_status || current_activity.require_attachment">
                Tekan untuk memasukkan informasi dan lampiran
                <v-btn round :loading="loading2" :disabled="loading2"
                  @click="createNewOrderHistory" color="blue-grey"
                  class="white--text">
                  <v-icon>add</v-icon>
                  Order Log
                </v-btn>
              </v-flex>

              <v-container v-show="showActivity">

              <v-flex xs12 v-if="current_activity.require_information || current_activity.require_status">
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

              <v-flex xs12 v-if="current_activity.can_close || current_activity.can_cancel || current_activity.can_finish">
                Apakah anda ingin menutup (close) atau membatalkan Order?
                <v-btn round color="success" dark @click="dialog2 = true">
                  CLOSE ORDER
                </v-btn>
                <v-dialog v-model="dialog2" max-width="440">
                  <v-card>
                    <v-card-title class="headline">Close Order?</v-card-title>
                    <v-card-text>
                      <p>Anda akan menutup/cancel order, apakah anda yakin?</p>
                      *<b>Anda tidak dapat membatalkan aksi ketika sudah melakukan aksi</b>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="green darken-1" flat="flat" @click="dialog2 = false">
                        Close Dialog
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn v-if="current_activity.can_cancel" color="green darken-1" flat="flat" @click="closeOrder(3)">
                        Cancel Order
                      </v-btn>
                      <v-btn v-if="current_activity.can_finish" color="green darken-1" flat="flat" @click="closeOrder(4)">
                        Finish Order
                      </v-btn>
                      <v-btn v-if="current_activity.can_close" color="green darken-1" flat="flat" @click="closeOrder(2)">
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
          <h2>{{ current_activity.activity_name }}</h2>
          <p>No activity to do.</p>
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
import moment from 'moment';
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
        replaced: '',
        insert_id: '',
        options: [],
        information: '',
        current_activity: {},
        vendors: [],
        files: [],
        showActivity: false,
        latestDate: '',
        deadline: '',
        duration: 0,
        chip_color: 'red',
        options_select: [
          {
            text: 'Ganti Vendor', 
            value: 1,
          },
          {
            text: 'Pilih Baru', 
            value: 0,
          },
        ],
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
      }, 3000);

      this.loader = null;
    },
  },
  methods: {
    getCurrentActivity() {
      axios.get(`current-activity/${this.$route.params.order_id}`)
        .then(result => this.current_activity = result.data[0])
        .catch(error => console.log(error));
    },
    getVendors() {
      axios.get('vendors')
        .then(result => this.vendors = result.data)
        .catch(error => console.log(error));
    },
    createNewOrderLog() {

    },
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
        order_logs_id: this.insert_id,
      })
        .then(() => {
          this.e1 = 3;
          this.dialog3 = false;
        })
        .catch(error => console.log(error));
    },
    saveOrderVendor() {
      axios.post('order-vendor', {
        order_id: this.$route.params.order_id,
        vendor_id: this.selected_vendor,
        vendor_information: this.vendor_information,
        replaced: this.replaced
      }).then(() => {
        this.e1 = 2;
        this.dialog4 = false;
      }).catch(error => console.log(error));
    },
    getOptions() {
      axios.get(`activity-options/${this.current_activity.activity_id}`)
        .then(result => this.options = result.data)
        .catch(error => console.log(error));
    },
    async getAndUpdateStep() {
      this.$swal("Apakah anda yakin? anda tidak akan bisa mengubah kembali kegiatan ini", {
        buttons: true,
        icon: 'info'
      }).then((confirm) => {
        if (confirm) {
          const result = axios.get(`activity-step/${this.current_activity.activity_id}/${this.selected_option}`);
          result.then((res) => {
            return axios.put(`current-activity/${this.$route.params.order_id}/${res.data[0].next_step}`)
          })
          .then(() => this.$router.go())
          .catch(error => console.log(error));
        }
      });
    },
    closeOrder(props) {
      axios.put(`order/${this.$route.params.order_id}/${props}`)
        .then(() => {
          this.dialog2 = false;
          this.e1 = 5;
        });
    },
    uploadFiles() {
      // console.log(typeof this.insert_id === typeof 1)
      if ((typeof this.insert_id === typeof 1)) {
        const formData = new FormData();
        for (let index = 0; index < this.files.length; index++) {
          const file = this.files[index];
          // formData.append('files[' + index + '' , file);
          formData.append('attachments', file);
        }
        return axios.post(`uploads/${this.insert_id}`,
          formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then(() => console.log('success')).then(() => {
          this.e1 = 4;
          this.dialog = false;
        })
          .catch(error => console.log(error));
      }
      this.dialog = false;
    },
    handleFileUploads() {
      this.files = this.$refs.files.files;
    },
    checkIfEligible() {
      return parseInt(this.$store.getters.roleStatus) === this.current_activity.role_id
          || parseInt(this.$store.getters.roleStatus) === 1;
    },
    checkSteps() {
      return this.e1 > 0;
    },
    createNewOrderHistory() {
      this.loader = 'loading2';
      return axios.post('order-history/new', {
        order_id: this.$route.params.order_id,
        activity_id: this.current_activity.activity_id,
      })
        .then((result) => {
          this.insert_id = result.data.insertId;
        });
    },
    getLatestLogDate() {
      return axios.get(`order-history/latest-date/${this.$route.params.order_id}`)
        .then(result => this.latestDate = result.data[0].date);
    },
    getDeadlineDate() {
      const time = this.current_activity.max_duration || 88;
      this.deadline = moment(this.latestDate).add(time, 'hours').utc().format();
    },
    getDifferences() {
      const current_date = moment();
      const deadline = moment(this.deadline);
      const diff = deadline.diff(current_date);
      if (diff > 0) {
        const f = moment.utc(diff).format('HH:mm:ss');
        this.chip_color = 'green';
        this.duration = `Sisa waktu : ${f}`;
      } else {
        const f = current_date.to(deadline);
        // const f = moment.duration(diff).asHours();
        this.chip_color = 'red';
        this.duration = `Expired ${f}`;
      }
    },
  },
  created() {
    Promise.all([
      this.getCurrentActivity(),
      this.getVendors(),
      this.getLatestLogDate(),
    ]).then(() => this.getDeadlineDate())
      .then(() => setInterval(() => this.getDifferences(), 1000));
  },
  computed: {
    getDay() {
      return this.duration;
    },
  },
};

</script>

<style>
#chip {
  position: absolute;
  right: 35px;
}
#activity-title {
  position: absolute;
}
</style>

<template>
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
              <input type="file" id="file" ref="files" name="Upload Dokumen" multiple v-on:change="handleFileUploads()">
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
</template>

<script>
import axios from '@/services/service.api.js';

export default {
  data() {
    return {
      insert_id: 6,
      dialog: false,
      files: '',
    };
  },
  methods: {
    async uploadFiles() {
      if ((true)) {
        const formData = new FormData();
        for (let index = 0; index < this.files.length; index++) {
          const file = this.files[index];
          formData.append(`files[${index}]`, file);
        }
        axios.post(`uploads/${this.insert_id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then(() => console.log('success'))
          .catch(error => console.log(error));
      }
    },
    async handleFileUploads() {
      this.files = this.$refs.files.files;
    },
  },
};
</script>

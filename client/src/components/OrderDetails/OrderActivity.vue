<template>
  <v-layout row wrap>
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

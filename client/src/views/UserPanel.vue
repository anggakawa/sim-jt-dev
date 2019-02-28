<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs6>
      <p class="body font-italic">Silahkan isi form berikut kemudian save untuk mengganti data</p>
      <v-form ref="form" lazy-validation>
        <v-text-field :rules="passwordRules" type="password" label="Password" v-model="password" required></v-text-field>
        <v-text-field :rules="passwordRules" type="password" label="Password Confirmation" v-model="password_conf" required></v-text-field>
        <v-text-field v-model="user_description" label="User Description" required></v-text-field>
        <v-flex xs12 offset-xs10>
          <v-btn :disabled="!checkPassword" @click="save">Save</v-btn>
        </v-flex>
      </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from '@/services/service.api.js';

export default {
  data() {
    return {
      password: '',
      password_conf: '',
      passwordRules: [
        v => !!v || 'password is required'
      ],
      user_description: '',
    }
  }, 
  computed: {
    checkPassword() {
      return this.password === this.password_conf && this.password.length > 1;
    }
  }, 
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        return axios.put('users/edit', {
          password: this.password_conf, 
          user_description: this.user_description
        }).then((result) => {
          if (result.data.success) {
            window.alert('data berhasil diganti')
          }
        }).catch(error => {
          window.alert('error');
        })
      }
    }
  }
}
</script>

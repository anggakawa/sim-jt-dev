<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <div>
            <v-alert v-model="alert" dismissible type="error">
              {{ error_message }}
            </v-alert>
          </div>
          <v-toolbar dark color="red">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="username" name="login" label="Login"
                type="text"></v-text-field>
              <v-text-field prepend-icon="lock" name="password" v-model="password" label="Password"
                id="password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" class="red white--text">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        alert: false,
        error_message: '',
      }
    },
    methods: {
      login() {
        const username = this.username;
        const password = this.password;
        this.$store.dispatch('login', {
          username,
          password
        }).then((res) => {
          if (res.data.success) {
            this.$router.push('/');
          } else {
            this.error_message = res.data.result;
            this.alert = true;
            console.log(res.data.result);
          }
        }).catch((err) => console.log(err));
      }
    }
  };

</script>

<style>
</style>

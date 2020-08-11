<template>
  <div class="signin">
    <v-alert type="error" v-if="!validate_success">入力項目にエラーがあります</v-alert>
    <v-alert type="error" v-if="!signin_success">{{ errorMessage }}</v-alert>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="signin_form">
          <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="username" :rules="[required, email]" @change="onChange" />
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" v-model="password" @click:append="showPassword = !showPassword" :rules="[required]" @change="onChange" />
          <v-card-actions>
            <v-btn @click="signIn" class="info">ログイン</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data: () => ({
    showPassword: false,
    username: '',
    password: '',
    errorMessage: '',
    validate_success: true, 
    signin_success: true,
    required: value => !!value || "必ず入力してください",
    email: v => /.+@.+/.test(v) || 'メールアドレスを入力してください',
  }),
  methods: {
    signIn: function () {
      if(this.$refs.signin_form.validate()) {
        this.validate_success = true
        this.signin_success = true

        firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        .then(res => {
          console.log("ログイン成功" + res.user.email)
          this.$router.push('/')
        })
        .catch(err => {
          this.signin_success = false
          this.errorMessage = err.message
        })
      }
      else {
        this.validate_success = false
      }
    },

    onChange: function () {
      if (!this.validate_success && this.$refs.signin_form.validate()) {
         this.validate_success = true
      }
    }
  }
}
</script>
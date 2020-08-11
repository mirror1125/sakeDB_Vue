<template>
  <div class="signup">
    <v-alert type="error" v-if="!validate_success">入力項目にエラーがあります</v-alert>
    <v-alert type="error" v-if="!signup_success">{{ errorMessage }}</v-alert>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="signup_form">
          <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="username" :rules="[required, email]" @change="onChange" />
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" v-model="password" @click:append="showPassword = !showPassword" :rules="[required, limit_length]" @change="onChange" />
          <v-text-field v-bind:type="showConfPass ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"   label="パスワード(確認用)" v-model="conf_pass" @click:append="showConfPass = !showConfPass" :rules="[required, limit_length, passwordConfirmationRule]" @change="onChange" />
          <v-card-actions>
            <v-btn @click="signUp" class="info">登録</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data: () => ({
    showPassword: false,
    showConfPass: false,
    username: '',
    password: '',
    conf_pass: '',
    errorMessage: '',
    validate_success: true,
    signup_success: true,
    required: value => !!value || "必ず入力してください",
    limit_length: value => value.length >= 8 || "8文字以上にしてください",
    email: v => /.+@.+/.test(v) || 'メールアドレスを入力してください',
  }),
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.conf_pass) || 'パスワードが一致しません'
    }
  },
  methods: {
    signUp: function () {
      if(this.$refs.signup_form.validate()) {
        this.validate_success = true
        this.signup_success = true
        firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
          .then(res => {
            alert('ユーザ登録完了 : ' + res.user.email)
            this.$router.push('/signin')
          })
          .catch(error => {
            this.signup_success = false
            this.errorMessage = error.message
          })
      } else {
        this.validate_success = false
      }
    },

    onChange: function () {
      if (!this.validate_success && this.$refs.signup_form.validate()) {
         this.validate_success = true
      }
    }
  }
}
</script>

<style scoped>
.btn_span {
  margin-left: 5px;
}

</style>
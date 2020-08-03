<template>
  <div class="signup">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field prepend-icon="mdi-account-circle" label="メールアドレス" v-model="username" />
          <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" v-model="password" @click:append="showPassword = !showPassword" />
          <v-card-actions>
            <v-btn class="info">ログイン</v-btn>
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
  }),
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password)
        .then(res => {
          alert("ログイン成功" + res.user.email)
          this.$router.push('/')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }
}
</script>
<template>
  <div class="signup">
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="mdi-account-circle"
            label="メールアドレス"
            v-model.trim="$v.username.$model"
          />
          <div class="error" v-if="!$v.username.required">入力してください</div>
          <v-text-field
            v-bind:type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            v-model.trim="$v.password.$model"
            @click:append="showPassword = !showPassword"
          />
          <div class="error" v-if="!$v.password.required">入力してください</div>
          <div
            class="error"
            v-if="!$v.password.minLength"
          >{{$v.password.$params.minLength.min}}文字以上にしてください</div>
          <v-text-field
            v-bind:type="showConfPass ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            v-bind:append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード(確認用)"
            v-model.trim="$v.conf_pass.$model"
            @click:append="showConfPass = !showConfPass"
          />
          <div class="error" v-if="!$v.conf_pass.required">入力してください</div>
          <div
            class="error"
            v-if="!$v.conf_pass.minLength"
          >{{$v.conf_pass.$params.minLength.min}}文字以上にしてください</div>
          <v-card-actions>
            <v-btn @click="signUp" class="info">登録</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import { require, minLength } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  data: () => ({
    showPassword: false,
    showConfPass: false,
    username: "",
    password: "",
    conf_pass: "",
  }),
  validations: {
    username: {
      require,
    },
    password: {
      require,
      minLength: minLength(8),
    },
    conf_pass: {
      require,
      minLength: minLength(8),
    },
  },
  methods: {
    signUp: function () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((res) => {
          alert("ユーザ登録完了 : " + res.user.email);
          this.$router.push("/signin");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
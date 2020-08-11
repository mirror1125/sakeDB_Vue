<template>
  <div class="sake_regist">
    <AppHeader />
    <v-alert type="success" v-if="regist_success">登録を完了しました</v-alert>
    <v-alert type="error" v-if="regist_error">{{ errorMessage }}</v-alert>
    <v-card>
      <v-card-title>酒の登録</v-card-title>
      <v-card-text>
        <v-form ref="regist_form">
          <v-text-field label="名前" v-model="sakeName" />
          <v-combobox label="酒種" v-model="type" :items="types" />
          <v-text-field label="産地" v-model="origin" />
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field v-model="date" label="日にち" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker no-title v-model="date" @input="menu = false"></v-date-picker>
          </v-menu>
          <v-text-field label="飲んだ場所" v-model="place" />
          <v-combobox label="購入形態" v-model="volume" :items="volumes" />
          <v-text-field label="価格" v-model="price" suffix="円" />

          <v-divider></v-divider>

          <v-subheader>香り</v-subheader>
          <v-slider
            class="two-chara-label"
            v-model="smellStrength"
            label="強さ    "
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            v-model="smellRich"
            label="芳醇さ"
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            v-model="smellFruit"
            label="果実感"
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            class="two-chara-label"
            v-model="smell"
            label="臭み    "
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            class="two-chara-label"
            v-model="smellAfterglow"
            label="余韻    "
            :tick-labels="lengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>

          <v-divider></v-divider>

          <v-subheader>味</v-subheader>
          <v-slider
            class="two-chara-label"
            v-model="tasteStrength"
            label="濃さ    "
            :tick-labels="intensityLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            class="two-chara-label"
            v-model="tasteSour"
            label="酸味    "
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            class="two-chara-label"
            v-model="tasteSweet"
            label="甘み    "
            :tick-labels="strengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            v-model="tasteHardness"
            label="口当り"
            :tick-labels="hardnessLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-slider
            class="two-chara-label"
            v-model="tasteAfterglow"
            label="余韻    "
            :tick-labels="lengthLabels"
            :max="4"
            step="1"
            ticks="always"
            tick-size="5"
          ></v-slider>
          <v-textarea outlined label="メモ" v-model="memo" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="regist" class="info">登録</v-btn>
      </v-card-actions>
    </v-card>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import firebase from "firebase";

export default {
  name: "Regist",
  components: {
    AppHeader,
    AppFooter,
  },
  data: () => ({
    regist_success: false,
    regist_error: false,
    errorMessage: "",
    sakeName: "",
    type: "",
    origin: "",
    date: "",
    menu: "",
    place: "",
    volume: "",
    price: "",
    smellStrength: "",
    smellRich: "",
    smellFruit: "",
    smell: "",
    smellAfterglow: "",
    tasteStrength: "",
    tasteSour: "",
    tasteSweet: "",
    tasteHardness: "",
    tasteAfterglow: "",
    memo: "",
    types: [
      "日本酒",
      "焼酎",
      "泡盛",
      "ビール",
      "ワイン",
      "ウイスキー",
      "ラム",
      "ジン",
      "テキーラ",
      "ブランデー",
      "ウォッカ",
      "カクテル",
      "リキュール",
      "その他",
    ],
    volumes: [
      "グラス",
      "ボトル",
      "350ml缶",
      "500ml缶",
      "1合",
      "1升",
      "1パック",
    ],
    strengthLabels: ["弱い", "", "", "", "強い"],
    lengthLabels: ["短い", "", "", "", "長い"],
    intensityLabels: ["薄い", "", "", "", "濃い"],
    hardnessLabels: ["軟らか", "", "", "", "硬い"],
  }),
  methods: {
    regist: function () {
      firebase
        .database()
        .ref("sakes")
        .push({
          name: this.sakeName,
          type: this.type,
          origin: this.origin,
          date: this.date,
          place: this.place,
          volume: this.volume,
          price: this.price,
          smellStrength: this.smellStrength,
          smellRich: this.smellRich,
          smellFruit: this.smellFruit,
          smell: this.smell,
          smellAfterglow: this.smellAfterglow,
          tasteStrength: this.tasteStrength,
          tasteSour: this.tasteSour,
          tasteSweet: this.tasteSweet,
          tasteHardness: this.tasteHardness,
          tasteAfterglow: this.tasteAfterglow,
          memo: this.memo,
        })
        .then(() => {
          this.regist_success = true;
          this.regist_error = false;
          this.$vuetify.goTo(0);
          this.$refs.regist_form.reset();
        })
        .catch((err) => {
          this.regist_success = false;
          this.regist_error = true;
          this.errorMessage = err.message;
        });
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 5px;
}

.v-subheader {
  font-size: 16px;
}

.two-chara-label {
  white-space: pre-wrap;
}
</style>
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCUS1fUX0wvA7UZn9LnPKLfQRSZsn9K9aI",
  authDomain: "sake-db-e7a3b.firebaseapp.com",
  databaseURL: "https://sake-db-e7a3b.firebaseio.com",
  projectId: "sake-db-e7a3b",
  storageBucket: "sake-db-e7a3b.appspot.com",
  messagingSenderId: "652741440676",
  appId: "1:652741440676:web:81477babe65255fd8d2231",
  measurementId: "G-LQ8BS9VH4P"
}
firebase.initializeApp(config)
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

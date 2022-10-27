import { createApp } from 'vue'
import App from './App.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAjWZ1-0HvXxwE8OOYUpAFUcBmsBHn4-pU',
  authDomain: 'we-message-4ef28.firebaseapp.com',
  projectId: 'we-message-4ef28',
  storageBucket: 'we-message-4ef28.appspot.com',
  messagingSenderId: '573441356979',
  appId: '1:573441356979:web:7625e94c27c3f74c172cc6',
  measurementId: 'G-QG4Q8BVEXZ'
};

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => createApp(App).mount('#app'))




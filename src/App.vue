<template>
<div>
  <div v-if="user">
    <HeaderComponent :modes="mode" :img="avatar" :name="name" :img2="chatUser.avatar" :name2="chatUser.name" @change-mode="changeMode"/>
    <ContactList v-if="mode == 0" @view-message="viewMess" :contacts="users"/>
    <ChatComponent v-else :user2="chatIds" />
  </div>
  <div v-else>
    <LoginComponent/>
  </div>
</div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import ContactList from './components/ContactList.vue'
import ChatComponent from './components/ChatComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    ContactList,
    ChatComponent,
    LoginComponent
  },
  data(){
    return {
      mode : 0,
      user : firebase.auth().currentUser,
      db : firebase.firestore(),
      avatar : '',
      name : '',
      users : [],
      chatUser : {},
      chatIds : ''
    }
  },
  mounted(){
    if(this.user){
      this.avatar = this.user.photoURL
      this.name = this.user.displayName 
      this.db.collection('users')
      .onSnapshot(querySnap => {
        let check = 0
        let usr = querySnap.docs.map(doc => doc.data())
        for(let i of usr){
          if(i.userID != this.user.uid){
            this.users.push({
              name : i.name,
              avatar : i.avatar,
              uid : i.userID
            })
          }
          if(i.userID == this.user.uid){
            check++
          }
        }
        if(check == 0){
          let user = {
            avatar: firebase.auth().currentUser.photoURL,
            name: firebase.auth().currentUser.displayName,
            userID: firebase.auth().currentUser.uid
          }
          firebase.firestore().collection('users').add(user), { merge: true }
        }
      })
    }
  },
  methods : {
    viewMess(chatId){
      for(let i of this.users){
        if(i.uid == chatId){
          this.chatUser = i
          this.chatIds = chatId
          break
        }
      }
      this.mode = 1
    },
    changeMode(){
      this.mode = 0
    }
  }
}

</script>

<style>
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>

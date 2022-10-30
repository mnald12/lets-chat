<template :style="{position : relative}">
	<div class="chat-container" id="cc">
		<div v-for="(mess, i) in messages" :class="['message', sentOrReceived(mess.from)]" :key="i">
			<p :title="mess.date">{{mess.msg}}</p>
		</div>
	</div>
	<div ref="scrollable"></div>
	<div class="chat-textarea" @click="scrlDwn()">
		<textarea v-model="message"></textarea>
		<button :disabled="!message" @click="sendMessage()">Send <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/></svg></button>
	</div>
</template>
<script>
	import firebase from 'firebase/compat/app'
	import 'firebase/compat/auth'
	import 'firebase/compat/firestore'
	export default{
		name : 'ChatComponent',
		props : {
			user2 : {
				type : String,
				required : true
			}
		},
		data(){
			return{
				user : firebase.auth().currentUser,
				db : firebase.firestore(),
				message : '',
				messages : [],
				chatUser : this.user2
			}
		},
		methods : {
			sentOrReceived(msgfrm){
				if(msgfrm == this.user.uid){
					return 'right'
				}
				else{
					return 'left'
				}
			},
			sendMessage(){
				let newMessage = {
					from: this.user.uid,
					to: this.chatUser,
					sendAt : new Date(),
					message : this.message
				}
				this.db.collection('messages').add(newMessage)
				this.message = ''
				this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
			},
			scrlDwn(){
				this.$refs['scrollable'].scrollIntoView({ behavior: 'smooth' })
			}
		},
		inheritAttrs : false,
		mounted(){
			this.db.collection('messages')
			.orderBy('sendAt', 'desc')
			.onSnapshot(querySnap => {
				let mess = querySnap.docs.map(doc => doc.data())
				this.messages = []
				for(let i of mess){
					if(i.from == this.user.uid && i.to == this.chatUser || i.to == this.user.uid && i.from == this.chatUser){
						let msgs = {
							from : i.from,
							to : i.to,
							msg : i.message,
							date : i.sendAt.toDate().toLocaleDateString("en-US")
						}
						this.messages.push(msgs)
					}
				}
			})
		}
	}
</script>
<style scoped>
	.chat-container{
		width: 100%;
		height: 100%;
		min-height: 500px;
		padding: 10px;
		margin: 0;
		display: flex;
		flex-direction: column-reverse;
	}
	.chat-container .message{
		width: auto;
		height: auto;
		padding: 6px;
		margin: 0;
		border-radius: 3px;
		text-align: left;
	}
	.chat-container .message.left{
		text-align: left;
	}
	.chat-container .message.left p{
		width: auto;
		max-width: 300px;
		background: seagreen;
		color: aliceblue;
		padding: 10px 16px;
		border-radius: 20px;
		display: inline-block;
		white-space: pre-line;
		border-top-left-radius: 0;
	}
	.chat-container .message.right{
		text-align: right;
	}
	.chat-container .message.right p{
		width: auto;
		max-width: 300px;
		background: royalblue;
		color: aliceblue;
		padding: 10px 16px;
		border-radius: 20px;
		white-space: pre-line;
		display: inline-block;
		border-bottom-right-radius: 0;
	}
	.chat-textarea{
		width: 100%;
		height: auto;
		padding: 10px;
		position: sticky;
		bottom: 0;
		display: flex;
		align-items: center;
		background: aliceblue;
	}
	.chat-textarea textarea{
		width: 100%;
		height: auto;
		border: none;
		outline: none;
		font-size: 20px;
		font-weight: 400;
		padding-right: 50px;
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		background: transparent;
		box-shadow: 0 0 2px 0 #5e5e5e;
		color: #3e3e3e;
		border-radius: 4px;
		resize: none;
	}
	.chat-textarea button{
		width: auto;
		padding: 10px;
		height: 40px;
		background: green;
		color: white;
		border-radius: 3px;
		border: none;
		outline: none;
		position: absolute;
		right: 30px;
		display: flex;
		align-items: center;
		cursor: pointer;
		box-shadow: 0 0 2.5px 0 black;
	}
	.chat-textarea button:hover{
		color: green;
		background: aliceblue;
	}
	.chat-textarea button svg{
		margin-left: 6px;
	}
	@media (max-width: 576px){
		.chat-container .message{
			padding: 6px;
		}
		.chat-textarea button{
			right: 20px;
		}
	}
</style>
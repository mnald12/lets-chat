<template>
	<h3 class="introText">Lets Chat</h3>
	<p class="introText-p">Simple Chat App</p>
	<div class="signIn-container">
		<button @click="loginSubmit">Login with Google</button>
	</div>
</template>
<script>
	import firebase from 'firebase/compat/app'
	import 'firebase/compat/auth'
	import 'firebase/compat/firestore'
	export default{
		name : 'LoginComponent',
		methods : {
			loginSubmit(){
				firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
				const provider = new firebase.auth.GoogleAuthProvider()
				firebase.auth().signInWithRedirect(provider)
				.catch(console.log)
			}
		}
	}
</script>
<style type="text/css">
	.signIn-container{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 80px auto;
	}
	.signIn-container button{
		width: auto;
		height: auto;
		border: none;
		outline: none;
		padding: 10px 20px;
		box-shadow: 0 0 4px 0 aliceblue;
		color: aliceblue;
		background: forestgreen;
		cursor: pointer;
		border-radius: 4px;
		box-shadow: 0 0 6px yellowgreen;
		font-size: 20px;
		transition: 0.50s;
	}
	.signIn-container button:hover{
		transform: translateY(-3px);
		box-shadow: 0 0 7px 0 yellowgreen;
	}
	.introText{
		margin-top: 50px;
		font-size: 100px;
		color: forestgreen;
	}
	.introText-p{
		font-size: 16px;
	}
	@media (max-width : 576px){
		.introText{
			margin-top: 120px;
			font-size: 60px;
		}
		.introText-p{
			font-size: 15px;
		}
	}
</style>
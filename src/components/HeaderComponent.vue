<template>
	<div class="sticky-top">
	<div v-if="modes == 0" class="nav-container">
		<div class="nav-name">
			<span class="avatar">
				<img :src="img">
			</span>
			<h3>{{name}}</h3>
		</div>
		<div class="nav-action">
			<button @click="logOut"><span class="logSpan">Logout</span> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/></svg></button>
		</div>
	</div>
	<div v-else class="nav-container">
		<div class="nav-name">
			<span class="avatar">
				<img :src="img2">
			</span>
			<h3>{{name2}}</h3>
		</div>
		<div class="nav-action">
			<button @click="returns"><span class="backSpan">Back</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/></svg></button>
		</div>
	</div>	
	</div>
	
</template>
<script>
	import firebase from 'firebase/compat/app'
	import 'firebase/compat/auth'
	import 'firebase/compat/firestore'
	export default{
		name : 'HeaderComponent',
		props : {
			modes : {
				type : Number,
				default : 0
			},
			img : {
				type : String,
				default : ''
			},
			name : {
				type : String,
				default : ''
			},
			img2 : {
				type : String,
				default : ''
			},
			name2 : {
				type : String,
				default : ''
			},
		},
		methods : {
			returns(){
				this.$emit('change-mode')
			},
			logOut(){
				firebase.auth().signOut()
			}
		}
	}
</script>
<style scoped>
	.sticky-top{
		position: sticky;
		top: 0;
	}
	.nav-container{
		width: 100%;
		height: 70px;
		background: forestgreen;
		position: relative;
		display: flex;
		align-items: center;
		z-index: 999;
	}
	.nav-container .nav-name{
		width: auto;
		height: auto;
		position: absolute;
		left: 12px;
		padding: 10px;
		display: flex;
		align-items: center;
	}
	.nav-container .nav-name .avatar{
		width: 40px;
		height: 40px;
		background: white;
		border-radius: 50%;
		overflow: hidden;
	}
	.nav-container .nav-name .avatar img{
		width: 100%;
		height: 100%;
	}
	.nav-container .nav-name h3{
		font-size: 26px;
		color: aliceblue;
		margin-left: 10px;
	}
	.nav-container .nav-action{
		width: auto;
		height: auto;
		position: absolute;
		right: 12px;
		padding: 10px;
	}
	.nav-container .nav-action button{
		width: auto;
		height: auto;
		padding: 10px;
		color: aliceblue;
		background: transparent;
		border: none;
		outline: none;
		font-size: 20px;
		cursor: pointer;
		display: flex;
		align-items: center;
	}
	.nav-container .nav-action button svg{
		margin-left: 8px;
	}
	@media (max-width: 576px){
		.logSpan, .backSpan{
			display: none;
		}
		.nav-container .nav-name h3{
			font-size: 23px;
		}
		.nav-container .nav-name{
			left: 9px;
			padding: 6px;
		}
		.nav-container .nav-action{
			right: 9px;
			padding: 6px;
		}
	}
</style>
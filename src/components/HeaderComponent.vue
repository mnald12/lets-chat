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
			<button @click="logOut">Logout</button>
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
			<button @click="returns">Back</button>
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
	}
	@media (max-width: 576px){
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
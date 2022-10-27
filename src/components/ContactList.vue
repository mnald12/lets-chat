<template>
	<div class="lists-header">
		<h4>Contact List</h4>
	</div>
	<div class="lists">
		<div class="list" v-for="(user, i) in contacts" :key="i" @click="viewMessage(user.uid)">
			<div class="avatar">
				<img :src="user.avatar">
			</div>
			<div class="content-list">
				<h3>{{user.name}}</h3>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name : 'ContactList',
		props : {
			contacts : {
				type : Array
			}
		},
		inheritAttrs : false,
		methods : {
			viewMessage(uid){
				this.$emit('view-message', uid)
			}
		}
	}
</script>
<style scoped>
	.lists-header{
		width: 100%;
		height: auto;
		padding: 10px;
		margin: 0;
		text-align: left;
		position: relative;
		display: flex;
		align-items: center;
	}
	.lists-header h4{
		font-size: 30px;
		padding: 0 10px;
	}
	.lists-header .search{
		background: transparent;
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
		position: absolute;
		right: 10px;
		padding: 6px;
	}
	.lists-header .search input{
		width: 230px;
		height: 40px;
		padding: 6px;
		outline: none;
		border: none;
		background: transparent;
		box-shadow: 0 0 3px 0 yellowgreen;
		padding-right: 20px;
	}
	.lists-header .search svg{
		position: absolute;
		right: 12px;
	}
	.lists{
		width: 100%;
		height: auto;
		padding: 10px;
		margin: 0;
		text-align: left;
		overflow-y: auto;
	}
	.lists h4{
		padding: 10px;
		font-size: 30px;
	}
	.lists .list{
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		transition: 0.50s;
		padding: 10px;
		cursor: pointer;
		border-radius: 10px;
	}
	.lists .list:hover{
		background: rgba(0, 255, 0, 0.30);
	}
	.lists .list .avatar{
		width: 40px;
		height: 40px;
		background: forestgreen;
		border-radius: 50%;
		overflow-y: hidden;
	}
	.lists .list .avatar img{
		width: 100%;
		height: 100%;
	}
	.lists .list .content-list{
		margin-left: 10px;
		width: auto;
		height: auto;
		text-align: left;
	}
	.lists .list .content-list h3{
		padding: 6px;
	}
	.lists .list .content-list p{
		padding: 6px;
	}
</style>
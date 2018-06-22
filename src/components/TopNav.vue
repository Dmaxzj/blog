<template>
	<header id="top">
		<div id="sample">{{user}}</div>
		<div id="search"><input  @keydown.enter="search" v-model="searchKey"></div>
		<ul>
			<router-link to="/">主页</router-link>
			<router-link v-show="isLogin" to="/addBlog">新建</router-link>
			<router-link v-show="isLogin" to="/user">个人中心</router-link>
			<a v-show="isLogin" @click="signOut">退出</a>
			<router-link v-show="!isLogin" to="/login">登陆</router-link>
		</ul>
	</header>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			searchKey: '',
			isLogin: false,
			user: "My Blog"
		}
	},
	created: function() {
		this.cheakLogin();
		Bus.$on('login', (username) => {
			this.isLogin = true;
			this.user = username;
		});
		Bus.$on('getUsername', (user) => {
			if (this.user == 'My Blog') {
				
			} else {				
				user.username = this.user;
			}
		})
	},
	methods: {
		cheakLogin() {
			this.$http.get('/cheakLogin').then(response => {
				if (response.data) {
					this.isLogin = true;
					this.user = response.data.username;
				} else {
					this.isLogin = false;
					this.user = "My Blog";
				}
			}, err => {
				this.isLogin = false;
				this.user = "My Blog";
			})
		},
		signOut() {
			this.$http.post('/signOut').then(response => {
				this.isLogin = false;
				this.user = "My Blog";
				this.$router.push('/');
			}, response => {
				console.log(response.data);
			})
		},
		search() {
			this.$router.push({ name: 'search', query: { key: this.searchKey, page: 1 }});
		}
	}
}

</script>

<style type="text/css">
	header {
		font-size: 18pt;
		width: 100%;
		height: 50px;
		position: fixed;
		top: 0px;
		background-color: rgba(50, 50, 50, 0.8);
		display: flex;
		z-index: 2;
	}

	textarea {
		resize: none;
	}

	#sample {
		color: white;
		padding-top: 10px;
		padding-left: 50px;
		font-weight: bold;
		font-size: 20pt;
		flex: 1;
	}

	#search {
		padding-top: 10px;
		flex: 2;
	}

	#search input {
		background-color: rgba(50, 50, 50, 0.8);
		color: rgba(255, 255, 255, 0.8);
		font-size: 18pt;
		height: 80%;
		width: 100%;
		border-radius: 3px;
	}

	#top ul {
		padding-right: 50px;
		text-align: right;
		padding-top: 6px;
		flex: 1;
	}

	#top a{
		padding-left: 8px;
		color: white;
		text-decoration: none;
	}

</style>
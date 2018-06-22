<template>
	<div id="container">
			<h1 id="register-icon">
				<span>登陆界面</span>
			</h1>
			<form method="post">
				<div class="info">
					<label> 用户名:</label>
					<input v-model="username" type="text" id="username" maxlength="20">
					<label class="err">{{err.username}}</label>
				</div>
				<div class="info">
					<label> 密码:</label>
					<input v-model="password" type="password" id="password" maxlength="14">
					<label class="err">{{err.password}}</label>
				</div>
				<button id="regist" form="??" v-on:click="toRegist">注册</button>
				<button id="login" form="??" class="formatRight" v-on:click="login">登陆</button>
			</form>
		</div>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			err: {},
			username: '',
			password: ''
		}
	},
	methods: {
		login() {
			this.err = {};
			this.$http.post('/login', {
				username: this.username,
				password: this.password
			}).then(response => {
				if (response.data.msg == 'success') {
					this.$router.push('/user');
					Bus.$emit('login', this.username);
				} else {
					Bus.$emit('showErr', response.data.msg);
				}
			}, response => {
				this.$router.push('/');
			})
		},
		toRegist() {
			this.$router.push('/regist');
		}
	}
}

</script>

<style type="text/css">
	#container {
		background-color: white;
		width: 700px;
		margin: auto;
		margin-top: 100px;
		border-radius: 2px;
		border: 1px solid rgb(240, 240, 240);
		padding: 30px;
	}

	h1 {
		text-align: center;
		font-size: 30pt;
		margin-bottom: 10px;
	}

	.info {
		margin: auto;
		width: 60%;
		font-size: 20pt;
		height: 40px;
		text-align: left;
		border-bottom: 1px solid;
		padding-top: 20px;
		border-color: rgba(0, 0, 0, 0.2);
	}

	.info label {
		font-weight: bold;
		float: left;
		width: 160px;
	}
	form .info {
		width: 80%;
		border: none;
	}

	form .info label {
		text-align: right;
		margin-right: 40px;
		width: 160px;
	}

	form .info label.err {
		font-weight: normal;
		color: red;
		padding-left: 150px;
		font-size: 11pt;
		width: 60%;
		height: 20px;
	}

	form input {
		height: 80%;
		font-size: 20pt;
		width: 50%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease-in-out;
	}

	#container button {
		font-size: 15pt;
		font-weight: bold;
		height: 40px;
		width: 100px;
		color: white;
		margin-top: 20px;
	}

	#regist {
		margin-left: -420px;
		background-color: rgba(0, 100, 255, 0.8);
		transition: all 0.5s;
	}

	#regist:hover {
		background-color: rgba(0, 100, 255, 1);
		transition: all 0.5s;
	}
	#login.formatRight{
		background-color: rgba(255, 50, 00, 0.8);
		transition: all 0.5s;
	}

	#login:hover{
		background-color: rgba(255, 50, 00, 1);
	}
	#container form #login {
		width: 150px;
		margin-left: 130px;
		transition: all 0.5s;
	}

	form input:focus {
		border-bottom: 1px solid rgba(0, 0, 255, 0.6);
		width: 52%;
		transition: all 0.5s ease-in-out;
	}

</style>
<template>
	<div id="container">
            <h1 id="register-icon">
                <span>注册界面</span>
            </h1>
            <form method="post">
                <div class="info">
                    <label>用户名:</label>
                    <input v-model="username" type="text" id="username" maxlength="20">
                    <label class="err">{{err.username}}</label>
                </div>
                <div class="info">
                    <label>密码:</label>
                    <input v-model="password" type="password" id="password" maxlength="14">
                    <label class="err">{{err.password}}</label>
                </div>
                <div class="info">
                    <label>重复密码:</label>
                    <input v-model="vpassword" type="password" id="vPassword" maxlength="14">
                    <label class="err">{{err.vpassword}}</label>
                </div>
                <div class="info">
                    <label>学号:</label>
                    <input v-model="studentId" type="text" id="studentId" maxlength="10">
                    <label class="err">{{err.studentId}}</label>
                </div>
                <div class="info">
                    <label>电话:</label>
                    <input v-model="phone" type="text" id="phone" maxlength="13">
                    <label class="err">{{err.phone}}</label>
                </div>
                <div class="info">
                    <label>邮箱:</label>
                    <input v-model="email" type="text" id="email" maxlength="60">
                    <label class="err">{{err.email}}</label>
                </div>
                <button type="reset" id="reset" class="reset" v-on:click="reset">重置</button>
                <button @click="regist" id="submit" form="??" class="formatRight">提交</button>
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
			vpassword: '',
			password: '',
			studentId: '',
			phone: '',
			email: ''
		}
	},
	methods: {
		regist() {
			this.err = {};
			if (this.vpassword != this.password) {
				this.err.vpassword = "两次密码不一样";
				return;
			}
			this.$http.post('/regist', {
				username: this.username,
				password: this.password,
				studentId: this.studentId,
				phone: this.phone,
				email: this.email
			}).then(response => {
				if (response.data.msg == 'success') {
					Bus.$emit('login', this.username);
					this.$router.push('/user');
				} else if (response.data.msg.err) {
					Bus.$emit('showErr', response.data.msg.err)
				} else {					
					this.err = response.data.msg;
				}
			}, response => {
				this.$router.back();
			})
		},
		reset() {
			this.err = {};
			this.username=this.vpassword=this.password=this.studentId=this.phone=this.email='';
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


	#reset {
		margin-left: 150px;
		background-color: rgba(0, 100, 255, 0.8);
		transition: all 0.5s;
	}

	#reset:hover {
		background-color: rgba(0, 100, 255, 1);
		transition: all 0.5s;
	}

	#container form #submit {
		width: 150px;
		margin-left: 150px;
		transition: all 0.5s;
	}

	#submit.formatRight{
		background-color: rgba(255, 50, 00, 0.8);
		transition: all 0.5s;
	}

	#submit:hover{
		background-color: rgba(255, 50, 00, 1);
	}

	form input:focus {
		border-bottom: 1px solid rgba(0, 0, 255, 0.6);
		width: 52%;
		transition: all 0.5s ease-in-out;
	}

</style>
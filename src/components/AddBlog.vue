<template>
	<div id="post" v-if="post">
			<div id="info-box">
				<label>标题:</label>
				<input v-model="post.title" maxlength="40">
			</div>
			<p>内容:</p>
			<textarea id="post-body" rows="21" maxlength="1400" v-model="post.body"></textarea>
			<button v-on:click="addBlog" class="add-post">新增</button>
			<button v-on:click="cancle" class="cancle">取消</button>
		</div>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			post: {
				title: '',
				body: ''
			}
		}
	},
	methods: {
		addBlog() {
			this.$http.post('/addBlog/', {
				post: this.post
			}).then(response => {
				if (response.data) {
					this.$router.push('/readBlog/' + response.data._id);
				} else {
					Bus.$emit('showErr', "请先登录");
				}
			}, response => {
				this.$router.back();
			})
		},
		cancle() {
			this.$router.back();
		}
	}
}

</script>

<style type="text/css">
	#post {
		position: relative;
		width: 760px;
		background-color: rgba(240, 240, 240, 1);
		margin: auto;
		margin-top: 100px;
		padding: 30px;
	}

	#info-box {
		background-color: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(240, 240, 240, 1);
		border-radius: 2px;
		width: 700px;
		padding: 20px 30px;
		line-height: 40px;
	}

	#post p {
		margin: 20px 0px;
		font-size: 20pt;
		height: 30px;
	}

	#post-body {
		background-color: rgba(255, 255, 255, 0.8);
		border: 1px solid rgb(240, 240, 240);
		border-radius: 2px;
		width: 700px;
		padding: 30px;
		font-size: 15pt;
	}


	#post button {
		margin-top: 10px;
		height: 40px;
		font-size: 15pt;
		background-color: rgb(225, 225, 225);
		border: 1px solid rgb(240, 240, 240);
		border-radius: 2px;
	}

	#post button:hover {
		background-color: rgb(230, 230, 230);
	}

	#post .cancle {
		width: 18%;
		position: absolute;
		right: 30px;
	}

	#info-box label, #info-box input {
		height: 50px;
		font-weight: bold;
		font-size: 20pt;
		padding-right: 10px;
	}

	#info-box input {
		border-bottom: 1px solid gray;
		width: 80%;
	}

	#post .cancle {
		width: 18%;
		position: absolute;
		right: 30px;
	}

	#post .add-post {
		width: 80%;
	}

</style>
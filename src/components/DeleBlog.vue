<template>
	<div id="post" v-if="post">
			<div id="info-box">
				<h1>标题: {{post.title}}</h1>
				<h2>作者: {{post.author}}</h2>
			</div>
			<p>内容:</p>
			<div id="post-body">{{post.body}}</div>
			<button v-on:click="deleBlog" class="delete">删除</button><button v-on:click="cancle" class="cancle">取消</button>
		</div>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			post: null
		}
	},
	created: function() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$http.get('/api/readBlog/' + this.$route.params.id).then(response => {
				this.post = response.data.post;
			}, response => {
				console.log(response);
			})
		},
		deleBlog() {
			this.$http.delete('/deleBlog/' + this.$route.params.id).then(response => {
				if (response.data) {
					this.$router.back();
				} else {
					Bus.$emit('showErr', "你无法删除别人的博客");
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
		background-color: rgb(240, 240, 240);
		margin: auto;
		margin-top: 100px;
		padding: 30px;
	}

	#info-box {
		background-color: rgba(255, 255, 255, 0.8);
		border: 1px solid rgb(240, 240, 240);
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

	#post .delete {
		width: 80%;
	}

	#post .cancle {
		width: 18%;
		position: absolute;
		right: 30px;
	}

</style>
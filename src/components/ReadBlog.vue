<template>
	<div id="post" v-if="post">
			<div id="info-box">
				<h1>{{post.title}}</h1>
				<h2>作者: {{post.author}}</h2>
			</div>
			<p>Content:</p>
			<div id="post-body">{{post.body}}</div>
			<button v-if="isAdmini&&!post.isHide" @click="changePostState" class="hide-btn" v-bind:disabled="post.isHide">隐藏</button>
			<comments-container></comments-container>
	</div>
</template>

<script>
import Bus from './Bus.js'
import CommentsContainer from './CommentsContainer.vue'

export default {
	components: {
		CommentsContainer
	},
	data: function() {
		return {
			post: null,
			isAdmini: false
		}
	},
	created: async function() {
		this.fetchData();
		var user = {username: null};
		Bus.$emit('getUsername', user);
		if (user.username == "admini") this.isAdmini = true;
	},
	methods: {
		fetchData() {
			this.$http.get('/api/readBlog/' + this.$route.params.id).then(response => {
				this.post = response.data.post;
				console.log(response);
			}, response => {
				console.log(response);
			})
		},
		changePostState() {
			this.$http.post('/hideOrShowPost/' + this.$route.params.id).then(response => {this.fetchData();});
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
	#post .hide-btn {
		margin-top: 10px;
		width: 760px;
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
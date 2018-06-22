<template>
	<div id="post" v-if="post">
			<div id="info-box">
				<label>Title:</label>
				<input v-model="post.title" maxlength="40" v-bind:readonly="post.isHide">
			</div>
			<p>Content:</p>
			<textarea id="post-body" rows="21" maxlength="1400" v-model="post.body" v-bind:readonly="post.isHide"></textarea>
			<button v-on:click="editBlog" class="edit-post">提交</button>
			<button v-on:click="cancle" class="cancle">返回</button>
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
		cancle() {
			this.$router.back();
		},
		editBlog() {
			this.$http.put('/editBlog/' + this.$route.params.id, {
				post: this.post
			}).then(response => {
				if (response.data) {
					this.$router.push({
						name: 'readBlog',
						params: {
							id: this.$route.params.id
						}
					});
				} else {
					Bus.$emit('showErr', "你无法修改别人的博客");
				}
			}, response => {
				this.$router.push('/');
			})
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

	#post .edit-post {
		width: 80%;
	}

	#post .cancle {
		width: 18%;
		position: absolute;
		right: 30px;
	}
</style>
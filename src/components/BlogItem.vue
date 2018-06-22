<template>
	<div class="post-box">
		<p class="post-info"><span>标题：{{ title }}</span> <span>作者：{{ author }}</span></p>
		<slot>无内容</slot>
		<ul>
			<li v-on:click="readBlog">查看</li>
			<li v-on:click="editClick">修改</li>
			<li v-on:click="deleBlog">删除</li>
		</ul>
	</div>
</template>

<script>
import Bus from './Bus.js'

export default {
	props: ['title', 'author', '_id'],
	methods: {
		editClick: function() {
			var user = {
				username: null
			};
			Bus.$emit('getUsername', user);
			if (user.username == this.author) {
				this.$router.push({
					name: 'editBlog',
					params: {
						id: this._id
					}
				});
			} else {
				Bus.$emit('showErr', "你无法修改别人的博客");
			}
		},
		readBlog: function() {
			this.$router.push({
				name: 'readBlog',
				params: {
					id: this._id
				}
			});
		},
		deleBlog: function() {
			var user = {
				username: null
			};
			Bus.$emit('getUsername', user);
			if (user.username == this.author) {
				this.$router.push({
					name: 'deleBlog',
					params: {
						id: this._id
					}
				});
			} else {
				Bus.$emit('showErr', "你无法删除别人的博客");
			}
		}
	}
}

</script>

<style type="text/css">
	.post-box {
		position: relative;
		background-color: white;
		border-radius: 2px;
		border: 1px solid rgb(240, 240, 240);
		height: 100px;
		user-select: none;
		margin-bottom: 10px;
	}
	.post-box:hover {
		background-color: rgb(240, 240, 240);
	}
	.post-box ul {
		height: 20%;
		list-style-type: none;
	}

	.post-box ul li {
		float: right;
		display: block;
		padding-right: 5px;
		list-style-type: none;
		padding: 0px 8px;
		transition: all 0.3s 0s ease-in-out;
	}

	.post-box ul li:hover {
		transition: all 0.3s 0s ease-in-out;
		background-color: rgb(225, 225, 225);
	}
	.post-info {
		height: 20%;
		font-weight: bold;
	}

	.post-info span {
		padding: 0 10px;
	}
</style>
<template>
	<div class="comment-box">
		<p class="comment-info"><span>用户:{{ author }}</span></p>
		<textarea v-model="temp" v-bind:readonly="!editing"></textarea>
		<ul>
			<li v-on:click="deleComment">删除</li>
			<template v-if="!editing">
				<li v-on:click="editComment" key="edit" v-bind:disabled="isHide">修改</li>
			</template>
			<template v-else>
				<li @click="cancle" key="cancle">取消</li>
				<li @click="submit" key="submit">提交</li>
			</template>
			<li v-on:click="hideComments" v-if="isAdmini&&!isHide">隐藏</li>
		</ul>
	</div>
</template>

<script>
import Bus from './Bus.js'

export default {
	props: ['author', 'body', '_id', 'isHide', 'isAdmini'],
	data: function() {
		return {
			editing: false,
			temp: this.body
		}
	},
	methods: {
		submit: function() {
			this.$http.put('/editComment/' + this.$route.params.id, {
				id: this._id,
				newComment: this.temp
			}).then(response => {
				if (response.data) {
					this.editing = false;
					this.$emit('updateComment');
				} else {
					Bus.$emit('showErr', "你无法修改别人的评论");
					this.cancle();
				}
			}, response => {
				this.editing = false;
				Bus.$emit('showErr', "你无法修改他人的评论");
				this.$emit('updateComment');
			})
		},
		cancle: function() {
			this.editing = false;
			this.temp = this.body;
		},
		editComment: function() {
			this.$http.post('/cheakRight', {
				author: this.author
			}).then(response => {
				if (response.data) {
					this.editing = true;
				} else {
					Bus.$emit('showErr', "没有权限");
				}
			})
		},
		deleComment: function() {
			this.$http.post('/deleComment/' + this.$route.params.id, {
				id: this._id
			}).then(response => {
				if (response.data) {
					this.$emit('updateComment');
				} else {
					Bus.$emit('showErr', "你无法删除他人的评论");
				}
			}, response => {
				this.$emit('updateComment');

			});
		},
		hideComments: function() {
			this.$http.post('/hideComments/'+ this.$route.params.id, {
				id: this._id,
			}).then(response => {
				this.temp = "该内容已被管理员隐藏"
				this.$emit('updateComment');})
		}
	}
}

</script>

<style type="text/css">
	.comment-box {
		position: relative;
		background-color: white;
		border-radius: 2px;
		border: 1px solid rgb(240, 240, 240);
		height: 120px;
		user-select: none;
		margin-bottom: 10px;
	}
	#comments-container .comment-info {
		margin: 0px;
		font-size: 12pt;
		height: 20%;
		font-weight: bold;
	}

	.comment-info span {
		padding: 0 10px;
	}

	#comments-container .comment-box textarea {
		height: 50%;
		width: 700px;
	}

	.comment-box ul {
		height: 20%;
		list-style-type: none;
	}

	.comment-box ul li {
		float: right;
		display: block;
		list-style-type: none;
		padding: 0px 8px;
		transition: all 0.3s 0s ease-in-out;
	}

	.comment-box ul li:hover {
		transition: all 0.3s 0s ease-in-out;
		background-color: rgb(225, 225, 225);
	}


</style>
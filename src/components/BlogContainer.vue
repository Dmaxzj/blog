<template>
	<div id="blog-container">
	  <p v-if="!blogs.length">还没有内容， 快去写博客吧</p>
      <blog-item v-for="blog in blogs" :_id="blog._id" :key="blog._id" :title="blog.title" :author="blog.author">
         <div class="post-body">{{blog.body}}</div>
       </blog-item>
       <page-bar></page-bar>
    </div>
</template>

<script>
import BlogItem from './BlogItem.vue'
import PageBar from './PageBar.vue'
import Bus from './Bus.js'

export default {
	components: {
		BlogItem, PageBar
	},
	data: function() {
		return {
			blogs: []
		}
	},
	created: function() {
		this.fetchDataHandler();
	},
	watch: {
		'$route': 'fetchDataHandler'
	},
	methods: {
		fetchDataHandler() {
			if (this.$route.path == '/search') {
				this.fetchDataBySearch();
			} else if (this.$route.path == '/') {
				this.fetchDataByHome();
			}
		},
		fetchDataByHome() {
			var page = this.$route.query.page;
			if (isNaN(page)) page = 1;
			this.$http.get('/api/getBlog?page='+ page).then(response => {
				this.blogs = response.data.blogs;
				Bus.$emit('getPageMsg', response.data.page);
			}, err => {
				console.log(err);
			})
		},
		fetchDataBySearch() {
			this.$http.get('/api/search?key='+ this.$route.query.key + '&page='+ this.$route.query.page).then(response => {
				this.blogs = response.data.blogs;
				Bus.$emit('getPageMsg', response.data.page);
			}, err => {
				console.log(err);
			})
		}
	}
}

</script>

<style type="text/css">
	#blog-container {
		width: 700px;
		margin: auto;
		margin-top: 100px;
	}

	#blog-container p {
		text-align: center;
	}
	.post-body {
		height: 50%;
		width: 500px;
		margin: 5px 30px;
	}

</style>
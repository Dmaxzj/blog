<template>
	<ul id="tool-bar">
		<li @click="turnTo(currentPage-1)"> << </li>
		<li v-if="currentPage > 3 && totalPage > 5" @click="turnTo(1)">1</li>
		<li v-if="currentPage > 3 && totalPage > 5">...</li>
		<li v-for="todo in todos" @click="turnTo(todo)" v-bind:key="todo" v-bind:class="{currentpage: todo == currentPage}">{{todo}}</li>
		<li v-if="currentPage <= totalPage-3 && totalPage > 5">...</li>
		<li v-if="currentPage <= totalPage-3 && totalPage > 5" @click="turnTo(totalPage)">{{totalPage}}</li>
		<li @click="turnTo(currentPage+1)"> >> </li>
		<input v-model="gotoPage" @keydown.enter="turnTo(gotoPage)">/{{totalPage}}<button @click="turnTo(gotoPage)">Go</button>
	</ul>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			gotoPage:'',
			todos: null,
			currentPage: 1,
			totalPage: 1
		}
	},
	created: function() {
		Bus.$on('getPageMsg', (page) => {
			this.currentPage = page.currentPage;
			this.totalPage = page.totalPage;
			this.createToolBar();
		})
	},
	methods: {
		createToolBar: function () {
			var startPage = 1;
			var endPage = 1;
			if (this.totalPage <= 5) {
				endPage = this.totalPage;
			} else if (this.currentPage >= 4) {
				if (this.currentPage+2 > this.totalPage) {
					endPage = this.totalPage;
					startPage = this.totalPage-4;
				} else {
					endPage = this.currentPage+2;
					startPage = this.currentPage-2;
				}
			} else {
				if (this.currentPage <= 3) {
					startPage = 1;
				} else {
					startPage = this.currentPage-2;
				}
				endPage = 5;
			}
			this.todos = [];
			for (var i = startPage; i <= endPage; i++) this.todos.push(i);
		},
		turnTo: function(i) {
			var page = parseInt(i);
			if (page == this.currentPage || page < 1 || page > this.totalPage || isNaN(page)) return;
			if (this.$route.path == '/search') {
				this.$router.push({ name: 'search', query: { key: this.$route.query.key, page: page }})				
			} else {
				this.$router.push('/?page='+page);
			}
		}
	}
}

</script>

<style type="text/css">
	.currentpage {
		color: blue;
		transform: scale(1.2);
		font-weight: bold;
	}

	#tool-bar {
		user-select: none;
		list-style-type: none;
		height: 30px;
		width: 50%;
		margin: auto;
		padding-left: 100px;
		margin-top: 10px;
		font-size: 12pt;
	}


	#tool-bar li {
		cursor: pointer;
		padding: 0px 5px;
		float: left;
	}

	#tool-bar input {
		height: 15px;
		width: 20px;
		border: 1px solid;
		margin-right: 5px;
	}

	#tool-bar button {
		cursor: pointer;
		margin-left: 5px;
		width: 20px;
		background: transparent;
		font-weight: bold;
	}

</style>
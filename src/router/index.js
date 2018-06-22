import Vue from 'vue'
import Router from 'vue-router'


import AddBlog from '../components/AddBlog.vue'
import DeleBlog from '../components/DeleBlog.vue'
import User from '../components/User.vue'
import Regist from '../components/Regist.vue'
import Login from '../components/Login.vue'
import ReadBlog from '../components/ReadBlog.vue'
import EditBlog from '../components/EditBlog.vue'
import BlogContainer from '../components/BlogContainer.vue'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: BlogContainer
	}, {
		path: '/editBlog/:id',
		name: 'editBlog',
		component: EditBlog
	}, {
		path: '/readBlog/:id',
		name: 'readBlog',
		component: ReadBlog
	}, {
		path: '/login',
		component: Login
	}, {
		path: '/regist',
		component: Regist
	}, {
		path: '/user',
		component: User
	}, {
		path: '/search',
		name: 'search',
		component: BlogContainer
	}, {
		path: '/deleBlog/:id',
		name: 'deleBlog',
		component: DeleBlog
	}, {
		path: '/addBlog',
		name: 'addBlog',
		component: AddBlog
	}, {
		path: '*',
		redirect: '/'
	}]
})
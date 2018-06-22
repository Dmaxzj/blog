<template>
	<transition name="fade">
	<div id="err-text" v-if="msg"><span>{{ msg }}</span></div>
	</transition>
</template>

<script>
import Bus from './Bus.js'

export default {
	created: function() {
		Bus.$on('showErr', err => {
			this.msg = err;
			setTimeout(this.hiden, 1500);
		})
	},
	data: function() {
		return {
			msg: ''
		}
	},
	methods: {
		hiden() {
			this.msg = '';
		}
	}
}

</script>

<style type="text/css">
	#err-text {
		position: fixed;
		background-color: rgb(150, 150, 150);
		font-size: 20pt;
		color: white;
		width: 300px;
		height: 50px;
		text-align: center;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
	}

	#err-text span {
		position: relative;
		top: 5px;
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>
<template lang="jade">
	div#app
		top-nav
		router-view
		err-text
</template>

<script>
import TopNav from './TopNav.vue'
import ErrText from './ErrText.vue'

export default {
	components: {
		TopNav, ErrText
	}
}

</script>


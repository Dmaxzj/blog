<template>
	<div v-if="user" id="container">
            <h1 id="user-icon">
                <span>Userinfo</span>
            </h1>
            <div class="info"><label>Username:</label> {{user.username}}</div>
            <div class="info"><label>Student Id: </label>{{user.studentId}}</div>
            <div class="info"><label>Phone:</label> {{user.phone}}</div>
            <div class="info"><label>Email:</label>{{user.email}}</div>
        </div>
</template>

<script>

export default {
	data: function() {
		return {
			user: null
		}
	},
	created: function() {
		this.$http.get('/api/user').then(response => {
			this.user = response.data.user;
		}, response => {
			this.$router.back();
		})
	}
}

</script>

<style type="text/css">
	#container {
		background-color: white;
		width: 700px;
		margin: auto;
		margin-top: 100px;
		border-radius: 2px;
		border: 1px solid rgb(240, 240, 240);
		padding: 30px;
	}

	h1 {
		text-align: center;
		font-size: 30pt;
		margin-bottom: 10px;
	}

	.info {
		margin: auto;
		width: 60%;
		font-size: 20pt;
		height: 40px;
		text-align: left;
		border-bottom: 1px solid;
		padding-top: 20px;
		border-color: rgba(0, 0, 0, 0.2);
	}

	.info label {
		font-weight: bold;
		float: left;
		width: 160px;
	}

	form .info {
		width: 80%;
		border: none;
	}

	form .info label {
		text-align: right;
		margin-right: 40px;
		width: 160px;
	}

	form .info label.err {
		font-weight: normal;
		color: red;
		padding-left: 150px;
		font-size: 11pt;
		width: 60%;
		height: 20px;
	}

	form input {
		height: 80%;
		font-size: 20pt;
		width: 50%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.5s ease-in-out;
	}

	#container button {
		font-size: 15pt;
		font-weight: bold;
		height: 40px;
		width: 100px;
		color: white;
		margin-top: 20px;
	}


</style>
<template>
    <router-view />
</template>

<script>
export default {
    name: 'App',
    watch: {
		'$route' (to, from) {
			document.title = to.name + ' | DonorDrive Overlay'
		}
	},
	created() {
		document.title = this.$route.name + ' | DonorDrive Overlay';
	},
}
</script>

<style lang="scss">
body {
	background-color: transparent;
	margin: 0;
}

* {
	box-sizing: border-box;
	font-family: 'Nunito', sans-serif;
}

p {
	color: #1a4c6d;
	font-size: 1.75vw;
	margin: 0;
}

img {
	width: 100%;
}

#fundraiser img {
	border: 3px solid #1a4c6d;
	display: block;
	width: 5vw;
}

.u-bg-blue-700 {
    background-color: #1a4c6d;
}

.u-bg-gray-100 {
	background-color: #f6f7fb;
}

.u-shadow {
	box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
}

.u-p-sm {
	padding: 1vw;
}

.u-mb-sm {
	margin-bottom: 0.5vw;
}

.u-mb-md {
	margin-bottom: 1vw;
}

.u-mr-16 {
	margin-right: 1rem;
}
</style>

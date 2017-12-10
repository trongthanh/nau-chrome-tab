<template>
	<div id="app">
		<img src="/images/icon-128.png" />
		<HelloWorld/>
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

const vueApp = {
	name: 'app',
	components: {
		HelloWorld,
	},
};

export default vueApp;
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>

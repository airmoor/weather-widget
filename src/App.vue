<template>
	<div id="app">
		<main class="main">
			<layout-header/>
			<transition name="fade" mode="out-in">
				<layout-menu v-if="isMenuOpen"/>
				<Home v-else/>
				<!--				<router-view v-else/>-->
			</transition>
		</main>
	</div>
</template>

<script>
	import LayoutHeader from "./components/layouts/layout-header";
	import LayoutMenu from "./components/layouts/layout-menu";
	import Home from "./components/home";

	export default {
		components: {Home, LayoutMenu, LayoutHeader},
		computed: {
			isMenuOpen() {
				return this.$store.state.isMenuOpen;
			}
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		max-width: 350px;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: center;

		.main {
			/*padding-top: 32px;*/
			width: 100%;
			position: relative;
		}
	}

</style>
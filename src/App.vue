<template>
	<div id="app">
		<layout-header/>
		<transition name="fade" mode="out-in">
		<layout-menu v-if="isMenuOpen"/>

		<main v-else>
			<router-view/>
		</main>
		</transition>
	</div>
</template>

<script>
	import LayoutHeader from "./components/layouts/layout-header";
	import LayoutMenu from "./components/layouts/layout-menu";

	export default {
		components: {LayoutMenu, LayoutHeader},
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
		/*max-width: 350px;*/
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		justify-content: center;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
		opacity: 0;
	}
</style>
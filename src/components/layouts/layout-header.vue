<template>
	<header class="layout-header">
		<div class="layout-header__wrap" @click.prevent="toggleOpenMenu">
			<svgicon :name="isMenuOpen ? 'close' : 'settings'" :fill="isMenuOpen ? true : false" color="black" width="30"/>
		</div>
	</header>
</template>

<script>
	export default {
		name: "layout-header",
		computed: {
			isMenuOpen() {
				return this.$store.state.isMenuOpen;
			}
		},
		methods: {
			toggleOpenMenu() {
				this.$store.state.isMenuOpen = !this.$store.state.isMenuOpen;
			}
		}
	}
</script>

<style lang="scss">
	.layout-header {
		position: fixed;
		top: 32px;
		/*right: 32px;*/
		/*width: 350px;*/
		/*right:  calc(50vw + 32px);*/
		/*width: calc(50vw + 32px);*/
		/*height: 32px;*/
		/*max-width: 400px;*/
		z-index: 2;
		/*position: absolute;*/
		/*width: 100%;*/
		left: calc(130px + 50vw);
		&__wrap {
			width: 100%;
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
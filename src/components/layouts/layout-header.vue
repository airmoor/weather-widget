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
		right: 32px;
		/*left: 300px;*/
		max-width: 400px;

		&__wrap {
			width: 100%;
			display: flex;
			/*position: absolute;*/

			justify-content: flex-end;
		}
	}

</style>
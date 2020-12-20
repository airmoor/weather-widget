<template>
	<header class="layout-header">
		<div class="layout-header__wrap" @click.prevent="toggleOpenMenu">
			<svgicon class="layout-header__button"
			         :name="isMenuOpen ? 'close' : 'settings'"
			         :fill="isMenuOpen ? true : false"
			         color="black" width="30" height="30"/>
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
		/*position: fixed;*/
		/*top: 32px;*/
		z-index: 2;
		margin-left: 300px;
		height: fit-content;

		&__wrap {
			width: 100%;
			display: flex;
			justify-content: flex-end;
		}

		&__button {
			cursor: pointer;
			height: 30px;

		}
	}
</style>
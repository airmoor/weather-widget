<template>
	<div class="layout-menu">
		<h1 class="mb-3">Settings</h1>

		<b-form @submit.prevent="addCity">
			<b-form-input
					v-model="newCity"
					id="input-1"
					type="text"
					placeholder="Add city"
					required
			></b-form-input>
		</b-form>

		<div v-for="city of cities" :key="city">

			<div class="layout-menu__city">
				<div class="layout-menu__city__title">
					<svgicon class="mr-3" name="burger" color="black" width="14"/>
					{{city}}
				</div>
				<div @click="removeCity(city)">
					<svgicon name="trash" :fill="false" color="black" width="20"/>
				</div>

			</div>

		</div>
	</div>
</template>

<script>
	export default {
		name: "layout-menu",
		data: () => ({
			newCity: ''
		}),
		computed: {
			cities: {
				set(v) {
					this.$store.state.cities = v;
				},
				get() {
					return this.$store.state.cities;
				}
			},weatherData: {
				set(v) {
					this.$store.state.weatherData = v;
				},
				get() {
					return this.$store.state.weatherData;
				}
			},
			weatherCities: {
				set(v) {
					this.$store.state.weatherCities = v;
				},
				get() {
					return this.$store.state.weatherCities;
				}
			}
		},
		methods: {
			addCity() {
				if (!this.cities.includes(this.newCity))
					this.cities.unshift(this.newCity);
				this.newCity = ''
			},
			removeCity(city){
				let index = this.cities.indexOf(city)
				if (index > -1)
				this.cities.splice(index,1);

				let index2 = this.weatherCities.indexOf(city)
				if (index > -1)
					this.weatherCities.splice(index2,1)

				let index3 = this.weatherData.findIndex(el=>el.name===city)
				if (index > -1)
					this.weatherData.splice(index3,1)



			}
		}
	}
</script>

<style lang="scss">
	.layout-menu {
		position: fixed;
		z-index: 1;
		box-shadow: 0px 16px 24px rgba(103, 110, 134, 0.1);
		border-radius: 32px;
		padding: 32px;
		margin: 16px auto;
		background: #FFFFFF;
		&__city{
			background: #f0f0f0;
			display: flex;
			justify-content: space-between;
			padding:12px;
			border-radius: 4px;
			margin:16px 0;
			align-items: center;
			&__title{
				display: flex;
				align-items: center;
			}

		}
	}
</style>
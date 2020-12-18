<template>
<!--	https://github.com/SortableJS/Vue.Draggable-->
	<div class="layout-menu">
		<h3 class="mb-3">Settings</h3>

		<b-form @submit.prevent="addCity">
			<b-form-input
					v-model="newCity"
					id="input-1"
					type="text"
					placeholder="Add city"
					required
			></b-form-input>
		</b-form>

		<draggable v-model="cities" group="cities" handle=".handle" @start="drag=true" @end="drag=false" @change="sort">
			<transition-group type="transition" :name="'flip-list'">
				<div v-for="city of cities" :key="city">
					<div class="layout-menu__city">
						<div class="flex-center">
							<div class="p-2 flex-center">
								<svgicon class="mr-1 handle" name="burger" color="black" width="14"/>
							</div>
							{{city}}
						</div>
						<div class="p-2" @click="removeCity(city)">
							<svgicon name="trash" :fill="false" color="black" width="20"/>
						</div>
					</div>
				</div>
			</transition-group>
		</draggable>

	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	export default {
		name: "layout-menu",
		components: {
			draggable,
		},
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
			},
			weatherData: {
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
			sort() {
				// console.log('cities',this.cities)
				localStorage.setItem('cities', this.cities);
				this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
			},
			addCity() {
				if (!this.cities.includes(this.newCity))
					this.cities.unshift(this.newCity);
				this.newCity = '';
				// localStorage.setItem('test', 1);
				localStorage.setItem('cities', this.cities);
				// localStorage.user = JSON.stringify({name: "John"});
			},
			removeCity(city){
				let index = this.cities.indexOf(city);
				if (index > -1)
				this.cities.splice(index,1);

				let index2 = this.weatherCities.indexOf(city);
				if (index > -1)
					this.weatherCities.splice(index2,1);

				let index3 = this.weatherData.findIndex(el=>el.name===city);
				if (index > -1)
					this.weatherData.splice(index3,1)

				localStorage.setItem('cities', this.cities);

			}
		}
	}
</script>

<style lang="scss">
	.layout-menu {
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
			padding: 4px 12px;
			border-radius: 4px;
			margin:16px 0;
			align-items: center;


		}
	}
	.flip-list-move {
		transition: transform 0.5s;
	}
	.no-move {
		transition: transform 0s;
	}
	.flex-center{
		display: flex;
		align-items: center;
	}
	.handle{
		cursor: grab;
	}

</style>
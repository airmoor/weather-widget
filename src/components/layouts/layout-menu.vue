<template>
<!--	https://github.com/SortableJS/Vue.Draggable-->
	<div class="layout-menu">
		<h3 class="mb-3">Settings</h3>
		<transition name="fade" mode="out-in">
			<b-alert :show="showAlert" class="layout-menu__alert" variant="danger">
				{{alertText}}
			</b-alert>
		</transition>

		<b-form @submit.prevent="addCity">
			<b-form-input
					v-model="newCity"
					id="input-1"
					type="text"
					placeholder="Add city"
					required
			></b-form-input>
		</b-form>

		<draggable v-model="cities" group="cities" handle=".handle"
		           @start="drag=true"
		           @end="drag=false"
		           @change="sort">
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
			newCity: '',
			showAlert:false,
			alertText:'City has already been added',
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
		},
		methods: {
			sort() {
				localStorage.setItem('cities', this.cities);
				this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
			},
			addCity() {
				if (!this.cities.includes(this.newCity) && this.isCityExist(this.newCity)===false)
					this.cities.unshift(this.newCity);
				else {
					this.showAlert = true;
					setTimeout(()=> {
						this.showAlert = false;
					},3000);
				}
				this.newCity = '';
				localStorage.setItem('cities', this.cities);
			},
			removeCity(city){
				let index = this.cities.indexOf(city);
				if (index > -1)
				this.cities.splice(index,1);

				index = this.weatherData.findIndex(el=>el.name===city);
				if (index > -1)
					this.weatherData.splice(index, 1);

				localStorage.setItem('cities', this.cities);

			},
			isCityExist(city) {
				let isExist = false;
				this.weatherData.forEach(el => {
					if (el.name.toLowerCase() === city.toLowerCase()) {
						isExist = true;
					}
				});
				return isExist;
			},
		}
	}
</script>

<style lang="scss">
	.layout-menu {
		z-index: 1;
		box-shadow: 0 16px 24px rgba(103, 110, 134, 0.1);
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

		&__alert{
			position: fixed;
			top:0;
			z-index: 2;
		}
	}

</style>
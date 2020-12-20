<template>
	<div class="home">
		<transition name="fade" mode="out-in">
			<b-alert class="home__alert" :show="showAlert" variant="danger">
				{{alertText}}
			</b-alert>
		</transition>
		<transition-group type="transition" :name="'flip-list'">
			<div v-for="weather of weatherData" :key="weather.id">
				<WeatherCard :weather="weather"/>
			</div>
		</transition-group>
	</div>
</template>

<script>
	import config from '../config';
	import axios from "axios";
	import WeatherCard from "./elements/weather-card";

	export default {
		name: "home",
		components: {WeatherCard},
		data: () => ({
			coords: '',
			showAlert:false,
			alertText:'',
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
		watch: {},
		methods: {
			getUserCity() {
				if (this.coords) {
					let link = 'https://geocode-maps.yandex.ru/1.x?geocode=';
					axios.get(`${link}${this.coords}&apikey=${config.YANDEX_MAP_KEY}&format=json&lang=en_US&kind=locality`)
						.then((response) => {
							console.log('geocode-maps response: ', response)
							let userLocationCity = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name || null;
							localStorage.setItem('cities', userLocationCity);
							this.cities.push(userLocationCity);
							this.getWeather(userLocationCity)
						}).catch((err) => {
							this.showAlert = true;
							this.alertText='Location is not found';
							setTimeout(()=> {
								this.showAlert = false
							},3000);
							console.log('err', err)
						})
				}
			},
			getWeather(city) {
				if (!this.isCityExist(city)) {
					axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.OPEN_WEATHER_KEY}`)
						.then((response) => {
							// console.log('response: ',response);
							let data = response.data;
							let weather = {
								id: data.id,
								name: data.name,
								feelsLike: Math.round(data.main.feels_like - 273) || null,
								temp: Math.round(data.main.temp - 273) || null,
								wind: {
									deg: data.wind.deg || null,
									speed: data.wind.speed || null
								} || null,
								visibility: data.visibility || null,
								main: data.weather[0].main || null,
								description: data.weather[0].description || null,
								humidity: data.humidity || null,
								cloudsPercent: data.clouds.all || null,
								country: data.sys.country || null
							};

							if (this.isCityIdExist(weather.id)) {
								console.log('the city is already exists');
								let index = this.cities.indexOf(city);
								if (index > -1)
									this.cities.splice(index,1);
								localStorage.setItem('cities', this.cities);

							}
							else {
								this.weatherData.unshift(weather);
								this.cities[this.cities.indexOf(city)] = weather.name;
								localStorage.setItem('cities', this.cities);
							}
						})
						.catch((error) => {
							// handle error
							console.warn(error);
							this.alertText='City is not found';
							this.showAlert = true;
							let index = this.cities.indexOf(city);
							if (index > -1)
								this.cities.splice(index, 1);
							localStorage.setItem('cities', this.cities);
							setTimeout(()=> {
								this.showAlert = false;
							},3000);
						})

						.then(() => {
							this.weatherData = this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
						});
				}
				//https://openweathermap.org/current#current_JSON
			},
			isCityExist(city) {
				let isExist = false;
				this.weatherData.forEach(el=>{
					if (el.name.toLowerCase() === city.toLowerCase()) {
						isExist = true;
					}
				});
				return isExist;
			},
			isCityIdExist(id) {
				let isExist = false;
				this.weatherData.forEach(el=>{
					if (el.id === id) {
						isExist=true
					}
				});
				return isExist;
			},
			sort() {
				this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
			},
			getLocation() {
				navigator.geolocation.getCurrentPosition(
					position => {
						this.coords = position.coords.longitude + ', ' + position.coords.latitude;
						this.getUserCity();
					},
					error => {
						localStorage.setItem('cities', 'Los Angeles');
						this.cities=['Los Angeles'];
						this.getWeather('Los Angeles');
						console.warn(`ERROR(${error.code}): ${error.message}`);
					},
				)
			},
		},

		mounted() {
			let savedCities = localStorage.getItem('cities');
			if (savedCities) {
				savedCities = savedCities.split(',');
				this.cities = savedCities;
				this.cities.forEach(city => {
					this.getWeather(city);
				});
			}
			else this.getLocation();
		},
	}
</script>

<style lang="scss">
	.home {
		&__alert{
			position: fixed;
			top:20px;
			z-index: 2;
		}
	}
</style>
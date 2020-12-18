<template>
	<div class="home">
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

						}).catch((err) => {
							console.log('err', err)
						})
				}
			},
			getWeather(city) {
				if (!this.weatherCities.includes(city)) {
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
							this.weatherCities.unshift(weather.name);
							this.weatherData.unshift(weather);
							this.cities[this.cities.indexOf(city)] = weather.name;
							let cities = localStorage.getItem('cities').split(',')
							cities[this.cities.indexOf(city)]= weather.name;
							localStorage.setItem('cities', cities );
						})
						.catch((error) => {
							// handle error
							console.warn(error);
							let index = this.cities.indexOf(city);
							if (index > -1)
								this.cities.splice(index, 1);
						})

						.then(() => {
							this.weatherData = this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
							// always executed
							console.log(this.weatherData)

						});
				}
				//https://openweathermap.org/current#current_JSON
			},
			isEquals(a1, a2) {
				return a1.length == a2.length && a1.every((v, i) => v === a2[i])
			},
			sort() {
				this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
			},
			getLocation() {
				navigator.geolocation.getCurrentPosition(
					position => {
						this.coords = position.coords.longitude + ', ' + position.coords.latitude
						console.log('coords: ', this.coords)
						this.getUserCity();
					},
					error => {
						console.warn(`ERROR(${error.code}): ${error.message}`);
					},
				)
			},
		},

		mounted() {
			let savedCities = localStorage.getItem('cities');
			if (savedCities) this.cities = savedCities.split(',');
			else this.getLocation();

			let cities = localStorage.getItem('cities').split(',')

			cities.forEach(city => {
				this.getWeather(city)
			});

			// if (!this.isEquals(this.cities, this.weatherCities)) {
			// 	this.weatherData.splice(0, this.weatherData.length);
			// 	this.weatherCities.splice(0, this.weatherCities.length);
			// 	this.cities.forEach(city => {
			// 		this.getWeather(city)
			// 	});
			// 	this.sort();
			// }
		}
		,
	}
</script>

<style lang="scss">
	.home {
		.flex-center {
			display: flex;
			align-items: center;
		}
	}
</style>
<template>
	<div class="home">
<!--		<layout-header/>-->
		<div v-for="(weather, index) of weatherData" :key="index">
			<WeatherCard :weather="weather"/>
		</div>
	</div>
</template>

<script>
	import config from '../config';
	import axios from "axios";
	import WeatherCard from "./elements/weather-card";
	// import LayoutHeader from "./layouts/layout-header";

	export default {
		name: "home",
		components: { WeatherCard},
		data: () => ({
			// defaultCities: ['Moscow', 'Los Angeles'],
			// cities: [],
			// weatherData: []
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
		watch:  {
			cities() {
				console.log(this.cities)
				this.cities.forEach(city => {
					this.getWeather(city)
				});
			}
		},
		methods: {
			checkedGetWeather (city) {
				// getWeather
			},
			getWeather(city) {
				if (!this.weatherCities.includes(city)) {

					axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.KEY}`)

						.then((response) => {
							console.log(response);
							let data = response.data;
							let weather = {
								id: data.id,
								name: data.name,
								feelsLike: Math.round(data.main.feels_like-273) || null,
								temp: Math.round(data.main.temp-273) || null,
								wind: {
									deg: data.wind.deg || null,
									speed: data.wind.speed || null
								} || null,
								visibility: data.visibility || null,
								main:data.weather[0].main || null,
								description: data.weather[0].description || null,
								humidity:data.humidity || null,
								cloudsPercent:  data.clouds.all || null,
								country: data.sys.country || null

							};
							this.weatherCities.unshift(city);
							console.log('weather', weather)
							this.weatherData.unshift(weather)


						})
						.catch((error) => {
							// handle error
							console.warn(error);
						})

						.then(() => {
							// always executed
						});
				}
				//https://openweathermap.org/current#current_JSON

			}
		},

		mounted() {
console.log('!!')
			// this.defaultCities.forEach(city => {
			// 	this.getWeather(city);
			// 	console.log('++')
			// });
			this.cities.forEach(city => {
				this.getWeather(city)
				console.log('--')
			});
			console.log('weatherData', this.weatherData)


			// this.getWeather(this.defaultCity)

		}
	}
</script>

<style lang="scss">
.home{
	/*max-width: 350px;*/
	/*width:100%;*/
	/*margin-left: auto;*/
	/*margin-right: auto;*/
	/*position: absolute;*/
	/*top:0*/
}
</style>
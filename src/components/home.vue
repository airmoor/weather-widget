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
							this.weatherCities.unshift(city.name);
							console.log('weather', weather)
							this.weatherData.unshift(weather)


						})
						.catch((error) => {
							// handle error
							console.warn(error);
						})

						.then(() => {
							this.weatherData=this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));
							// always executed
						});
				}
				//https://openweathermap.org/current#current_JSON

			},
			isEquals (a1, a2) {
				return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
			},
			sort() {
				// var items = [
				// 	{id: '1150', title: 'im tyler'},
				// 	{id: '1195', title: 'im josh'}
				// ];
				//
				// var sortArray = [
				// 	'1195',
				// 	'1150'
				// ];
				//
				// items.sort((a, b) => sortArray.indexOf(a.id) - sortArray.indexOf(b.id));
				//
				// console.log(items);
				this.weatherData=this.weatherData.sort((a, b) => this.cities.indexOf(a.name) - this.cities.indexOf(b.name));

				console.log(this.weatherData);
				this.weatherData.forEach(el=>{
					console.log('!!',el.name);
				})

			}
		},


		mounted() {
			// this.cities.forEach(city => {
			// 	this.getWeather(city)
			// });

			if (this.isEquals(this.cities,this.weatherCities)) {
				console.log('true')
			}
			else {
				console.log('false')
				this.weatherData.splice(0, this.weatherData.length)
				this.weatherCities.splice(0, this.weatherCities.length)
				this.cities.forEach(city => {
					this.getWeather(city)
				});
				this.sort();
			}



		},
		// updated() {
		// 	this.cities.forEach(city => {
		// 		this.getWeather(city)
		// 	});
		// }
	}
</script>

<style lang="scss">
.home{

}
</style>
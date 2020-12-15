<template>
	<div class="home">
<!--		<layout-header/>-->
		<div v-for="weather of weatherData" :key="weather.id">
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
			defaultCity: 'Moscow',
			cities: [],
			weatherData: []
		}),
		methods: {

			getWeather(city) {
				//https://openweathermap.org/current#current_JSON
				axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.KEY}`)
					.then((response) => {
						console.log(response);
						let data = response.data;
						let weather = {
							id: data.id,
							name: data.name,
							feelsLike: Math.round(data.main.feels_like-273),
							temp: Math.round(data.main.temp-273),
							wind: {
								deg: data.wind.deg,
								speed: data.wind.speed
							},
							visibility: data.visibility,
							main:data.weather[0].main,
							description: data.weather[0].description,
							humidity:data.humidity,
							cloudsPercent:  data.clouds.all,
							country: data.sys.country

						};
						console.log('weather', weather)
						this.weatherData.push(weather)
						this.weatherData.push(weather)

					})
					.catch((error) => {
						// handle error
						console.log(error);
					})
					.then(() => {
						// always executed
					});
			}
		},

		mounted() {
			this.getWeather(this.defaultCity)

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
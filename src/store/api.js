import axios from "axios";
import config from '../config';

//https://openweathermap.org/current#current_JSON
export function getWeather(city) {
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.KEY}`)

		.then((response) => {
			console.log('response: ',response);
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
			this.$store.state.weatherCities.push(city);

			this.$store.state.weatherData.push(weather)


		})
		.catch((error) => {
			// handle error
			console.warn(error);
		})

		.then(() => {
			// always executed
		});
}




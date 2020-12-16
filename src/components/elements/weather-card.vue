<template>
	<div class="weather-card">
		<h3>{{weather.name}}, {{weather.country}}</h3>
		<div class="weather-card__header">
			<svgicon width="150" :name="icon" original/>
			<h1>{{weather.temp }} &deg;C</h1>
		</div>

		<p>Feels like {{weather.feelsLike}} &deg;C.
			<span class="weather-card__description">{{weather.description}}</span>
		</p>

		<p>Visibility: {{weather.visibility}}</p>
		<p>Wind:
			<svgicon name="arrow" color="black" width="16" :style="arrowStyle" />
			{{weather.wind.speed}} m/s
		</p>
	</div>
</template>

<script>
	export default {
		name: "weather-card",
		props: ['weather'],
		computed: {
			icon() {
				//https://freeicons.io/icon-list/weather-2
				switch (this.weather.main) {
					case 'Rain':return 'rain';
					case 'Snow':  return 'snow';
					case 'Clouds': return 'cloudy';
					case 'Clear': return 'sunny';
					case 'Haze' : return 'haze';
					default: return 'suncloud';
				}
			},
			arrowStyle() {
				if (this.weather && this.weather.wind && this.weather.wind.deg)
				return { transform: `rotate(${this.weather.wind.deg}deg)`}
				else return {}
			}
		}
	}
</script>

<style lang="scss">
.weather-card{
	box-shadow: 0 16px 24px rgba(103, 110, 134, 0.1);
	border-radius: 32px;
	padding:32px;
	margin:16px auto;
	background: #FFFFFF;
	&__header{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__description{
		text-transform: capitalize
	}
}
</style>
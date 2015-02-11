(function() {
	function getDayByTimestamp (timestamp) {
		return new Date(timestamp).toString().match(/^\w*/)[0];
	}

	function getTemplate () {
		return $("#weather-widget-tmpl").html();
	}

	function prepareDataListItem (listItem) {
		return {
			day: getDayByTimestamp(listItem.dt * 1000),
			minTemp: listItem.temp.min,
			maxTemp: listItem.temp.max,
			dayTemp: listItem.temp.day,
			meteoconIcon: replaceIconWithMeteocon(listItem.weather[0].icon)
		};
	}

	function prepareDateToRender (data) {
		return {
			cityName: data.city.name,
			forecast: data.list.map(prepareDataListItem)
		};
	}

	function replaceIconWithMeteocon (iconName) {
		switch (iconName) {
			case "01d":
			case "01n":
			    return "B";
			case "02d":
			case "02n":
				return "A";
			case "03d":
			case "03n":
				return "N";
			case "04d":
			case "04n":
				return "Y";
			case "09d":
			case "09n":
				return "R";
			case "10d":
			case "10n":
				return "Q";
			case "11d":
			case "11n":
				return "0";
			case "13d":
			case "13n":
				return "W";
			case "50d":
			case "50n":
				return "M";
			default:
				return "";
		}
	}

	function makeWeatherWidget(city, widgetContainer) {
		$.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
			q: city,
			units: "metric",
			cnt: 7
		}, function(data) {
			var template = getTemplate(),
				dataToRender = prepareDateToRender(data),
				widgetHTML = Mustache.render(template, dataToRender);
			widgetContainer.html(widgetHTML);
		});
	}

	$.fn.weatherWidget = function weatherWidget(options) {
		makeWeatherWidget(options.city, this);
	};
}());
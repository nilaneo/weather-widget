(function() {
	var DEFAULTS_OPTIONS = {
		city: 'Kiev',
		templateUrl: "/src/templates/weather-widget.tpl.html"
	};

	function getDayByTimestamp (timestamp) {
		return new Date(timestamp).toString().match(/^\w*/)[0];
	}

	function getTemplate (templateUrl, callback) {
		$.get(templateUrl, function(data) {
			callback(data);
		});
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

	function makeWeatherWidget(widgetContainer, options) {
		$.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
			q: options.city,
			units: "metric",
			cnt: 7
		}, function(data) {
			getTemplate(options.templateUrl, function(template) {
				var	dataToRender = prepareDateToRender(data),
					widgetHTML = Mustache.render(template, dataToRender);
				widgetContainer.html(widgetHTML);
			})
		});
	}

	$.fn.weatherWidget = function weatherWidget(options) {
		var optionsWithDefaults = $.extend({}, DEFAULTS_OPTIONS, options);
		makeWeatherWidget(this, optionsWithDefaults);
	};
}());
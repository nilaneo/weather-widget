(function() {
	var DEFAULTS_OPTIONS = {
		city: 'Kiev',
		templateUrl: "/src/templates/weather-widget.tpl.html"
	};

	function getDayByTimestamp (timestamp) {
		return new Date(timestamp).toString().match(/^\w*/)[0];
	}

	var templateCache = {};

	function getTemplateFromCache (templateUrl) {
		return templateCache[templateUrl];
	}

	function addTemplateToCache (templateUrl, templatePromise) {
		templateCache[templateUrl] = templatePromise;
	}

	function getTemplateFromServer (templateUrl) {
		return $.get(templateUrl).then(function(template) {
			return template;
		});
	}

	function getTemplateFromServerAndAddToCache (templateUrl) {
		var templatePromise = getTemplateFromServer(templateUrl)
		addTemplateToCache(templateUrl, templatePromise);
		return templatePromise;
	}

	function getTemplate (options) {
		var templateUrl = options.templateUrl;
		return getTemplateFromCache(templateUrl) || getTemplateFromServerAndAddToCache(templateUrl);
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

	function getDataFromAPI(options) {
		return $.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
			q: options.city,
			units: "metric",
			cnt: 7
		}).then(prepareDateToRender);
	}

	function getDataAndTemplate (options) {
		return $.when(getDataFromAPI(options), getTemplate(options));
	}

	function renderDataAndTemplateToHTML (dataToRender, template) {
		return Mustache.render(template, dataToRender);
	}

	function makeWeatherWidget(widgetContainer, options) {
		getDataAndTemplate(options)
			.then(renderDataAndTemplateToHTML)
			.then(function(widgetHTML) {
				widgetContainer.html(widgetHTML);
			});
	}

	$.fn.weatherWidget = function weatherWidget(options) {
		var optionsWithDefaults = $.extend({}, DEFAULTS_OPTIONS, options);
		makeWeatherWidget(this, optionsWithDefaults);
	};
}());
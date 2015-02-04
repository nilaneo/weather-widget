$(document).ready(function() {
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
			maxTemp: listItem.temp.max
		};
	}

	function prepareDateToRender (data) {
		return {
			cityName: data.city.name,
			forecast: data.list.map(prepareDataListItem)
		};
	}

	$.get("http://api.openweathermap.org/data/2.5/forecast/daily", {
		q: "Kiev",
		units: "metric",
		cnt: 7
	}, function(data) {
		var template = getTemplate(),
			dataToRender = prepareDateToRender(data),
			widgetHTML = Mustache.render(template, dataToRender);
		$("#weather-widget").html(widgetHTML);
	});
});
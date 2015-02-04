$(document).ready(function() {
	$.get( "http://api.openweathermap.org/data/2.5/forecast/daily", {
		q: "Kiev",
		units: "metric",
		cnt: 7
	}, function(data) {
		data.list.forEach(function(forecast){
			$("<li></li>").text("City: " + data.city.name + ": min: " + forecast.temp.min + ", max: " + forecast.temp.max).appendTo($("ul"));
		});
	});
});
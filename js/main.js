$(document).ready(function() {
	function getDayByTimestamp(timestamp) {
		return new Date(timestamp).toString().match(/^\w*/)[0];
	}

	$.get( "http://api.openweathermap.org/data/2.5/forecast/daily", {
		q: "Kiev",
		units: "metric",
		cnt: 7
	}, function(data) {
		var $dayList = $("[data-js='day-list']");
		$("[data-js='city']").text(data.city.name);
		data.list.forEach(function(forecast){
			$("<li></li>").text(getDayByTimestamp(forecast.dt*1000) + " min: " + forecast.temp.min + ", max: " + forecast.temp.max).appendTo($dayList);
		});
	});
});
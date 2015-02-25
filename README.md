# weather-widget

##[Demo](http://nilaneo.github.io/weather-widget/example/)

**What's a weather-widget?**

It's a small jQuery widget for weather forecastnig made using a combination of jQuery, Mustache, CSS and HTML and it rans with Grunt.

![screenshot](https://github.com/nilaneo/weather-widget/blob/gh-pages/weather-widget.png)

### Documentation

**Install dependencies**

```bash
$ npm install
```
**Build a widget**

```bash
$ grunt build
```

**Start a server and watch css, html and js files for changes**

```bash
$ grunt server
```
**Dependencies**

weather-widget has two dependencies:

 * [jQuery](http://jquery.com/) 2.1 or later.
 * [Mustache.js](https://github.com/janl/mustache.js/) 0.8 or later.

As with all jQuery plugins, just ensure that you load jQuery and Mustache before you load weather-widget.min.js, for example:

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js"></script>
    <script src="../dest/js/weather-widget.min.js"></script>

**Usage**

```bash
  $("#weather-widget").weatherWidget({
      city: "Kyiv",
      templateUrl: "../dest/templates/weather-widget.tpl.min.html"
  });
```

Look at example for more details.
Feel free to use your css to customize the weather-widget.

**Credits**

Forecast API by [http://api.openweathermap.org](http://api.openweathermap.org)

Icons by [http://www.alessioatzeni.com/meteocons/](http://www.alessioatzeni.com/meteocons/)

Licensed under [MIT](//opensource.org/licenses/MIT)

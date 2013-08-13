var width = 600
var height = 600;

    function foo(p, A, f, d, t) {
      // e^-Dämpfung*t * sin(2*pi*t+Phasenversch)
      // phi = -1 * phi;
      // return Math.pow(Math.E, phi*t)*(X1*Math.sin(omega*t)+X2*Math.cos(omega*t));
      // phi = -1 * phi;
      // return Math.pow(Math.E, phi*t)*Math.sin(2*math.PI*t+omega);
      return A*Math.pow(Math.E, -1*t*d)*Math.sin(2*f*Math.PI*t);
    }

    function getDataX() {
      var ret = new Array();
      var t = 0;
      for (var i = 0; i < 10000; i++) {
        t = t + 0.1;
        var x = foo(0.2, 1, 1, 0.07, t);
        ret.push(x);
      }

      return ret;
    }

    function getDataY() {
      var ret = new Array();
      var t = 0;
      for (var i = 0; i < 10000; i++) {
        t = t + 0.1;
        var y = height - foo(0.2, 0.9, 1.07, 0.05, t);
        ret.push(y);
      }

      return ret;
    }

    

    var linearScaleX = d3.scale.linear()
      .domain([d3.min(getDataX()),d3.max(getDataX())])
      .range([0, width]);

    var linearScaleY = d3.scale.linear()
      .domain([d3.min(getDataY()),d3.max(getDataY())])
      .range([0, height]);

    function getData() {
      var ret = new Array();
      var dX = getDataX();
      var dY = getDataY();
      for (var i = 0; i < dX.length; i++) {
        ret.push({x:linearScaleX(dX[i]), y:linearScaleY(dY[i])});
      }

      return ret;
    }

    var chart = d3.select("#chart").
      append("svg:svg").
      attr("width", width).
      attr("height", height);

    // x axis
    chart.append("svg:line").
      attr("x1", 0).
      attr("x2", width).
      attr("y1", height/2+0.5).
      attr("y2", height/2+0.5).
      attr("stroke", "red").
      attr("stroke-width", 1);

    // y axis
    chart.append("svg:line").
      attr("x1", width/2+0.5).
      attr("x2", width/2+0.5).
      attr("y1", 0).
      attr("y2", height).
      attr("stroke", "red").
      attr("stroke-width", 1);

    var line = d3.svg.line().
      x(function(d) { return d.x; }).
      y(function(d) { return d.y; }).
      interpolate("basis");

    chart.append("svg:path")
            .attr("d", line(getData()))
            .attr("stroke-width", 1)
            .attr("stroke", "steelblue")
            .attr("fill", "none");
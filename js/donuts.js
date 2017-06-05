var radius=100


function Donut(el,prop,svg) {
  var donut = this;
  this.prop=prop;

  width = d3.scaleLinear()
    .domain([0,1])
    .range([0,70]);

  data_bins =  [.11, .22, .33,.44,.55,.66,.77,.88,1];
    color_range = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'];
    colorScale = d3.scaleLinear()
        .domain(data_bins)
        .range(color_range);

  donut.svg = d3.select(el)
    .append("svg")
    .attr('width', width+10)
    .attr('height', height+20) // d3 v4 requires setting attributes one at a time. no native support for setting attr or style with objects as in v3. this library would make it possible: mini library D3-selection-mult
    .append("g")
    .attr("transform","translate(" + width /2 + "," + height /2 + ")");

       donut.arc = d3.arc()
        .outerRadius(donut.radius - width/20)
        .innerRadius(donut.radius - width/4)
        .startAngle(0);

 donut.background = donut.svg  // appends full-circle backgroud arc. will bind only "yes" arc over this one
                                  // to simplfy animation (always same start angle) JO
      .append('path')
      .datum({endAngle: 2 * Math.PI})
      .style("fill", "#ddd")
      .attr("d", donut.arc);

  donut.foreground = donut.svg.append('path')
      .style("fill", '#fd8d3c')
      .datum({endAngle: 0});

  donut.percentage = donut.svg.append("text")
        .attr("text-anchor", "middle")
        .attr('class','pie_number')
        .attr('y',5);

  donut.label = donut.svg.append("text")
        .attr("y", donut.height / 2 + 10)
        .attr('class','pie_text')
        .attr('text-anchor','middle');
};


  arcTween: function(newAngle) { // HT: http://bl.ocks.org/mbostock/5100636
    var donut = this;
    return function(d){
      var interpolate = d3.interpolate(d.endAngle, newAngle);
      return function(t) {
        d.endAngle = interpolate(t);
        return chart.arc(d);
      };
    };    
  };



Donut.prototype.update = function (options) {
  var self = this;

    
    
    donut.foreground      
        
        .transition().duration(750)
        .attrTween("d", donut.arcTween(40 * Math.PI * 2));
        
};
//d3.select('#'+this.prop+'flag').remove();

//<img src="icons/flag.svg" onerror="this.src='icon/flag.png'" style="width:12px;height:12px;">

var donuts = [
  new Donut('#donut-1', 'EPL_POV',42),
  new Donut('#donut-2', 'EPL_UNEMP',58),
  new Donut('#donut-3', 'EPL_PCI',74),
  new Donut('#donut-4', 'EPL_NOHSDP',90),
  new Donut('#donut-5', 'EPL_AGE65',146),
  new Donut('#donut-6', 'EPL_AGE17',162),
];

function updateDonuts(options) {
  donuts.forEach(function(donut) {
    donut.update(options);
  })
}

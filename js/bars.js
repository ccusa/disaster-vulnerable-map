var barwidth=100
var barheight=14

function Bar(el,prop,y) {
  var bar = this;
  this.prop=prop;

  width = d3.scaleLinear()
    .domain([0,1])
    .range([0,70]);

  data_bins =  [0,.2, .4, .6, .8];
    color_range = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];
    colorScale = d3.scaleLinear()
        .domain(data_bins)
        .range(color_range);

  bar.svg = d3.select(el)
    .append('svg')
    .attr('x',0)
    .attr('y',y)
    .attr('width', barwidth)
    .attr('height', barheight)
  bar.svg
    .append('g');
  bar.svg
    .append('rect')
    .attr('class','bar')
    .attr('rx',5)
      .attr('ry',5)
    .attr('id',this.prop)
    .attr('height',14)
    .attr('width',70)
    .style('fill','#fff');
  bar.svg
    .append('text')
    .attr('class','bartext')
    .attr('id',this.prop+'text')
    .attr('y',14)
    .text(Bar.prop)
    .style('fill','#ffffff');
}

Bar.prototype.update = function (options) {
  console.log('Update bar', this.prop);
  var self = this;
  d3.select('#'+this.prop)
        .transition(5000)
        .attr("width",function(d) { return width(options[self.prop])})//x.bandwidth())
        .style('fill',function(d) {return colorScale(options[self.prop])});

  d3.select('#'+this.prop+'text')
        .transition(5000)
        .attr("x",function(d) {
          console.log('calc', self.prop, options);
          return width(options[self.prop])+2
        })//x.bandwidth())
        .text(function(d) {return d3.format(".1f")(options[self.prop]*100)});

}

var bars = [
  new Bar('#overlay-data', 'EPL_POV',42),
  new Bar('#overlay-data', 'EPL_UNEMP',60),
  new Bar('#overlay-data', 'EPL_PCI',80),
  new Bar('#overlay-data', 'EPL_NOHSDP',100),
  new Bar('#overlay-data', 'EPL_AGE65',160),
  new Bar('#overlay-data', 'EPL_AGE17',180),
  new Bar('#overlay-data', 'EPL_DISABL',200),
  new Bar('#overlay-data', 'EPL_SNGPNT',220),
  new Bar('#overlay-data', 'EPL_MINRTY',280),
  new Bar('#overlay-data', 'EPL_LIMENG',300),
  new Bar('#overlay-data', 'EPL_MUNIT',360),
  new Bar('#overlay-data', 'EPL_MOBILE',380),
  new Bar('#overlay-data', 'EPL_CROWD',400),
  new Bar('#overlay-data', 'EPL_NOVEH',420)
];

function updateBars(options) {
  bars.forEach(function(bar) {
    bar.update(options);
  })
}

function updateText(options){
  d3.select('#location')
    .select("text").remove();

 d3.select('#location')
    .append('text')
    .text(options.LOCATION);

d3.select('#population')
    .select("text").remove();

 d3.select('#population')
    .append('text')
    .text(d3.format(",")(options.E_TOTPOP));

}
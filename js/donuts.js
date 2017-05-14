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
    .append('svg')
    .attr('x',0)
    .attr('y',y)
    .attr('width', radius)
    .attr('height', radius)
  donut.svg
    .append('g');
  donut.svg
    .append('rect')
    .attr('class','donut')
    .attr('rx',3)
    .attr('ry',3)
    .attr('id',this.prop)
    .attr('height',12)
    .attr('width',0)
    .style('fill','#fff');
  donut.svg
    .append('text')
    .attr('class','bartext')
    .attr('id',this.prop+'text')
    .attr('y',12)
    .text(Donut.prop)
    .style('fill','#ffffff');
  donut.svg
    .append('svg')
    .attr('class','flag')
    .attr('id',this.prop+'flag')
    .attr('y',12)
    .style('fill','#ffffff');
}



Donut.prototype.update = function (options) {
  var self = this;

//d3.select('#'+this.prop+'flag').remove();

  d3.select('#'+this.prop)
        .transition(5000)
        .attr("width",function(d) { return width(options[self.prop])})//x.bandwidth())
        .style('fill',function(d) {return colorScale(options[self.prop])});

  d3.select('#'+this.prop+'text')
        .transition(5000)
        .attr("x",function(d) {
          return width(options[self.prop])+2
        })//x.bandwidth())
        .text(function(d) {return d3.format(".1f")(options[self.prop]*100)});

  d3.select('#F_Total-bignumber')
        .text(function(d) {return (options.F_TOTAL)});
  
  if(options[self.prop]>.9){
    d3.select('#'+this.prop+'flag')
     .transition(5000)
        .attr("x",function(d) {
          return width(options[self.prop])+6
        });
        
    
}}

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

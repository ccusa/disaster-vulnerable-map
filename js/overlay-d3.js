(function(){
	console.log("d3");
	var svg = d3.select('svg'),
		margin = {top: 20, right: 20, bottom: 30, left: 40},
    	width = +svg.attr("width") - margin.left - margin.right,
    	height = +svg.attr("height") - margin.top - margin.bottom;

  	var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    d3.tsv("../sample-data.tsv", function(data) {
            data.forEach(function(obj) { 
                for (var key in obj) {   
                    if (obj.hasOwnProperty(key)) {  // hasOwnProperty limits to own, nonprototypical properties.
                                                    
                        obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
                    }
                };
                console.log(data);
                g.selectAll('text')
                	.data(data)
                	.enter()
                	.append('text')
                	.attr('x', 0)
                	.attr('y', 15)
                	.text(function(d){return d['LOCATION']})
                
            });
        });
    

    // csv.selectAll('text')
    // 	.data(data)
}())
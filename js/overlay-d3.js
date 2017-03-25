var heights = [530, 42, 60, 80, 100, 14, 180, 200, 220, 240, 150, 320, 340, 290, 420, 440, 460, 480, 390, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
	svg = d3.select('svg'),
	data;

d3.tsv("../sample-data.tsv", function(d) {
        console.log(d);
		data = d;    
        overlay("36065023501");
    });


function overlay(tract){
	var count = 0;
    data.filter(function(d){ return d['FIPS'] === tract}).forEach(function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {  // hasOwnProperty limits to own, nonprototypical properties.
                obj[key] = isNaN(+obj[key]) ? obj[key] : +obj[key]; // + operator converts to number unless result would be NaN
            	if(document.querySelector("#"+key)){
            		document.querySelector("#"+key).textContent = obj[key];
            		if (!isNaN(+obj[key])){
                		svg.append('rect')
							.attr('x', 0)
							.attr('y', function(){
								return heights[count];
							})
							.attr('width', 30)
							.attr('height', "1em")
							.attr('fill', 'blue')
							.attr('class', key)
						count++;
					}
            	}
            }
        };
    });
}

// csv.selectAll('text')
// 	.data(data)

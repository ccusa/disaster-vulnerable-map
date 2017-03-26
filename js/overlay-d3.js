var heights = [42, 60, 80, 100, 180, 200, 220, 240, 320, 340, 420, 440, 460, 480, 14, 150, 290, 390, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600],
	svg = d3.select('svg'),
	data;

d3.csv("../data/SVI2014 - Fields Removed.csv", function(d) {
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
            		if (key.slice(0,3) === "EPL"){
            			document.querySelector("#"+key).textContent = Math.round(obj[key] * 100) + "th*";

                		svg.append('rect')
							.attr('x', 0)
							.attr('y', function(){
								return heights[count];
							})
							.attr('width', (130 * obj[key]))
							.attr('height', "1em")
							.attr('fill', 'blue')
							.attr('class', key)
						count++;
					} else if (key === "LOCATION"){
            			document.querySelector("#"+key).textContent = obj[key].split(",").slice(0,2).join(",");
					} else {
						document.querySelector("#"+key).textContent = obj[key];	
					}
            	}
            }
        };
    });
}

// csv.selectAll('text')
// 	.data(data)

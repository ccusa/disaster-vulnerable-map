mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
	zoom: 2,
	center: [-76.92, 38.9072],
	minZoom: 3,
	preserveDrawingBuffer: true});

map.on('load', function() {

map.addSource("county", {
"type": "vector",
"url": "mapbox://lukasmartinelli.5efst3tv"
});

map.addLayer({
    "id": "county",
    "type": "fill",
    "source": "county",
    "source-layer":"cdc_data_countygeojson",
    paint: {
            'fill-color': {
                property: 'F_TOTAL',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#ccebc5'],
                    [3, '#a8ddb5'],
                    [4, '#7bccc4'],
                    [5, '#4eb3d3'],
                    [6, '#2b8cbe'],
                    [7, '#08589e'],
                    [9, '#08589e'],
                    [10, '#08589e'],
                    [11, '#08589e'],
                    [12, '#08589e'],
                    [13, '#08589e']]
            },
            'fill-opacity': 0.5
        }

},"airport-label"
);


var toggleableLayerIds = [ 'SVI', 'tract','neighborhood','zip','zillow' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'disabled';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}


map.on('click', function (e) {
	  var building = map.queryRenderedFeatures(e.point, {
	 
	  });
	      document.getElementById('pd').innerHTML = "<h3><strong>" + building[0].properties.Proj_Addre +"</strong><br>"+building[0].properties.Proj_Name + "<br><br>" + "</h3><p>" + "Owner: " + building[0].properties.Hud_Own_Name +"<br>"+"Cluster Name: "+ building[0].properties.Cluster_tr2000_name+"<br>"+"HUD Owner Name: " + building[0].properties.Hud_Own_Name+"<br>"+"HUD Owner Type: " + building[0].properties.Hud_Own_Type +"<br>"+"HUD Manager Name: " + building[0].properties.Hud_Mgr_Name+"<br>"+"HUD Manager Type: " + building[0].properties.Hud_Mgr_Type +"<br><br><strong>"+"At Risk: "+"</strong>"+ building[0].properties.Cat_At_Risk+"<br>"+building[0].properties.Category_Code +"</p>";

	});

	map.getCanvas().style.cursor = 'default';


});


//#f0f9e8 0-2
//#ccebc5 3-4 etc..
//#a8ddb5
//#7bccc4
//#4eb3d3
//#2b8cbe
//#08589e
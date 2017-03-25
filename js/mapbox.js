mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

var options={
	tract:' ',
}

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
	zoom: 2,
	hash:true,
	center: [-76.92, 38.9072],
	minZoom: 3,
	preserveDrawingBuffer: true});

map.on('load', function() {

map.addSource("maps", {
"type": "vector",
"url": "mapbox://lukasmartinelli.9xh49yog,lukasmartinelli.bn7gihoi"
});

map.addLayer({
    "id": "county",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
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
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
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
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);

map.addLayer({
    "id": "county-socio",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_County",
    "maxzoom": 20,
    paint: {
            'fill-color': {
                property: 'F_THEME1',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0.5],[8,0.5],[10,0]]
            }
        }

},"airport-label"
);

map.addLayer({
    "id": "tract-socio",
    "type": "fill",
    "source": "maps",
    "source-layer":"SVI_Tract",
    "minzoom": 0,
    paint: {
            'fill-color': {
                property: 'F_THEME1',
                type: 'categorical',
                stops: [
                    [1, '#f0f9e8'],
                    [2, '#bae4bc'],
                    [3, '#7bccc4'],
                    [4, '#2b8cbe']]
            },
            'fill-opacity': {
            	stops:[[0,0],[8,0],[10,0.5]]
            }
        }

},"county"
);


var toggleableLayerIds = [ 'Social Vulnerability - Overall',
							'Socioeconomic Status',
							'Household Composition & Disability',
							'Minority Status & Language',
							'Housing & Transportation',
							'Total Natural Hazard Risk',
							'Earthquake Risk',
							'Tornado Risk',
							'Hail Risk',
							'Hurricane Risk',
							'Flood Risk',
							'Wildfire Risk'
							];

    var toggleableLayers = [
      { ids: ['tract', 'county'], name: 'Social Vulnerability - Overall'},
      { ids: ['tract-socio','county-socio'], name: 'Socioeconomic Vulnerability'}
    ];

    var menu = document.getElementById('menu');

    function hideAllLayers() {
			toggleableLayers.forEach(function(layer, i) {
				var link = menu.children[i];
				link.className = '';
				layer.ids.forEach(function(layerId) {
          map.setLayoutProperty(layerId, 'visibility', 'none');
				});
			});
    }

    toggleableLayers.forEach(function(layer) {
        var link = document.createElement('a');
        link.href = '#';
        link.className = '';
        link.textContent = layer.name;

        link.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            hideAllLayers();
            this.className = 'active';
						layer.ids.forEach(function(layerId) {
              map.setLayoutProperty(layerId, 'visibility', 'visible');
						});
        };

        menu.appendChild(link);
    });

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

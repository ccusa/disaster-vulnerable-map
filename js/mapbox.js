mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

function addCustomLayers(map) {
  map.addSource("highlight", {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": []
    }
  });

  map.addSource("maps", {
    "type": "vector",
    "url": "mapbox://lukasmartinelli.9xh49yog,lukasmartinelli.bn7gihoi"
  });

  map.addLayer({
      "id": "highlight",
      "type": "line",
      "source": "highlight",
      "layout": {},
      "paint": {
          "line-color": "#332A85",
          "line-width": 3
      }
  });

  map.addLayer({
      "id": "county",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 10,
      paint: {
        'fill-color': {
            property: 'F_TOTAL',
            type: 'categorical',
            stops: [
              [1, '#ffffd9'],
              [2, '#edf8b1'],
              [3, '#c7e9b4'],
              [4, '#7fcdbb'],
              [5, '#41b6c4'],
              [6, '#1d91c0'],
              [7, '#225ea8'],
              [9, '#0c2c84'],
              [10, '#0c2c84'],
              [11, '#0c2c84'],
              [12, '#0c2c84'],
              [13, '#0c2c84'],
              [14, '#0c2c84'],
              [15, '#0c2c84'],
              [16, '#0c2c84'],
              [17, '#0c2c84'],
            ]
        },
        'fill-opacity': {
          stops:[[0, 0.5], [8, 0.5], [10, 0]]
        }
    }
  }, "airport-label");

  map.addLayer({
      "id": "tract",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_Tract",
      "minzoom": 8,
      paint: {
        'fill-color': {
            property: 'F_TOTAL',
            type: 'categorical',
            stops: [
               [1, '#ffffd9'],
              [2, '#edf8b1'],
              [3, '#c7e9b4'],
              [4, '#7fcdbb'],
              [5, '#41b6c4'],
              [6, '#1d91c0'],
              [7, '#225ea8'],
              [9, '#253494'],
              [10, '#081d58'],
              [11, '#081d58'],
              [12, '#081d58'],
              [13, '#081d58'],
              [14, '#081d58'],
              [15, '#081d58'],
              [16, '#081d58'],
              [17, '#081d58'],
            ]
        },
        'fill-opacity': {
          stops:[[0, 0], [8, 0], [10, 0.5]]
        }
      }
  }, "county");

  map.addLayer({
      "id": "county-socio",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
            property: 'RPL_THEME1',
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
  }, "airport-label");

  map.addLayer({
      "id": "tract-socio",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_Tract",
      "minzoom": 0,
      layout: {
        visibility:'none'
      },
      paint: {
              'fill-color': {
                  property: 'RPL_THEME1',
                  type: 'categorical',
                  stops: [
                      [1, '#f0f9e8'],
                      [4, '#bae4bc'],
                      [6, '#7bccc4'],
                      [8, '#2b8cbe']]
              },
              'fill-opacity': {
                stops:[[0, 0], [8, 0], [10, 0.5]]
              }
          }

  },"county");

  map.addLayer({
      "id": "county-household",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'RPL_THEME2',
          type: 'categorical',
          stops: [
                [1, '#f0f9e8'],
                [2, '#bae4bc'],
                [3, '#7bccc4'],
                [4, '#2b8cbe']]
        },
        'fill-opacity': {
          stops:[[0, 0.5], [8, 0.5], [10, 0]]
        }
      }
  }, "airport-label");

  map.addLayer({
      "id": "tract-household",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_Tract",
      "minzoom": 0,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
            property: 'RPL_THEME2',
            type: 'categorical',
            stops: [
              [1, '#f0f9e8'],
              [2, '#bae4bc'],
              [3, '#7bccc4'],
              [4, '#2b8cbe']
            ]
        },
        'fill-opacity': {
          stops:[[0, 0], [8, 0], [10, 0.5]]
        }
      }
  }, "county");
map.addLayer({
      "id": "county-minority",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'RPL_THEME3',
          type: 'categorical',
          stops: [
            [1, '#f0f9e8'],
            [2, '#bae4bc'],
            [3, '#7bccc4'],
            [4, '#2b8cbe']
          ]
        },
        'fill-opacity': {
          stops:[[0,0.5],[8,0.5],[10,0]]
        }
    }
  }, "airport-label");

  map.addLayer({
      "id": "tract-minority",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_Tract",
      "minzoom": 0,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'RPL_THEME3',
          type: 'categorical',
          stops: [
            [1, '#f0f9e8'],
            [2, '#bae4bc'],
            [3, '#7bccc4'],
            [4, '#2b8cbe']
          ]
        },
        'fill-opacity': {
          stops:[[0,0],[8,0],[10,0.5]]
        }
      }
  }, "county");

  map.addLayer({
      "id": "county-housing",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'RPL_THEME4',
          type: 'categorical',
          stops: [
            [1, '#f0f9e8'],
            [2, '#bae4bc'],
            [3, '#7bccc4'],
            [4, '#2b8cbe']
          ]
        },
        'fill-opacity': {
          stops:[[0,0.5],[8,0.5],[10,0]]
        }
    }
  }, "airport-label");

  map.addLayer({
      "id": "tract-housing",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_Tract",
      "minzoom": 0,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'RPL_THEME4',
          type: 'categorical',
          stops: [
            [1, '#f0f9e8'],
            [2, '#bae4bc'],
            [3, '#7bccc4'],
            [4, '#2b8cbe']
          ]
        },
        'fill-opacity': {
          stops:[[0,0],[8,0],[10,0.5]]
        }
      }
  }, "county");

  map.addLayer({
      "id": "county-hazard",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'T_N_H_R',
          stops: [
              [8, '#ffffcc'],
              [16, '#ffeda0'],
              [24, '#fed976'],
              [32, '#feb24c'],
              [40, '#fd8d3c'],
              [48, '#fc4e2a'],
              [56, '#e31a1c'],
              [64, '#b10026'],
              [72, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

 map.addLayer({
      "id": "county-hurricane",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'H_S_S_R',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

map.addLayer({
      "id": "county-flood",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'Fld_R_I',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

map.addLayer({
      "id": "county-hail",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'Hl_Rs_I',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

map.addLayer({
      "id": "county-earthquake",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'Ert_R_I',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

map.addLayer({
      "id": "county-tornado",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'Trn_R_I',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

map.addLayer({
      "id": "county-wildfire",
      "type": "fill",
      "source": "maps",
      "source-layer":"SVI_County",
      "maxzoom": 20,
      layout: {
        visibility:'none'
      },
      paint: {
        'fill-color': {
          property: 'Wld_R_I',
          stops: [
              [3, '#ffffcc'],
              [6, '#ffeda0'],
              [9, '#fed976'],
              [12, '#feb24c'],
              [15, '#fd8d3c'],
              [18, '#fc4e2a'],
              [21, '#e31a1c'],
              [24, '#b10026'],
              [27, '#800026']]
        },
        'fill-opacity': 0.5
      }
  }, "airport-label");

}

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  zoom: 14,
  types: 'region,postcode,district,place',
  country: 'US'
});

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/rmcarder/cizru0urw00252ro740x73cea',
  zoom: 2,
  hash:true,
  center: [-76.92, 38.9072],
  minZoom: 3,
  // We only need to preserve drawing buffer if we implement printing
  // otherwise it is a performance drawback
  // preserveDrawingBuffer: true
  attributionControl: false
});


function addLayerNav(map) {
  var toggleableLayerIds = [
    'Social Vulnerability - Overall',
    'Socioeconomic Status',
    'Household Composition & Disability',
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
    { ids: ['tract-socio','county-socio'], name: 'Socioeconomic Vulnerability'},
    { ids: ['tract-household','county-household'], name: 'Household Composition and Disability Vulnerability'},
    { ids: ['tract-minority','county-minority'], name: 'Minority Status and Language Vulnerability'},
    { ids: ['tract-household','county-housing'], name: 'Housing and Transportation Vulnerability'},
    { ids: ['county-hazard'], name: 'Overall Disaster Risk'},
    { ids: ['county-hurricane'], name: 'Hurricane Risk'},
    { ids: ['county-flood'], name: 'Flood Risk'},
    { ids: ['county-earthquake'], name: 'Earthquake Risk'},
    { ids: ['county-wildfire'], name: 'Wildfire Risk'},
    { ids: ['county-tornado'], name: 'Tornado Risk'},
    { ids: ['county-hail'], name: 'Hail Risk'},
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
}

//map.addControl(geocoder, 'top-left');

d3.select('#search')
  .node()
  .appendChild(geocoder.onAdd(map));


map.on('load', function() {
  addCustomLayers(map);
  addLayerNav(map);

var lastFIPS=0;
  map.on('mousemove', function (e) {
    var county = map.queryRenderedFeatures(e.point, {
       layers: ['county','county-socio','county-housing','county-household']
    });
    var tract = map.queryRenderedFeatures(e.point, {
      layers: ['tract','tract-socio','tract-household','tract-housing']
    });

    if (county.length > 0 && map.getZoom() < 8.0) {
      map.getSource('highlight').setData({
				"type": "FeatureCollection",
				"features": county
      });
      if (county[0].properties.FIPS !== lastFIPS) {
        // console.log('Select county', county[0].properties.FIPS);
        updateSidebar(county[0].properties);
        lastFIPS = county[0].properties.FIPS;
      }
    }
    else if (tract.length>0 && map.getZoom() >= 8.0) {
      map.getSource('highlight').setData({
				"type": "FeatureCollection",
				"features": tract
      });
      if (tract[0].properties.FIPS !== lastFIPS) {
        // console.log('Select tract', tract[0].properties.FIPS);
        updateSidebar(tract[0].properties);
        lastFIPS = tract[0].properties.FIPS;
      }
    } else {
      map.getCanvas().style.cursor = 'default';
    }
  });
});

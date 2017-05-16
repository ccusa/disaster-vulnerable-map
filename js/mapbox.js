mapboxgl.accessToken = 'pk.eyJ1Ijoicm1jYXJkZXIiLCJhIjoiY2lqM2lwdHdzMDA2MHRwa25sdm44NmU5MyJ9.nQY5yF8l0eYk2jhQ1koy9g';

function addCustomLayers(map) {
  mapSources.forEach(function(source) {
    let id = source[0];
    let obj = source[1];
    map.addSource(id, obj)
  });

  mapLayers.forEach(function(layer) {
    let obj = layer[0];
    let label = layer[1];
    map.addLayer(obj, label);
  });
}

function clearHighlightedAreas() {
  map.getSource('highlight').setData({
    "type": "FeatureCollection",
    "features": []
  });
}

function hideAllLayers() {
  toggleableLayersSocial.forEach(function(layer, i) {
    var link = menusocial.children[i];
    link.className = '';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });
  });
  toggleableLayersHazard.forEach(function(layer, i) {
    var link = menuhazard.children[i];
    link.className = '';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'none');
    });
  });
}

function setOnLinkClickHandler(link, layer) {
  link.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideAllLayers();
    this.className = 'active';
    layer.ids.forEach(function(layerId) {
      map.setLayoutProperty(layerId, 'visibility', 'visible');
    });

    updateLegend(layer.ids[0])

  };
}

function addLayerNav(map) {

  var menusocial = document.getElementById('menusocial');
  var menuhazard = document.getElementById('menuhazard');

  toggleableLayersSocial.forEach(function(layer) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = layer.name;

    setOnLinkClickHandler(link, layer);

    menusocial.appendChild(link);
  });

  toggleableLayersHazard.forEach(function(layer) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = layer.name;

    setOnLinkClickHandler(link, layer);

    menuhazard.appendChild(link);
  });
}

function takeSnapshot(map) {
  newTab = window.open(printLink, 'Image');
  newTab.focus();
}

function updatePrintLink(map) {
  printLink = map.getCanvas().toDataURL("image/png");
}

function loadPrintLink(map) {

  updatePrintLink(map)
  let el = $("#print-link");
  el.text('Print Current View');
  el.css("pointer-events", "all");
  el.css("cursor", "pointer");

  el.click(function() {
    updatePrintLink(map);
    takeSnapshot(map)
  });
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
  preserveDrawingBuffer: true,
  attributionControl: false
});

map.boxZoom.disable();

var popup = new mapboxgl.Popup({
    closeButton: false
});
//map.addControl(geocoder, 'top-left');

d3.select('#search')
  .node()
  .appendChild(geocoder.onAdd(map));

let printLink;
let multipleSelection = false;
map.on('load', function() {

  addCustomLayers(map);
  addLayerNav(map);
  renderHighlightSelector();
  loadPrintLink(map);


map.on('mousemove', function(e) {
  if (multipleSelection) {
    var highlighted = map.queryRenderedFeatures(e.point, { layers:
      ['highlight'] });

    map.getCanvas().style.cursor = (highlighted.length) ? 'pointer' : '';

    if (!highlighted.length) {
        popup.remove();
        return;
    }
    var feature = highlighted[0];

    popup.setLngLat(e.lngLat)
        .setText(feature.properties.Diocese)
        .addTo(map);
  } else {
    var lastFIPS=0;
    var county = map.queryRenderedFeatures(e.point, {
       layers: ['county','county-socio','county-housing','county-household','county-minority',
              'county-hazard','county-hurricane','county-flood', 'county-earthquake','county-wildfire',
              'county-tornado','county-hail']
    });
    var tract = map.queryRenderedFeatures(e.point, {
      layers: ['tract','tract-socio','tract-household','tract-housing','tract-minority']
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
  }

});

});

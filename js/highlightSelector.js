
function renderHighlightSelector() {

  var canvas = map.getCanvasContainer();
  var start;
  var current;
  var box;

  canvas.addEventListener('mousedown', mouseDown, true);

  function mousePos(e) {
      var rect = canvas.getBoundingClientRect();
      return new mapboxgl.Point(
          e.clientX - rect.left - canvas.clientLeft,
          e.clientY - rect.top - canvas.clientTop
      );
  }

  function mouseDown(e) {
      if (!(e.shiftKey && e.button === 0)) {
        multipleSelection = false;
        return;
      }

      map.dragPan.disable();

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('keydown', onKeyDown);

      start = mousePos(e);
  }

  function onMouseMove(e) {
      current = mousePos(e);

      if (!box) {
          box = document.createElement('div');
          box.classList.add('boxdraw');
          canvas.appendChild(box);
      }

      var minX = Math.min(start.x, current.x),
          maxX = Math.max(start.x, current.x),
          minY = Math.min(start.y, current.y),
          maxY = Math.max(start.y, current.y);

      var pos = 'translate(' + minX + 'px,' + minY + 'px)';
      box.style.transform = pos;
      box.style.WebkitTransform = pos;
      box.style.width = maxX - minX + 'px';
      box.style.height = maxY - minY + 'px';
  }

  function onMouseUp(e) {
      finish([start, mousePos(e)]);
  }

  function onKeyDown(e) {
      if (e.keyCode === 27) finish();
  }

  function finish(bbox) {
    multipleSelection = true;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mouseup', onMouseUp);

      if (box) {
          box.parentNode.removeChild(box);
          box = null;
      }

      if (bbox) {
        var features = map.queryRenderedFeatures(bbox, {
          layers: ['county','county-socio','county-housing','county-household','county-minority',
                 'county-hazard','county-hurricane','county-flood', 'county-earthquake','county-wildfire',
                 'county-tornado','county-hail']
        });

          if (features.length >= 1000) {
              return window.alert('Select a smaller number of features');
          }

          map.getSource('highlight').setData({
            "type": "FeatureCollection",
            "features": features
          });
          updateSidebarWithHighlighted(features)

      }

      map.dragPan.enable();
  }
}

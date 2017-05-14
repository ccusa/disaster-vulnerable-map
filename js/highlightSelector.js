
function renderHighlightSelector() {

  const canvas = map.getCanvasContainer();
  let start;
  let current;
  let box;

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
        start = mousePos(e);
        document.addEventListener('mouseup', onMouseUpNoShift);
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

      const minX = Math.min(start.x, current.x),
          maxX = Math.max(start.x, current.x),
          minY = Math.min(start.y, current.y),
          maxY = Math.max(start.y, current.y);

      const pos = 'translate(' + minX + 'px,' + minY + 'px)';
      box.style.transform = pos;
      box.style.WebkitTransform = pos;
      box.style.width = maxX - minX + 'px';
      box.style.height = maxY - minY + 'px';
  }

  function onMouseUp(e) {
      finish([start, mousePos(e)]);
  }

  function onMouseUpNoShift(e) {
    if (mousePos(e).equals(start)) {
      multipleSelection = false;
      clearHighlightedAreas();
    }
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

          map.getSource('highlight').setData({
            "type": "FeatureCollection",
            "features": features
          });
          updateSidebarWithHighlighted(features)

      }

      map.dragPan.enable();
  }
}

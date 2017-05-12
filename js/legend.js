
    console.log( "TODO!" );
    function updateLegend(id) {
      layers.forEach(function(layer) {
        if (layer[0].id === id) {
          $('.legend-block').remove()

          layer[0].paint['fill-color'].stops.forEach(function(stop, idx) {
            console.log(stop)
            let number = stop[0];
            let color = stop[1];

            if (idx === stop.length - 1) {
              number = stop[0] + 1
            }
            let div = "<div class='legend-block'><span class='legend-key' style='background-color': "
                + color + ";> </span><span class='legend-number'>"+number+
                "</span></div>"

            $('#legend').append(div)

          })
        }
      })
    }

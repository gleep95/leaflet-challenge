let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(data => {
	let earthquakes = L.geoJSON(data.features, {
		onEachFeature: onEachFeature, 
		pointToLayer: function(features, coordinates) {
			let geoMarkers = {
				radius: features.properties.mag * 4,
				fillColor: getColor(features.properties.sig),
				fillOpacity: 1,
				weight: 1
			};
			return L.circleMarker(coordinates, geoMarkers);
		} 
	});
	function onEachFeature(feature, layer) {
		layer.bindPopup(`<p>${feature.properties.place}</p><p>Magnitude: ${feature.properties.mag}</p><p>Significance: ${feature.properties.sig}</p>`);
	};

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let earthquakeMap = L.map("map", {
        center: [38.88, -94.81],
        zoom: 5,
        layers: [street, earthquakes]
    });

});

function getColor(val) {
    if (val > 900) return color = "#FF0000";
    if (val > 700) return color = "#FFA500";
    if (val > 500) return color = "#F38701";
    if (val > 300) return color = "#FFC300";
    if (val > 100) return color = "#9ACD32";
    return color = "#3BB143"

};

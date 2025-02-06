// Initialisation de la carte avec Leaflet.Editable activé
var map = L.map('map', {
    editable: true // Active l'édition
}).setView([48.8566, 2.3522], 13); // Centré sur Paris

//Localisation
map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

// Ajouter une couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
}).addTo(map);

// Ajouter un marqueur éditable
var marker = L.marker([48.8566, 2.3522], {editable: true}).addTo(map);
marker.enableEdit();

// Ajouter une ligne éditable (clic pour commencer à dessiner)
var polyline;
map.on('click', function () {
    if (!polyline) {
        polyline = map.editTools.startPolyline();
    }
});

// Ajouter un polygone éditable
var polygon;
document.addEventListener("keydown", function (event) {
    if (event.key === "p") { // Appuyer sur "P" pour commencer un polygone
        polygon = map.editTools.startPolygon();
    }
});

// Supprimer un objet en cliquant dessus
map.on('click', function (e) {
    var layer = e.layer;
    if (layer && layer.editEnabled()) {
        map.removeLayer(layer);
    }
});
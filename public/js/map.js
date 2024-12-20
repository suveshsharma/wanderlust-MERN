mapboxgl.accessToken = mapToken; // Set your Mapbox access token
const map = new mapboxgl.Map({
    container: 'map', // container ID for the map
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom level
});

// Add a marker to the map
const marker = new mapboxgl.Marker({ color: "red" }) // Marker color
    .setLngLat(listing.geometry.coordinates) // Marker position [lng, lat]
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // Popup offset
            .setHTML(`<h4>${listing.title}</h4><p>${listing.location}</p>`) // Popup content
    )
    .addTo(map); // Add marker to map



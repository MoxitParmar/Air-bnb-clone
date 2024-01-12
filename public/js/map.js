mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

console.log(listing.geometry.coordinates);
// Create a default Marker and add it to the map.
// const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25, })
    
    .setHTML(`<h4>${listing.title}</h4><P>Exact location will be provided after booking</P>`))
.addTo(map);
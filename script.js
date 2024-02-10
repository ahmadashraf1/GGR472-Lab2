mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYWRhc2hyYWYxNTQiLCJhIjoiY2xyaTYzNXlsMDM0eDJpcnhtY3lnb2QzdCJ9.PUhrzYu0LU7a6_Up5_Q-eA'; //Add default public map token from your Mapbox account

/// Creating map
const map = new mapboxgl.Map({
container: 'my-map', /// map container ID
style: 'mapbox://styles/ahmadashraf154/clsg2244503fc01qq3sngbyp4', /// style URL
center: [-79.3923,43.6643], /// starting position [lng, lat]
zoom: 14.3, /// starting zoom
});

map.on('load', () => {

    /// Adding a data source containing GeoJSON data
    /// UofT Buildings
    map.addSource('uoft-data', { 
        type: 'geojson',
        data: {
            "type": "FeatureCollection", 
            "features": [
                {
                    "type": "Feature", 
                    "properties": {
                        "name": "Sidney Smith Hall"  /// Adding first point
                    },
                    "geometry": { 
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point" 
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Bahen Centre"  /// Adding second point
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39719782063901,
                            43.65973464298267
                        ],
                        "type": "Point"
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Medical Sciences" /// Adding third point
                    },
                    "geometry": {
                        "coordinates": [
                            -79.3934954860864,
                            43.660714013012154
                        ],
                        "type": "Point"
                    }
                } 
            ]
        } 
    });

    map.addLayer({
        'id': 'uoft-pnt', 
        'type': 'circle', 
        'source': 'uoft-data', 
        'paint': {
            'circle-radius': 6,
            'circle-color': '#B42222' 
        }
    });

    /// Adding a data source from a GeoJSON file
    /// UofT Sports Facilities
    map.addSource('sports-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/ahmadashraf1/GGR472-Lab2/main/sports.geojson' /// URL to sports.geojson file
    });

    map.addLayer({
        'id': 'sports-point',
        'type': 'circle',
        'source': 'sports-data',
        'paint': {
            'circle-radius': 6,
            'circle-color': '#AB65F8' }
    });

    
    /// Open a popup when a feature in UofT Buildings layer is clicked, with the name of the building.
    map.on('click', 'uoft-pnt', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice(); /// get coordinates
        const name = e.features[0].properties.name; /// get building name

        new mapboxgl.Popup() /// creating popup
            .setLngLat(coordinates) /// setting coordinates
            .setHTML('<p>' + "Building Name: " + name + '</p>') /// adding HTML
            .addTo(map);
    });

    /// Open a popup when a feature in UofT Sports Facilities layer is clicked, with the name of the building.
    map.on('click', 'sports-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice(); /// get coordinates
        const name = e.features[0].properties.buildingname; /// get building name

        new mapboxgl.Popup() /// creating popup
            .setLngLat(coordinates) /// setting coordinates
            .setHTML('<p>' + "Building Name: " + name + '</p>') /// adding HTML
            .addTo(map);
    });

    document.getElementById('state-legend'); /// adding legend and title
    document.getElementById('title').innerHTML = "University of Toronto - St. George Map"

});
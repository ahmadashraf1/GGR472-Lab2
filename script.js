mapboxgl.accessToken = 'pk.eyJ1IjoiYWhtYWRhc2hyYWYxNTQiLCJhIjoiY2xyaTYzNXlsMDM0eDJpcnhtY3lnb2QzdCJ9.PUhrzYu0LU7a6_Up5_Q-eA'; //Add default public map token from your Mapbox account

const map = new mapboxgl.Map({
container: 'my-map', // map container ID
style: 'mapbox://styles/ahmadashraf154/clsg2244503fc01qq3sngbyp4', // style URL
center: [-79.3923,43.6643], // starting position [lng, lat]
zoom: 14.3, // starting zoom
});

map.on('load', () => {

    //Add a data source containing GeoJSON data
    map.addSource('uoft-data', { 
        type: 'geojson',
        data: {
            "type": "FeatureCollection", 
            "features": [
                {
                    "type": "Feature", 
                    "properties": {
                        "name": "Sidney Smith Hall" 
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
                        "name": "Bahen Centre"
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
                        "name": "Medical Sciences Building"
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

});
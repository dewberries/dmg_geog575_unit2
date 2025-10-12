/* Map of GeoJSON data from MegaCities.geojson */
//declare map var in global scope
var map;
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [38, -97],
        zoom: 5
    
    });

    //add tile layer...replace project id and accessToken with your own
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'dmgibbs/cm94wd6kw007601qtbeowhwhh',
        accessToken: 'pk.eyJ1IjoiZG1naWJicyIsImEiOiJjbTdlN2hxejMwYXBsMmtvZ25vcXAwY3g4In0.XBq_6BSCkFxo84-pCx_17w'
    }).addTo(map);

    //call getData function
    getData();
};

function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

function getData(){
    //load the data
    fetch("data/natparks.geojson")
        .then(function(response){
            return response.json();
        })
    .then(function(json){            
            //create marker options
            var geojsonMarkerOptions = {
                radius: 5,
                fillColor: "#fdda65ff",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            };

            L.geoJson(json, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                onEachFeature: onEachFeature
            }).addTo(map);
        
        })  
};

document.addEventListener('DOMContentLoaded',createMap)
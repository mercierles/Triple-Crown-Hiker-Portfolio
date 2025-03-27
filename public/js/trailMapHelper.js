import WebMap from "https://js.arcgis.com/4.27/@arcgis/core/WebMap.js";
import MapView from "https://js.arcgis.com/4.27/@arcgis/core/views/MapView.js";
import config from "https://js.arcgis.com/4.27/@arcgis/core/config.js";

export function createArcGISMap(lat,long){	
    config.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurPX-I8luMhXCagz7mA1X4RL-QrhBXyBdFDwT3bjNCSxR7wTczA8BWTKzFFiuPh8gNgYI5-v_dh1KGQUCYdqziE0VtCb_3KQNMVpDOrw7Sh7Km1VbC_RJNOInXj-yqgevyEDrgyyhbqgVjG2BC_wfMKCOXUx_SqVlNdQ7ZOz9ZxY3EUTMS0DaMh7gZAH_K38tGw..AT1_z3tjWsJo";
    $.ajax({
        type: "GET",
        url: "/arcGIS",
        success: function(response){
            // Populate 
            let jsonResponse = JSON.parse(response);
            if(jsonResponse){
                console.log("found arcGIS information");
                const webmapJson = jsonResponse;
                // console.log(response);
                const webMap = new WebMap({
                    portalItem: {
                        id: "39728eb580ea4d2e84c01a82b6247a50"  // Ensure this is a valid public WebMap ID
                      }

                });
                console.log(webMap);
                const view = new MapView({
                    container: "arcgisContainer", // HTML element where the map will be displayed
                    map: webMap,
                    center: [long, lat],
                    zoom:8
                });
                console.log(view)
            }else{
                console.log("Unable to retrieve gis map - object empty");
                $('#arcgisContainer').append('<H1>arcGIS map unavailable</H1>');
            }
        },
        error: function(response){
            console.log("Unable to retrieve gis map");
            $('#arcgisContainer').append('<H1>arcGIS map unavailable</H1>');
        }
    });
}
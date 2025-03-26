import WebMap from "https://js.arcgis.com/4.27/@arcgis/core/WebMap.js";
import MapView from "https://js.arcgis.com/4.27/@arcgis/core/views/MapView.js";
import config from "https://js.arcgis.com/4.27/@arcgis/core/config.js";

export function createArcGISMap(){	
    config.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurPX-I8luMhXCagz7mA1X4RKyunTvYsFLSUOzJ8Z0t4ClWLjq0Yrsn6BNkGfcG8dS53efnt8gA7cbAvmt3CPRb541hXfyohLrvdjSYToY0oHS-ya2320cmeMU-8tM9eq2RipFdLpRV-73RAjktI0HdCrUTXoGAttmBXsI1PyKQAZgFAHwCoQQtbhAw2QiSPFl-A..AT1_z3tjWsJo";
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
                        id: "6762840fe8b540e6811caf64d76474be"  // Ensure this is a valid public WebMap ID
                      }

                });
                const view = new MapView({
                    container: "arcgisContainer", // HTML element where the map will be displayed
                    map: webMap
                });
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
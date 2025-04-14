import {sessionHelper} from './session-helper.js';
export function createArcGISMap(lat,long, portalID){	
    import("@arcgis/core/config.js").then(({default: config})=>config.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurPX-I8luMhXCagz7mA1X4RIyF6wNVOg0NMT4VzoRTVWrZPTPmtJmTelgigngn6--Ve5-YLUsUejMZTGL6ybE8vs5tNmWjw52LbJJigSoElgyEQTbOLCOxLx7lu3akzz4BuCrPix_Uhx5WQiWStEcfQwbRv-T8KqYttYGcPr-QR0Z1uVNXFqGxfo30VGkF6YBWA..AT1_z3tjWsJo");
    let webMap = null;
    let view = null;
    import("@arcgis/core/WebMap.js").then(
        ({default: WebMap})=>{webMap = new WebMap({
            portalItem: {
                id: portalID // Ensure this is a valid public WebMap ID
            }
        })
    }).then(
        import("@arcgis/core/views/MapView.js").then(
            ({default: MapView})=> {view = new MapView(
                {container: "arcgis-container", // HTML element where the map will be displayed
                map: webMap,
                center: [long, lat],
                zoom:8
                }
            )})
        );
    // $.ajax({
    //     type: "GET",
    //     url: "/arcGIS",
    //     success: function(response){
    //         // Populate 
    //         let jsonResponse = JSON.parse(response);
    //         if(jsonResponse){
    //             console.log("found arcGIS information");
    //             const webmapJson = jsonResponse;
    //             console.log(webmapJson)
    //         }else{
    //             console.log("Unable to retrieve gis map - object empty");
    //             $('#arcgis-container').append('<H1>arcGIS map unavailable</H1>');
    //         }
    //     },
    //     error: function(response){
    //         console.log("Unable to retrieve gis map");
    //         $('#arcgis-container').append('<H1>arcGIS map unavailable</H1>');
    //     }
    // });
}
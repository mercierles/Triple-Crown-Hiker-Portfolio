// import WebMap from "https://js.arcgis.com/4.27/@arcgis/core/WebMap.js";
// import MapView from "https://js.arcgis.com/4.27/@arcgis/core/views/MapView.js";

var currentMileMarker = Math.abs((new Date("2022-04-26") - new Date))/day * 15;
var instagramCaptions = [];
// Initialize
function instaInit(callback){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	let igData = sessionHelper.getItem("instagramData_"+x.trailShortName);
	if(!igData){
		getInstagramData(callback);
	}else{
		popuplateInstragramData(igData,callback);
	}
}

// Get Instagram Data via call to Node Route to Query Instagram API
function getInstagramData(callback){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	$.ajax({
		type: "GET",
		url: "/trail/instagramData",
		data:{
			startDate:x.trailStartDate,
			endDate:x.trailLastPostDate
		},
		beforeSend: function() {
			jQuery("#instagram .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#instagram .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			// Populate 
			let jsonResponse = JSON.parse(response);
			// let token = jsonResponse['arcGISToken'];
			// var esriConfig = {
			// 	apiKey: token
			// };
			if(jsonResponse){
				sessionHelper.setItem("instagramData_"+x.trailShortName,jsonResponse)
				popuplateInstragramData(jsonResponse,callback);
			}else{
				jQuery("#instagram-carousel").hide();
				console.log("Unable to retrieve Instagram Data");
			}
		},
		error: function(response){
			jQuery("#instagram-carousel").hide();
			console.log("Unable to retrieve Instagram Data");
		}
	});
}

// Populate results, callback to run next function if available
function popuplateInstragramData(igData,callback){
	// instagramCaptions = [];
	if(igData['image'].length > 0){
		$('.carousel-inner').append('<div class="carousel-item active"><img class="section-instagram-post__img" src="'+igData["image"][0]['url']+'"><input class="instagramCaption" type="hidden" value="'+igData["image"][0]['caption']+'" /></div>');
		igData['image'].forEach(function(value,index){
			if(index!=0){
				// instagramCaptions.push(value['caption']);
				$('.carousel-inner').append('<div class="carousel-item"><img class="section-instagram-post__img" src="'+value['url']+'"><input class="instagramCaption" type="hidden" value="'+encodeURI(value['caption'].toString())+'" /></div>');
			}
			if(index === igData['image'].length-1){
				// see pct php/js file for children version of code
				callback();
			}
		});
		callback();
	}else{
		$('.carousel-inner').append('<H1>No Images Posted Yet.. Stay Tuned!</H1>');
	}
}

function createArcGISMap(){
	/************************************************************
 * Creates a new WebMap instance. A WebMap must reference
 * a PortalItem ID that represents a WebMap saved to
 * arcgis.com or an on-premise portal.
 ************************************************************/

// const webmap = new WebMap({
// 	portalItem: {
// 	  id: "e691172598f04ea8881cd2a4adaa45ba"
// 	}
//   });
  
  $.ajax({
	type: "GET",
	url: "/arcGIS",
	success: function(jsonResponse){
		// Populate 
		// let jsonResponse = JSON.parse(response);
		if(jsonResponse){
			const WebMap = require('https://js.arcgis.com/4.27/@arcgis/core/WebMap.js');
			const MapView = require('https://js.arcgis.com/4.27/@arcgis/core/views/MapView.js');
            const webmapJson = jsonResponse;

            // Create and display the WebMap using ArcGIS API for JavaScript
            const webMap = new WebMap({
                portalItem: {
                    id: webmapId // Use the WebMap ID to reference the map
                }
            });

            const view = new MapView({
                container: "arcgisContainer", // HTML element where the map will be displayed
                map: webMap
            });

			console.log(jsonResponse);
		}else{
			jQuery("#instagram-carousel").hide();
			console.log("Unable to retrieve Data");
		}
	},
	error: function(response){
		console.log("Unable to retrieve  Data");
	}
  });
  /************************************************************
   * Set the WebMap instance to the map property in a MapView.
   ************************************************************/
//   const view = new MapView({
// 	map: webmap,
// 	container: "arcgisContainer"
//   });
}

function consoleLog(){
	console.log("jquery from instagram.js");
}
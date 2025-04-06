import {sessionHelper, DAY} from './session-helper.js';
var currentMileMarker = Math.abs((new Date("2022-04-26") - new Date))/DAY * 15;
var instagramCaptions = [];
// Initialize
export function instaInit(callback){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	let igData = sessionHelper.getItem("instagramData_"+x.trailShortName);
	if(!igData){
		getInstagramData(callback);
	}else{
		populateInstragramData(igData,callback);
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
			if(jsonResponse){
				sessionHelper.setItem("instagramData_"+x.trailShortName,jsonResponse)
				populateInstragramData(jsonResponse,callback);
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
function populateInstragramData(igData,callback,assetLoadLimit=5){
	if(sessionHelper.GetInternetQuality() > 8){assetLoadLimit=20;}
	console.log("Loading "+ assetLoadLimit +" instagram photos");
	if(igData['image'].length > 0){
		$('.carousel-inner').append('<div class="carousel-item active"><img class="section-instagram-post__img" src="'+igData["image"][0]['url']+'"><input class="instagramCaption" type="hidden" value="'+igData["image"][0]['caption']+'" /></div>');
		
		let imgList = igData['image'].slice(0, assetLoadLimit);
		imgList.forEach(function(value,index){
			if(index!=0){
				$('.carousel-inner').append('<div class="carousel-item"><img class="section-instagram-post__img" src="'+value['url']+'"><input class="instagramCaption" type="hidden" value="'+encodeURI(value['caption'].toString())+'" /></div>');
			}
			if(index === imgList.length-1){
				callback();
			}
		});
		callback();
	}else{
		$('.carousel-inner').append('<H1>No Images Posted Yet.. Stay Tuned!</H1>');
	}
}


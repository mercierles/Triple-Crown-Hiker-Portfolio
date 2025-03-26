var currentMileMarker = Math.abs((new Date("2022-04-26") - new Date))/day * 15;
var instagramCaptions = [];
// Initialize
export function instaInit(callback){
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


import {sessionHelper} from './session-helper.js';
// Initialize LighterPack Data
export function lighterPackInit(url){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	
	var lighterPackSelectList = jQuery("#lighter-pack-url option");
	if (lighterPackSelectList.length == 0 || !jQuery("#lighter-pack-url option").hasClass(x.trailShortName)) {
		var lpKeys = Object.keys(x.trailLighterPack);
		lighterPackSelectList.remove();
		if(!url || url === ""){url = x.trailLighterPack[lpKeys[0]]}
		lpKeys.forEach(function(key){jQuery("#lighter-pack-url").append("<option class="+x.trailShortName+" value="+x.trailLighterPack[key]+">"+key+"</option>")});
	
	}
	console.log();
	let itemID = "lighterPackData_"+url;
    let localstorageData = sessionHelper.getItem(itemID);
    if(!localstorageData){
        getLighterPackData(url);
    }else{
        popuplateLighterPackData(localstorageData);
    }
}

// Get LighterPack Data via PHP cURL Request
function getLighterPackData(lpURL){
	$.ajax({
		type: "GET",
		url: "/trail/lighterPackData",
		data:{
			lighterpackurl:lpURL
		},
		beforeSend: function() {
			jQuery("#lighterPack .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#lighterPack .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			if(response){
				sessionHelper.setItem("lighterPackData_"+lpURL,response);
				popuplateLighterPackData(response);
			}else{
				response = 'Unable to retrieve LighterPack Data';
			  	console.log(response);
			}
			// popuplateLighterPackData(response);
		},
		error: function(response){
			// let errorResponse = 'Unable to retrieve LighterPack Data';
			console.log(response.statusText);
			popuplateLighterPackData(response.statusText);
		}
	});
}

// Populate Results
function popuplateLighterPackData(data){
	data = data.split("</title>");
	jQuery("#lighter-pack-title")[0].innerText = data[0].split("<title>")[1].toString().replace("&#39;","'");
	jQuery("#lighter-pack-data").append(data[1]);
    jQuery(".lpUnitDropdown, i, select.lpUnit, .lpWeightCell, .lpQtyCell, .lpActionsCell").remove();
	sessionHelper.addReadMore("lighter-pack", "lighter-pack-data");
}
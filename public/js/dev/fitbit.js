import {sessionHelper, DAY} from './session-helper.js';

const activityType_Array = ['steps','elevation','floors','calories'];
const unitType_kvp = {steps:"steps",elevation:"feet", floors:"floors", calories:"calories"};

// Initialize
export function fitbitInit(trail){
    // Poplate data from each activity
	// getFitbitBearerToken();
    activityType_Array.forEach(function(value){
        let localstorageData = sessionHelper.getItem("fitbitData_"+trail+value);
        if(!localstorageData){
            getFitbitData(value,trail);
        }else{
        	popuplateFitbitData(value,localstorageData);
        }
    });
}

// If there is an error, populate with data from localstorage if available
function getFitbitData(activityType, trail){
	let date = new Date();
	date = new Date(date - (5*DAY));
	$.ajax({
		type: "GET",
        data: {
			trail: trail,
            action: activityType,
			date: date.toISOString().split("T")[0]
        },
		url: "/trail/fitbitData",
		beforeSend: function() {
			jQuery("#fitbit .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#fitbit .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			// Populate 
			let jsonResponse = JSON.parse(response);
			if(jsonResponse || jsonResponse == 0){
				sessionHelper.setItem("fitbitData_"+trail+activityType,jsonResponse);
				popuplateFitbitData(activityType,jsonResponse);
			}else{
				console.log("Unable to retrieve Fitbit Data: "  + response);
			}
		},
		error: function(response){
			console.log("Unable to retrieve Fitbit Data: " + response);
		}
	});
}

// Populate Results
function popuplateFitbitData(activityType, data){
	jQuery("#fitbit-data").append('<div class="col-6 mb-5"><h5>Average '+activityType+' Per Day:</h5><span id="'+activityType+'">'+Math.round(data)+' '+ unitType_kvp[activityType]+'</span></div>');
	jQuery("#fitbit .section__show-more").remove();
	sessionHelper.addReadMore("fitbit", "fitbit-data");
}
// Calculate Time
export const MINUTE = 1000 * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
export const YEAR = DAY * 365;
export const SESSIONEXPIRETIME = YEAR;

// Create Namespace for these Global variable
export var sessionHelper = {};
sessionHelper.getItem = function(storageKey){
    let storageValue = localStorage.getItem(storageKey);
	if(storageValue){
        let temp = JSON.parse(storageValue);
        let oldDate = Math.round(new Date(temp.key).getTime());
        let newDate = Math.round(new Date().getTime());  
        if ((newDate-oldDate) < SESSIONEXPIRETIME) {
            return temp.value;
        }
    }
    return null;
}

sessionHelper.setItem = function(storageKey,storageValue){
    let dataObject = {key:new Date(),value:storageValue};
    localStorage.setItem(storageKey,JSON.stringify(dataObject));
}

sessionHelper.addReadMore = function(id, section){
	// Check Size of Post and show/hide read more button
	jQuery("#"+id).append("<div class='row mt-3 section__show-more'><div class='col-12 section__show-more-button' style='display: none;'>Read More...</div></div>")
	$("#"+id+" .section__show-more-button").on("click", function(){
		jQuery("#"+id+" .section__overflow").toggleClass("section__overflow-hidden");		
		if(jQuery("#"+id+" .section__overflow.section__overflow-hidden").length == 1){
			jQuery(this)[0].innerText = "Read More...";
		}else{
			jQuery(this)[0].innerText = "Read Less...";
		}
	});
	
	var windowHeight = $(window).height() * .73;
	if (Math.round(jQuery("#"+section).height()) < Math.round(windowHeight)) {
		jQuery("#"+id+" .section__show-more-button").hide();
	}else{
		jQuery("#"+id+" .section__show-more-button").show();
		if(jQuery("#"+id+" .section__overflow.section__overflow-hidden").length == 1){
			jQuery("#"+id+" .section__show-more-button")[0].innerText = "Read More...";
		}else{
			jQuery("#"+id+" .section__show-more-button")[0].innerText = "Read Less...";
		}
	}
}

sessionHelper.GetInternetQuality = function(){
	// let internetQuality = this.getItem("INTERNET");
	let internetQuality = 0;
	if(!internetQuality){
		if(navigator && navigator.connection){
			internetQuality = navigator.connection.downlink;
		}
	}
	// this.setItem("INTERNET",internetQuality.toString());
	return internetQuality;
}
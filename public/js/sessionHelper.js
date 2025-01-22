// Calculate Time
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
const sessionExpireTime = day;

// Create Namespace for these Global variable
var sessionHelper = {};
sessionHelper.getItem = function(storageKey){
    let storageValue = localStorage.getItem(storageKey);
	if(storageValue){
        let temp = JSON.parse(storageValue);
        let oldDate = Math.round(new Date(temp.key).getTime());
        let newDate = Math.round(new Date().getTime());  
        if ((newDate-oldDate) < sessionExpireTime) {
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
	
	var windowHeight = $(window).height() * .7;
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
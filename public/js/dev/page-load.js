import {sessionHelper} from './session-helper.js';
//Scroll to top before page unloads
window.onbeforeunload = function () {
    window.scrollTo({top: 0});
}

//Use high quality images if internet is fastenough
$(document).ready(function(){
    let trailShortName = jQuery("#trailID")[0].value;
    let internetQuality = sessionHelper.GetInternetQuality();
    if(internetQuality > 8){
        console.log('Internet Quality: ' + internetQuality + ' loading HiRES');
        jQuery("#spotlightImage").css("background-image","url(../public/images/hiRes/"+trailShortName+"/background_1.jpg)");
    }else if(internetQuality > 2){
        console.log('Internet Quality: ' + internetQuality + ' loading MedRES');
        jQuery("#spotlightImage").css("background-image","url(../public/images/medRes/"+trailShortName+"/background_1.jpg)");
        
    }else{
        console.log('Internet Quality: ' + internetQuality + ' loading LowRES');
        jQuery("#spotlightImage").css("background-image","url(../public/images/lowRes/"+trailShortName+"/background_1.jpg)");
    }

    // Start the Spotlight Logo Animation
    setTimeout(function(){
        jQuery("#animate_path_1")[0].beginElement();
    },1000);
});
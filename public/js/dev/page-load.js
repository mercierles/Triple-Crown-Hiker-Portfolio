import {sessionHelper} from './session-helper.js';


//Use high quality images if internet is fastenough
$(document).ready(function(){
    //Scroll to top of page
    // window.scrollTo({
    //     top: 0,
    //     behavior: "instant",
    //   });

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
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    if (isReduced) {
        // DON'T use an amination here!
        console.log("Skipping animation because of reduced motion preference");
        jQuery('animate').attr("dur",'0.001s');
        jQuery('animate').attr("begin",'0.001s');
    }
    setTimeout(function(){
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
        jQuery("#animate_path_1")[0].beginElement();
    },1000);

    document.querySelector('#Background animate').addEventListener('endEvent', function() {
        console.log('Animation finished');
        jQuery("html").removeClass("no-scroll");
    }, false);

    // $.ajax({
    //     type: "GET",
    //     url: "/trail/testData",
    //     success: function(response){
    //         // Populate 
    //         // let jsonResponse = JSON.parse(response);
    //         if(response || response == 0){
    //             let atData = [];
    //             response['semanticSegments'].forEach(function(segment){
    //                 let segmentStartTime= Date.parse(segment["startTime"].split("T")[0]);
    //                 let segmentEndTime= Date.parse(segment['endTime'].split("T")[0]);
    //                 let st = Date.parse("2022-04-26");
    //                 let et = Date.parse("2022-10-05");
    //                 if(segmentStartTime > st &&  segmentEndTime < et){
    //                     if(segment['timelinePath'] != null){
    //                         segment['timelinePath'].forEach(function(point){
    //                         //    atData.push({"startTime":segment["startTime"],"coord":point['point']});
    //                            atData.push(point['point']);
    //                         });
    //                     }else if(segment['activity'] != null){
    //                         // atData.push({"startTime":segment["startTime"],"coord":segment['activity']['start']['latLng']});
    //                         atData.push(segment['activity']['start']['latLng']);
    //                     }else if(segment['visit'] != null){
    //                         // atData.push({"startTime":segment["startTime"],"coord":segment['visit']['topCandidate']['placeLocation']['latLng']});
    //                         atData.push(segment['visit']['topCandidate']['placeLocation']['latLng']);
    //                     }
    //                 }
    //             });
    //             onsole.log(atData);
    //         }else{
    //             console.log("Unable to retrieve Test Data: "  + response);
    //         }
    //     },
    //     error: function(response){
    //         console.log("Unable to retrieve Test Data: " + response);
    //     }
    // });

});
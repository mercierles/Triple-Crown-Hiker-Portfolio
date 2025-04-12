// import {path} from 'path';
import {instaInit} from './instagram.js';
import {fitbitInit} from './fitbit.js';
import {lighterPackInit} from './lighter-pack.js';
import {blogInit} from './blog.js';
import {createArcGISMap} from './trail-map-helper.js';
import {sessionHelper} from './session-helper.js';

// Setup IntersectionObserver for Lazy Loading
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
    let jsonData = JSON.parse(sessionStorage.getItem("trailData"));
     entries.forEach(entry => {
        if(entry.isIntersecting){
            // Load html instead of setting innerHTML (to prevent cross script attacks)
            jQuery(entry.target).load("../views/"+entry.target.id+".ejs", function(){
                if(entry.target.id === "instagram"){
                    var trailShortName = jsonData.trailShortName.toLowerCase();
                    jQuery("#svg-place-holder").load("../views/includes/trail/"+trailShortName+"/trail-map.ejs",()=>{
                        instaInit(function(){
                            $('.section-instagram-caption')[0].innerText = decodeURI(jQuery(".carousel-item.active > .instagramCaption")[0].value);
                            if(jQuery(".carousel-item.active > .instagramCaption").length > 0){
                                $("#instagram-carousel").on('slid.bs.carousel', function (){
                                    $('.section-instagram-caption')[0].innerText =  decodeURI(jQuery(".carousel-item.active > .instagramCaption")[0].value);
                                });
                            }
                        });
                    });
                }else if(entry.target.id === "fitbit"){
                    fitbitInit(jsonData.trailShortName);
                }else if(entry.target.id === "lighter-pack"){
                    jQuery("#lighter-pack-url").change(function(){
                        jQuery("#lighter-pack-data").empty();
                        jQuery("#lighter-pack .section__show-more").remove();
                        lighterPackInit(this.value);
                    });
                    lighterPackInit("");
                }else if(entry.target.id === "blog"){
                    blogInit();
                }else if(entry.target.id === "trail-info"){
                    //Update section with current info
                    jQuery(".section-trail__paragraph")[0].innerText = jsonData.trailDescription;
                    jQuery(".section-trail__img")[0].src = jsonData.trailInfoImage;
                }else if(entry.target.id === "about"){
                    let internetQuality = sessionHelper.GetInternetQuality();
                    if(internetQuality > 8){
                        console.log('Internet Quality: ' + internetQuality + ' loading HiRES');
                        jQuery("#profile_img").attr('src', "../public/images/hiRes/profile.jpg");
                    }else if(internetQuality > 2){
                        console.log('Internet Quality: ' + internetQuality + ' loading MedRES');
                        jQuery("#profile_img").attr('src', "../public/images/medRes/profile.jpg");
                    }
                    sessionHelper.addReadMore("about", "about-data");
                }else if(entry.target.id === "map"){
                    // Todo Setup ArcGIS Map
                    createArcGISMap(jsonData.lat,jsonData.long, jsonData.portalID);
                }

                entry.target.classList.toggle("section__show", entry.isIntersecting);
                observer.unobserve(entry.target);

            });            
        }
    });
},{rootMargin: '40%'});

sections.forEach(section => {observer.observe(section)}); 


function addReadMore(){
    // Haven't resized in 100ms!
    // console.log("Resize");
    jQuery("section .section__overflow").each(function(index, item){
        let id = jQuery(this).parent()[0].id;
        let section = jQuery(this)[0].firstElementChild.id;
        // console.log(id);
        // console.log(section);
        jQuery("#"+id+" .section__show-more").remove();
        sessionHelper.addReadMore(id, section);
        // console.log(item);
    });
}

var timeout;
window.onresize = function(){
  clearTimeout(timeout);
  timeout = setTimeout(addReadMore, 500);
};
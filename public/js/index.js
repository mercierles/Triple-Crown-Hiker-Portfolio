// //Use high quality images if internet is fastenough
// $(document).ready(function(){
//     var internetQuality = 0;
//     let trailShortName = jQuery("#trailID")[0].value;
//     if(navigator){internetQuality = navigator.connection.downlink;}
//     if(internetQuality > 4){
//        jQuery("#spotlightImage").css("background-image","url(../public/images/hiRes/"+trailShortName+"/background_1.jpg)");
//     }else if(internetQuality > 2){
//        jQuery("#spotlightImage").css("background-image","url(../public/images/medRes/"+trailShortName+"/background_1.jpg)");
//     }else{
//         jQuery("#spotlightImage").css("background-image","url(../public/images/lowRes/"+trailShortName+"/background_1.jpg)");
//     }
// });

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
                    jQuery("#svgPlaceHolder").load("../views/includes/trail/"+trailShortName+"/trailMap.ejs",()=>{
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
                }else if(entry.target.id === "lighterPack"){
                    lighterPackInit();
                }else if(entry.target.id === "blog"){
                    blogInit();
                }else if(entry.target.id === "trailInfo"){
                    //Update section with current info
                    jQuery(".section-trail__paragraph")[0].innerText = jsonData.trailDescription;
                    jQuery(".section-trail__img")[0].src = jsonData.trailInfoImage;
                }else if(entry.target.id === "about"){
                    // TODO Update about
                    //jQuery(".section-trail__paragraph")[0].innerText = jsonData.trailDescription;
                }else if(entry.target.id === "map"){
                    // Todo update Map
                    //jQuery(".section-trail__paragraph")[0].innerText = jsonData.trailDescription;
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
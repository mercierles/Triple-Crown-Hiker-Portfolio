import {sessionHelper} from './session-helper.js';
// Initialize Blog Data
export function blogInit(blogPost){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	if(!x.showBlog){jQuery("#blog").remove();return;}
	if(!blogPost || blogPost === ""){
		getBlogData(blogPost);
	}else{
		let itemID = "blogData_"+blogPost.split(".")[0];
		let localstorageData = sessionHelper.getItem(itemID);
		if(!localstorageData){
			getBlogData(blogPost);
		}else{
			popuplateBlogData(localstorageData);
		}
	}
}

// Get Blog Data via PHP cURL Request
function getBlogData(blogPost){
	let x = JSON.parse(sessionStorage.getItem("trailData"));
	$.ajax({
		type: "GET",
		url: "/trail/blogData",
		data:{
			fileName:blogPost,
			trail: x.trailShortName
		},
		beforeSend: function() {
			jQuery("#blog .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#blog .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			if(response != ""){
				let jsonResponse = JSON.parse(response);
				if(jQuery("#blog-date option[value='select']").length == 1){
					popuplateDropDown(jsonResponse['Blogs'], jsonResponse['SelectedBlogName']);
				}
				popuplateBlogData(jsonResponse['SelectedBlogData']);
				sessionHelper.setItem("blogData_"+jsonResponse['SelectedBlogName'].toString().split(".")[0], jsonResponse['SelectedBlogData']);
			}else{
				jQuery("#blog").remove();
			}

		},
		error: function(response){
			console.log("Unable to retrieve Blog Data");
			jQuery("#blog").remove();
		}
	});
}

// Populate Results
function popuplateBlogData(data){
	jQuery("#blog").children().show();
	jQuery("#blog-data").append("<pre>"+data+"</pre>");
	sessionHelper.addReadMore("blog", "blog-data");
}

// Populate Results
function popuplateDropDown(data, fileName){
	data.forEach(function(item,index){
		if(item.toString()  === fileName){
			jQuery("#blog-date").append("<option value='"+item+"' selected>"+item.toString().split("_")[1].split(".")[0]+"</option>");
		}else{
			jQuery("#blog-date").append("<option value='"+item+"'>"+item.toString().split("_")[1].split(".")[0]+"</option>");
		}
	})
	jQuery("option[value*='select']").remove();
}
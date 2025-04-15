import axios from 'axios';
import trailModel from '../models/trail-model.js';
import fs from 'fs';
import path from 'path';

// export function getTestData(req,res,next){
//     var p = path.join(path.dirname(import.meta.dirname),'trail_data','testData.json');
//     console.log(p);
//     var trailData;
//     fs.readFile(p, (error,data)=>{
//         console.log(data);
//                 if(!error){
//                     console.log('reading test data');
//                     trailData = JSON.parse(data);
//                     // console.log(trailData);

//                     // if(!trails.hasOwnProperty(this.pageTitle)){
//                     //     // TODO Write
                        
//                     //     trails.push(this);
//                     //     console.log(JSON.stringify(trails));
//                     //     console.log('Writing ' + this.pageTitle + ' json data');
//                     //     fs.writeFile(p,JSON.stringify(trails), (err)=>{console.log(err);});
//                     // }
//                     // console.log(trailData);
//                     res.send(trailData);
//                 }
//             });
// }

export function getTrailPCT(req, res, next){
    trailModel.trails('pct',(td)=>{
        res.render('index', {trailData: td});
    });
};

export function getTrailAT(req, res, next) {
    trailModel.trails('at',(td)=>{
        res.render('index', {trailData: td});
    });
};

export function getTrailCDT(req, res, next) {
    trailModel.trails('cdt',(td)=>{
        res.render('index', {trailData: td});
    });
};

export function getLighterPackData(req, res, next) {
    let url = '';
    if(req.query.lighterpackurl !== ''){
        url = req.query.lighterpackurl;
    }else{
        url = "https://lighterpack.com/r/c0z1be";
    }

    axios.get(url).then(function (resp){
        var y = resp.data.toString().split('lpListName">')[1];
        y = y.split('</h1>')[0];
        var x = resp.data.toString().split('<ul class="lpCategories">')[1];
        x = x.split('<div class="lpDialog" id="lpImageDialog">')[0];
        x = "<title>" + y + "</title>" + x
        res.send(x);
    }).catch(function (error) {
        res.statusMessage = 'Unable to retrieve: ' + url + ' lighterpack data';
        res.status(400).end();
    });
};

export function getFitBitData(req, res, next) {
    var sum = 0;
    trailModel.trails(req.query.trail.toString().toLowerCase(),(td)=>{
        let startDate = td.trailStartDate;
        let endDate = td.trailEndDate;
        if(new Date(endDate) > Date.now("yyyy-MM-dd")){
            let tmpDate = new Date();
            endDate = tmpDate.getFullYear() + "-" + (((tmpDate.getMonth()+1) < 10 ? "0" : "") + (tmpDate.getMonth()+1)) + "-" + ((tmpDate.getDate() > 10 ? "0" : "") + tmpDate.getDate());
        }
        if(endDate == "2018-10-05"){endDate = "2018-07-01"; console.log("Changed trail enddate for AT since fitbit broke")}
        let action = req.query.action;
        let actionURL = "https://api.fitbit.com/1/user/-/activities/"+action+"/date/"+startDate+"/"+endDate+".json";
        let fitbitToken = process.env.FITBIT_ACCESS_TOKEN;
        axios.get(actionURL, {
            headers:{
                Authorization:'Bearer ' + fitbitToken
            }
        }).then(function (resp){
            // let sum = 0;
            // check sum is okay
            if( resp.data['activities-'+action].length > 0){
                resp.data['activities-'+action].forEach(element => {           
                    sum = sum + parseInt(element['value']);
                });
            }
            res.send(JSON.stringify(sum/ resp.data['activities-'+action].length));
        }).catch(function (error) {
            res.statusMessage = 'Unable to retrieve ' +action+' fitbit data: '+error;
            res.status(400).end();
        });
   });
};

export function getInstagramData(req, res, next) {
    var startTimestamp = Math.floor(new Date(req.query.startDate).getTime() / 1000);
    var endTimestamp = Math.floor(new Date(req.query.endDate).getTime() / 1000);
    let token = process.env.INSTAGRAM_ACCESS_TOKEN;
    let instagramGraphBaseURL = "https://graph.instagram.com/v21.0";
    let mediaPostArray = {'image':[]};
    
    axios.get(instagramGraphBaseURL+"/9975905459108511/media?fields=id,caption,media_url,children{media_url}&since="+startTimestamp+"&until="+endTimestamp+"&access_token="+token,{}).then(function(jsonData){
        let data = [];
        data = jsonData.data.data;
        data.forEach(element => {
            if(!element.children){
                mediaPostArray['image'].push({'id':element['id'], 'caption':element['caption'].split("/n")[0], 'url':element['media_url']});
            }else{
                element.children?.data.forEach(child =>{
                    mediaPostArray['image'].push({'id':child['id'], 'caption':element['caption'].split("/n")[0], 'url':child['media_url']});
                });
            }
        });
        res.send(JSON.stringify(mediaPostArray));
    

    }).catch(function (error) {
            res.statusMessage = 'Unable to retrieve instagram data - ' + error;
            res.status(400).end();
    });
};

export function getBlogData(req, res, next) {
    var trailShortName = req.query.trail.toString().toLowerCase();
    try {
        getAllFileNames(trailShortName, function(fileNames){
            console.log(fileNames);
            if(fileNames.length == 0){
                res.send('');
            }else{
                let selectedFile = req.query.fileName;
                if (!selectedFile){
                    selectedFile = fileNames[0];
                }
                var blogData = {"Blogs":fileNames,"SelectedBlogData":"","SelectedBlogName":""}
                var p = path.join(path.dirname(import.meta.dirname),'posts',trailShortName,selectedFile);
                fs.readFile(p, (error,data)=>{
                    if(!error){
                        blogData.SelectedBlogData = data.toString();
                        blogData.SelectedBlogName = selectedFile;
                        res.send(JSON.stringify(blogData));
                    }
                });
            }
        });
    } catch (error) {
        res.statusMessage = 'Unable to retrieve blog data - ' + error;
        res.status(400).end();
    }
};


export function getArcGISData(req,res,next) {
    console.log('running axios for arc gis data');
    axios.get("https://www.arcgis.com/sharing/rest/content/items/39728eb580ea4d2e84c01a82b6247a50/data",{params: {
        f: 'json',
        token: process.env.ARCGIS_TOKEN,
    },}).then(function(jsonData){
        if(jsonData.data.error !== undefined){console.log('throwing error ' + jsonData.data.error.message + ' | ' + JSON.stringify(jsonData.data));throw new Error(jsonData.data.error.message)}
        console.log('sending gis data: ');
        res.send(JSON.stringify(jsonData.data));
    }).catch(function (error) {
        console.log('error thrown');
        console.log(error);
        res.statusMessage = 'Unable to retrieve arcgis data - ' + error;
        res.status(400).end();
    });
}

function getAllFileNames(trailShortName, cb){
    let lstFileNames = [];
    let pa = path.join(path.dirname(import.meta.dirname),'posts',trailShortName);
    fs.readdir(pa, (err, files) => {
        files.forEach(file => {
            lstFileNames.push(file);
        });
        cb(lstFileNames);
      });
}

export default {};
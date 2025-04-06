import fs from 'fs';
import path from 'path';
var p = path.join(path.dirname(import.meta.dirname),'trail_data','trailData.json');
export default class trailModel{
    constructor(pageTitle){
        this.pageTitle = pageTitle;
    }

    save(){
        fs.readFile(p, (error,data)=>{
            let trails = [];
            if(!error){
                trails = JSON.parse(data);
                if(!trails.hasOwnProperty(this.pageTitle)){
                    // TODO Write
                    
                    trails.push(this);
                    console.log(JSON.stringify(trails));
                    console.log('Writing ' + this.pageTitle + ' json data');
                    fs.writeFile(p,JSON.stringify(trails), (err)=>{console.log(err);});
                }
            }
        });
    }

    static trails(pageTitle,cb){
        fs.readFile(p, (error,data)=>{
            let trails = [];
            if(!error){
                trails = JSON.parse(data);
                if(trails.hasOwnProperty(pageTitle)){
                    cb(trails[pageTitle]);
                }
            }
        });
    }
}
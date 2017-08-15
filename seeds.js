var mongoose=require("mongoose");
var Comment=require("./models/comments");
var Campground=require("./models/campgrounds");
var data=[
    {
        name:"Cloud's reset",
        image:"data:image/jpeg;base64,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",
        description:"blahblha",
        author:{
            id:"59910e87a15a841855f975c9",
            username:"Harry"
        }
    },
    {
        name:"Cloud's reset",
        image:"data:image/jpeg;base64,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",
        description:"blahblha",
        author:{
            id:"59910e87a15a841855f975ca",
            username:"Peter"
        }
    },
    {
        name:"Cloud's reset",
        image:"data:image/jpeg;base64,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",
        description:"blahblha",
        author:{
            id:"59910e87a15a841855f975cb",
            username:"Mary"
        }        
    }
]
function seedDB(){
    Campground.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("remove campgrounds DBs");
        }
        //seed represent one of the items
        data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err)
                console.log(err);
            else
            {
                console.log("add a campgrpund");
                Comment.create({
                    text:"This is a ",
                    author:"huawei"
                },function(err,comment){
                    if(err)
                        console.log(err);
                    else
                    {
                        //add the newly created comment to the campground item
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a comment");
                    }
                    
                });
            }
            
            
        })
        });
    });
    
    
}

module.exports=seedDB;
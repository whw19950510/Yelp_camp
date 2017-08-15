var middlewareObj={};
var Campground=require("../models/campgrounds");
var Comment=require("../models/comments");
middlewareObj.checkCampgroundOwnership=function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
               req.flash("error","Campground not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","You don't have perission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error","You need to be loged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentsOwnership=function (req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               req.flash("error","Comment not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error","You need to be loged in to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
}

//middleware
middlewareObj.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please log in first");
    res.redirect("/login");
}

module.exports=middlewareObj;
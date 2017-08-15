var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comments");
var middleware=require("../middleware/index");
//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {camp: campground});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
               comment.save();
               req.flash("success","Successfully edit comment");
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
});

//Comments Edit
router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err, foundComment) {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    });
});

//Comments update
router.put("/:comment_id",function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComments){
        if(err)
            res.redirect("back");
        else
            res.redirect("/campgrounds/"+req.params.id);
    });
});

//Comments Destroy Routes
router.delete("/:comment_id",function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err)
            res.redirect("back");
        else
        {
            req.flash("success","Comment deleted");
            res.redirect("/campgrounds"+req.params.id);
        }
            
    });
});




module.exports = router;
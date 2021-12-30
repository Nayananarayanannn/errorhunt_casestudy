const express = require('express'); 
const authorsRouter = express.Router();
// const authors = require('../data/authors');
const authordata = require('../model/AuthorModel');
const multer = require("multer");

var storage= multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./public/images")
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

var upload = multer({storage:storage});

function router(nav){//part#2 point6
    //router to render authors page
authorsRouter.get('/',function(req,res){

    authordata.find() 
    .then(function (authors) {

    res.render('authors',{
        nav,
        authors
    });

    })
})



//router to render add author page
authorsRouter.get('/addauthor',function(req,res){
    res.render('addauthor',{
        nav
    });

});




//router to add author
authorsRouter.post('/add',upload.single("image"), function (req, res) {

    var item={
        title:req.body.title,
        image:req.file.filename,
        // image:req.body.image,  //part#2 point8 changed images to image(used multer instead)
        about:req.body.about
    }
    console.log(item)  ;
    const author = new authordata(item);
    author.save();
    res.redirect('/authors');

})




//router for single author
authorsRouter.get('/:id',function(req,res){
    const id = req.params.id;
    authordata.findOne({ _id: id })
            .then(function (author) {
                res.render('author', {
                    nav,
                    author
                })

            })
    
});




//router to delete author
authorsRouter.post('/delete', function (req, res) {

    const id = req.body.id;  

    authordata.findOneAndDelete({ _id: id },{
        useFindAndModify:false//part#2 poinr9
    })
        .then(function () {

            res.redirect('/authors')

        })  
})



//router to edit author
authorsRouter.post('/edit', function (req, res) {

    authordata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editauthor', {
                nav,
                data})
        }
    })
})




//router to update author
authorsRouter.post('/update', function (req, res) {
    authordata.findOne({ _id: req.body.id }) //Part #2 Point 9
        .then(function (author) {
            if (req.body.image != ""){
                author.image = req.body.image;
            }
               
            author.title = req.body.title;
            author.about = req.body.about;
            author.save(function (err) {
                if (err) {
                    res.json({ status: "Failed" });
                }
                else {
                    res.redirect("/authors")
                }
            })
        })
})
return authorsRouter;
}







module.exports = router;
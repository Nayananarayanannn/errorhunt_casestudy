const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');




function router(nav){//part#2 point1
    //router to render books page
booksRouter.get('/',function(req,res){

    bookdata.find() 
    .then(function (books) {

    res.render('books',{
        nav,
        books
    });

    })
})



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{
        nav
    });

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    })



//router for singlebook
booksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    nav,
                    book
                })

            })
    
});




//router to delete book
booksRouter.post('/delete', function (req, res) {

    const id = req.body.id;  

    bookdata.findOneAndDelete({ _id: id },
        {useFindAndModify:false})//part#2point1
        .then(function () {

            res.redirect('/books')

        })  
})



//router to edit book
booksRouter.post('/edit', function (req, res) {

    bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {
                nav,
                data})
                console.log(data.image)
        }
    })
})



//router to update book
booksRouter.post('/update', function (req, res) {

    bookdata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
        if (err) {
            res.json({ status: "Failed" });
        }
        else if (data.n == 0) {
            res.json({ status: "No match Found" });
        }
        else {
            res.redirect("/books");
        }

    }) 
});

return booksRouter;
}









module.exports = router;
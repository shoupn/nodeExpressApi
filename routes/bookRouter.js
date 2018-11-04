const express = require('express');


const routes = function(Book){
    const bookRouter = express.Router();
    const bookController = require('../controllers/bookController')(Book);

    bookRouter.use('/books/:id', function(req, res, next){
        Book.findById(req.params.id, (err,book) => {
            if (err) return res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('book not found');
            }        
        });
    });


    bookRouter.route('/books/:id')
    .get((req, res)=>{
        let returnBook = req.book.toJSON();
        returnBook.links = {};
        let link = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
        returnBook.links.FilterByThisGenre =link.replace(' ', '%20');
        res.json(returnBook);
    })
    .put((req,res)=>{
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.title;
        req.book.read = req.body.read;
        req.book.save(function(err){
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.json(req.book);
            }
        });
    })
    .patch((req, res) =>{
        if(req.body._id){
            delete req.body._id;
        }
        for(let p in req.body)
        {
            req.book[p] = req.body[p];
        }
        req.book.save(function(err){
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.json(req.book);
            }
        });
    })
    .delete((req,res)=>{
        req.book.remove(function(err){
            if(err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.status(204).send("removed book");
            }
        });
    });

bookRouter.route('/books')
    .get(bookController.get)
    .post(bookController.post);

return bookRouter;
};
 
module.exports = routes;
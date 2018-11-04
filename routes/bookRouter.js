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
    .get(bookController.getById)
    .put(bookController.putById)
    .patch(bookController.patchById)
    .delete(bookController.deleteById);

bookRouter.route('/books')
    .get(bookController.get)
    .post(bookController.post);

return bookRouter;
};
 
module.exports = routes;
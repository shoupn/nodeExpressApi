const bookController = function(Book){
    
    let post = function(req, res){
        const book = new Book(req.body);
        if(!req.body.title){
            res.status(400);
            res.send("Title is required");
        }
        else{        
            book.save();
            res.status(201);
            let newBook = book.toJSON();
            newBook.links = {};
            newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
            res.send(newBook);
        }
    };

    let get = function(req, res){
        let query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Book.find(query,(err, books)=>{
            if (err) return res.status(500).send(err);    
            let returnBooks = [];
            books.forEach(function(element, index, array){
                let newBook = element.toJSON();
                newBook.links = {};
                newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                returnBooks.push(newBook);
            });

            return res.status(200).send(returnBooks);
        });
    };

    let getById = function(req, res){
        let returnBook = req.book.toJSON();
        returnBook.links = {};
        let link = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
        returnBook.links.FilterByThisGenre =link.replace(' ', '%20');
        res.json(returnBook);
    };

    let putById = function(req,res){
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
    };

    let patchById = function(req, res){
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
    };

    let deleteById = function(req,res){
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
    };


    return{
        post : post,
        get : get,
        getById : getById,
        putById : putById,
        patchById : patchById,
        deleteById : deleteById
    };
};
module.exports = bookController;
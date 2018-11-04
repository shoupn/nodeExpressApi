const bookController = function(Book){
    
    var post = function(req, res){
        const book = new Book(req.body);
        if(!req.body.title){
            res.status(400);
            res.send("Title is required");
        }
        else{        
            book.save();
            res.status(201);
            res.send(book);
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
                newBook.links.self = 'http://' + req.headers.host + 
                    '/api/books/' + newBook._id;
                returnBooks.push(newBook);
            });

            return res.status(200).send(returnBooks);
        });
    };

    return{
        post: post,
        get: get
    };
};
module.exports = bookController;
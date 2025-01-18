const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
   const {isbn} = req.params;
   const book = Object.values(books).find(book => book.isbn === isbn)
   res.send(book)
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const {author} = req.params;
  const bookAuthor = Object.values(books).filter(book => book.author.toLowerCase() === author.toLowerCase())
  res.status(200).json(bookAuthor)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const{title} = req.params;
  const bookTiTle = Object.values(books).filter(book => book.title.toLowerCase() === title.toLowerCase())
  res.status(200).json(bookTiTle)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const {isbn} = req.params;
  const book = Object.values(books).find(book => book.isbn === isbn);
  
  if (book && book.reviews){
    if (Object.keys(book.reviews).length > 0){
        res.status(200).json(book.reviews)
    }else{
        res.status(404).json({message:"No reviews found for this book"})
    }
  }
  
});

module.exports.general = public_users;

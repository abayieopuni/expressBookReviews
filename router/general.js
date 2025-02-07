const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;
  
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" }); // Changed to 400
    }
  
    // Check if the username is valid
    if (!isValid(username)) {
      return res.status(400).json({ message: "Invalid username." }); // Changed to 400
    }
  
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
      return res.status(400).json({ message: "User already exists!" });
    }
  
    // Register the new user
    users.push({ username, password });
    return res.status(200).json({ message: "User successfully registered. Now you can login" });
  });

// Similating asyc function for books
  async function getBooks () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 1000);
    });
  }


// Get the book list available in the shop
public_users.get('/',  async (req, res) => {
  //Write your code here
    try {
        const bookList = await getBooks();
        res.status(200).send(JSON.stringify({books:bookList}, null , 4))
    } catch (error) {
        res.status(500).json({message: "Error fecting books", error: error.message})
    }
 
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res)  => {
  //Write your code here
   const {isbn} = req.params;

    try {
        const bookList = await getBooks();
        const foundBook = Object.values(bookList).find(book => book.isbn === isbn)
        if (foundBook){
            res.status(200).json(foundBook)
        }else {
            res.status(404).json({message:`Book with isbn ${isbn} not found`})
        }
        
    } catch (error) {
        res.status(500).json({message: "error fetching books details", error:error.message })
    }


 });
  
// Get book details based on author
public_users.get('/author/:author', async (req, res)  => {
  //Write your code here
  const {author} = req.params;

  try {
    const bookList = await getBooks();
    const bookAuthor = Object.values(bookList).filter(book => book.author.toLowerCase() === author.toLowerCase())
    if (bookAuthor.length > 0){
        res.status(200).json(bookAuthor)
    }else {
        res.status(404).json({message:`No books found by author ${author}`})
    }
    
  } catch (error) {
    res.status(500).json({message:"Error fectching books by author", error: error.message})
  }

});

// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  //Write your code here
  const{title} = req.params;

  try {
    const bookList = await getBooks();
    console.log(bookList)

    const bookTiTle = Object.values(bookList).filter(book => book.title.toLowerCase() === title.toLowerCase())
    if (bookTiTle.length > 0) {
        res.status(200).json(bookTiTle)
    }else {
        res.status(404).json({message:`No books found with the title ${title}`})
    }
   
  } catch (error) {
    res.status(500).json({message:"Error fetching books by author", error:error.message})
  }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const {isbn} = req.params;
  const book = Object.values(books).find(book => book.isbn === isbn);
  
  if (book) {
    if (book.reviews && Object.keys(book.reviews).length > 0) {
      // Return the reviews if they exist
      res.status(200).json(book.reviews);
    } else {
      // No reviews found for this book
      res.status(404).json({ message: "No reviews found for this book" });
    }
  } else {
    // Book not found
    res.status(404).json({ message: "Book not found" });
  }
  
});

  

module.exports.general = public_users;

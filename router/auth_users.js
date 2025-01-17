const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    return username && username.lenght > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    const user = users.find(u => u.username === username);
    return user && user.password === password;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {user} = req.body;
  if(!user){
    return res.status(404).json({message: "Body Empty"})
  }
  let accessToken =jwt.sign({data:user}, "acess",{expiresIn: 60*60});
  req.session.authorization = {accessToken}
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const {isbn} = req.params;
  const {review} = req.body;

  if (!users.reviews[isbn]) {
    users.reviews[isbn] = [];
  }

  users.reviews[isbn].push(review);
  
  return res.status(300).json({message: "Yet to be implemented"});
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const {isbn} = req.params;
    const {review} = req.body;

    if (!users.reviews[isbn]) {
        users.reviews[isbn] = [];
    }
    users.reviews[isbn.slice(review)]


});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

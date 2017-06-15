# hacktivpress1

# hacktivpress

This web app is a simple Content Management System (CMS) or blogging. I use ExpressJS as a backend framework and MongoDB as database (using ODM Mongoose). As users, we can post, edit, and delete articles, add category on each article.


## List of basic routes:


| Routes | HTTP | Description |
| --------------- | ------------- | --------------------------- |
| /signup/ | POST | Sign up as a new user |
| /signin/ | POST | Sign in to access the articles |
| /api/articles/ | POST | Insert new articles |
| /api/articles/ | GET | Get all articles |
| /api/articles/:id | GET | Get articles by id |
| /api/articles/user/:id | GET | Get articles by author (user) |
| /api/articles/category/:category | GET | Get articles by category |
| /api/articles/:id | DELETE | Delete articles by id |
| /api/articles/:id | PUT | Update articles by id |

# Usage:

## With Postman From Server

npm install

npm start

Access the website via http://localhost:3000

## From Client

npm install

npm run dev

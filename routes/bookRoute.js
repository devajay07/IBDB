const express = require('express');
const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');

const bookRouter = express.Router();

bookRouter.route('/')
.get(authController.protect, bookController.getBooks)
.post(bookController.createBook);

bookRouter.route('/:id')
.get(bookController.getAbook)
.patch(bookController.updateBook)
.delete(authController.protect, authController.restrictTo('admin', 'manager'), bookController.deleteBook)

module.exports = bookRouter;
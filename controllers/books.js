// in controllers/stuff.js
const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
  delete req.body._id;
  const book = new Book({ ...req.body });
  book.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({
    _id: req.params.id,
  }).then(
    (book) => {
      res.status(200).json(book);
    },
  ).catch(
    (error) => {
      res.status(404).json({
        error,
      });
    },
  );
};

exports.modifyBook = (req, res, next) => {
  const book = new Book({
    _id: req.params.id,

    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
  });
  Book.updateOne({ _id: req.params.id }, book).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

exports.deleteBook = (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!',
      });
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

exports.getAllBook = (req, res, next) => {
  Book.find().then(
    (book) => {
      res.status(200).json(book);
    },
  ).catch(
    (error) => {
      res.status(400).json({
        error,
      });
    },
  );
};

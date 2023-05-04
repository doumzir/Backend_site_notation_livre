// in controllers/stuff.js
const Book = require('../models/Book');

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);

  // eslint-disable-next-line no-underscore-dangle
  delete bookObject._id;
  // eslint-disable-next-line no-underscore-dangle
  delete bookObject._userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  book.save().then(
    () => {
      res.status(201).json({
        message: 'book saved successfully!',
      });
    },
  ).catch(
    (error) => {
      console.log(book);
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

exports.getTopRatedBooks = (req, res, next) => {
  Book.find().sort({ averageRating: -1 }).limit(3).then(
    (book) => {
      res.status(200).json(book);
    },
    (error) => {

      res.status(400).json({
        error,
      });
    },
  );
};

exports.addRating = (req, res, next) => {
  const bookId = req.params._id;
  const { userId } = req.auth;
  const { grade } = req.body;

  // Vérifier que la note est comprise entre 0 et 5
  if (grade < 0 || grade > 5) {
    return res.status(400).json({ error: 'La note doit être comprise entre 0 et 5' });
  }

  // Trouver le livre correspondant à l'id
  Book.findById(bookId).then((book) => {
    if (!book) {
      return res.status(404).json({ error: 'Livre non trouvé' });
    }

    // Vérifier que l'utilisateur n'a pas déjà noté le livre
    const userRating = book.ratings.find((rating) => rating.userId === userId);
    if (userRating) {
      return res.status(400).json({ error: "L'utilisateur a déjà noté ce livre" });
    }

    // Ajouter la note et l'id utilisateur au tableau de notes du livre
    book.ratings.push({ userId, grade });

    // Calculer la nouvelle moyenne des notes
    const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
    // eslint-disable-next-line no-param-reassign
    book.averageRating = sumRatings / book.ratings.length;

    // Sauvegarder les modifications dans la base de données
    book.save().then(() => {
      res.status(200).json(book);
    }).catch((error) => {
      res.status(400).json({ error });
    });
  }).catch((error) => {
    res.status(400).json({ error });
  });
};

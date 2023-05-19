const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');/*
const multer = require('../middleware/multer-config');*/
const { upload, compressImg } = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');

router.get('/', bookCtrl.getAllBook);
router.post('/', auth, upload.single('image'), bookCtrl.createBook);


/*
router.post('/:id/rating', auth bookCtrl.createSpecialRating);*/
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.addRating);
router.get('/bestrating', bookCtrl.getOneBook);

module.exports = router;

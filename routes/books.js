const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');

const { upload, compressImg } = require('../middleware/multer-config');
const bookCtrl = require('../controllers/books');

router.get('/', bookCtrl.getAllBook);
router.post('/', auth, upload.single('image'), bookCtrl.createBook);

router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, upload.single('image'), bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.addRating);
router.get('/bestrating', bookCtrl.getOneBook);

module.exports = router;

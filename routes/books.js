const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../m')

const bookCtrl = require('../controllers/books');

router.get('/', auth, bookCtrl.getAllBook);
router.post('/', auth, bookCtrl.createBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;

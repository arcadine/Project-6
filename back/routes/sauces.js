const express = require('express');
const router = express.Router();
const { verifyToken, upload } = require('../jwtMiddleware.js');

const sauceCtrl = require('../controllers/sauces');

router.get('/sauces', verifyToken, sauceCtrl.getSauces);
router.get('/sauces/:id', verifyToken, sauceCtrl.getSauceById);
router.post('/sauces', verifyToken, upload.single('image'), sauceCtrl.addSauce);
router.put('/sauces/:id', verifyToken, upload.single('image'), sauceCtrl.updateSauce);
router.delete('/sauces/:id', verifyToken, sauceCtrl.deleteSauce);
router.post('/sauces/:id/like', verifyToken, sauceCtrl.likeSauce);

module.exports = router;
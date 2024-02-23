const express = require('express');
const router = express.Router();
const verifyToken = require('../jwtMiddleware.js');

const sauceCtrl = require('../controllers/sauces');

router.get('/sauces', verifyToken, sauceCtrl.getSauces);
router.get('/sauces/:id', verifyToken, sauceCtrl.getSauceById);
router.post('/sauces', verifyToken, sauceCtrl.addSauce);
router.put('/sauces/:id', verifyToken, sauceCtrl.updateSauce);
router.delete('/sauces/:id', verifyToken, sauceCtrl.deleteSauce);
router.post('/sauces/:id/like', verifyToken, sauceCtrl.likeSauce);

module.exports = router;
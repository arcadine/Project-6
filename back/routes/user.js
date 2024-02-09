const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signupUser);
router.post('/login', userCtrl.loginUser);

// // Example protected route - Upload image
// router.post('/upload-image', verifyToken, async (req, res) => {
//     try {
//       // Get user ID from decoded token
//       const userId = req.user._id;
  
//       // Implementation for image upload
  
//       res.json({ message: 'Image uploaded successfully' });
//     } catch (error) {
//       console.error('Error in uploading image:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

module.exports = router;
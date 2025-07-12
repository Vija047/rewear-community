const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  authenticate,
  authLimiter,
  apiLimiter
} = require('../middleware/auth');
const {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateId
} = require('../middleware/validation');

// Public routes
router.post('/register', authLimiter, validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login); // Removed rate limiting for now
router.post('/forgot-password', apiLimiter, authController.requestPasswordReset);
router.post('/reset-password', apiLimiter, authController.resetPassword);
router.post('/verify-email', apiLimiter, authController.verifyEmail);
router.get('/user/:id', validateId, authController.getUserById);

// Protected routes
router.get('/verify', authenticate, authController.verifyToken);
router.get('/profile', authenticate, apiLimiter, authController.getProfile);
router.put('/profile', authenticate, apiLimiter, validateProfileUpdate, authController.updateProfile);
router.put('/change-password', authenticate, apiLimiter, authController.changePassword);
router.post('/resend-verification', authenticate, apiLimiter, authController.resendVerification);
router.post('/logout', authenticate, apiLimiter, authController.logout);

module.exports = router; 
const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const { 
  authenticate, 
  requireUser, 
  requireAdmin, 
  apiLimiter 
} = require('../middleware/auth');
const { 
  validateSwapRequest, 
  validateSwapResponse,
  validatePagination,
  validateId 
} = require('../middleware/validation');

// Protected routes
router.post('/', 
  authenticate, 
  requireUser, 
  apiLimiter,
  validateSwapRequest, 
  swapController.createSwapRequest
);

router.get('/', 
  authenticate, 
  requireUser, 
  validatePagination, 
  swapController.getUserSwapRequests
);

router.get('/:id', 
  authenticate, 
  requireUser, 
  validateId, 
  swapController.getSwapRequestById
);

router.put('/:id/respond', 
  authenticate, 
  requireUser, 
  apiLimiter,
  validateId,
  validateSwapResponse, 
  swapController.respondToSwapRequest
);

router.put('/:id/cancel', 
  authenticate, 
  requireUser, 
  apiLimiter,
  validateId, 
  swapController.cancelSwapRequest
);

router.put('/:id/complete', 
  authenticate, 
  requireUser, 
  apiLimiter,
  validateId, 
  swapController.completeSwap
);

router.get('/item/:itemId/pending', 
  authenticate, 
  requireUser, 
  validatePagination, 
  swapController.getPendingRequestsForItem
);

// Admin routes
router.get('/admin/stats', 
  authenticate, 
  requireAdmin, 
  swapController.getSwapStats
);

module.exports = router; 
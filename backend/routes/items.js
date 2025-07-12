const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');
const { 
  authenticate, 
  requireUser, 
  requireAdmin, 
  requireOwnership,
  apiLimiter,
  uploadLimiter 
} = require('../middleware/auth');
const { 
  validateItemCreation, 
  validateItemUpdate, 
  validateSearchFilters,
  validatePagination,
  validateId,
  validateAdminAction 
} = require('../middleware/validation');
const { validateImageFile } = require('../utils/cloudinary');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const fileFilter = (req, file, cb) => {
  try {
    validateImageFile(file);
    cb(null, true);
  } catch (error) {
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 images per item
  }
});

// Public routes
router.get('/', validateSearchFilters, itemController.getItems);
router.get('/featured', itemController.getFeaturedItems);
router.get('/:id', validateId, itemController.getItemById);

// Protected routes
router.post('/', 
  authenticate, 
  requireUser, 
  uploadLimiter,
  upload.array('images', 5), 
  validateItemCreation, 
  itemController.createItem
);

router.put('/:id', 
  authenticate, 
  requireUser, 
  requireOwnership('Item'),
  uploadLimiter,
  upload.array('images', 5), 
  validateItemUpdate, 
  itemController.updateItem
);

router.delete('/:id', 
  authenticate, 
  requireUser, 
  requireOwnership('Item'),
  itemController.deleteItem
);

router.post('/:id/like', 
  authenticate, 
  requireUser, 
  validateId, 
  itemController.toggleLike
);

router.get('/user/:userId?', 
  authenticate, 
  requireUser, 
  validatePagination, 
  itemController.getUserItems
);

// Admin routes
router.get('/admin/pending', 
  authenticate, 
  requireAdmin, 
  validatePagination, 
  itemController.getPendingItems
);

router.post('/admin/:id/action', 
  authenticate, 
  requireAdmin, 
  validateId,
  validateAdminAction, 
  itemController.adminAction
);

router.get('/admin/stats', 
  authenticate, 
  requireAdmin, 
  itemController.getItemStats
);

module.exports = router; 
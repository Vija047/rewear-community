const { body, param, query, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User registration validation
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// User profile update validation
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First name can only contain letters and spaces'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last name can only contain letters and spaces'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('preferences.categories')
    .optional()
    .isArray()
    .withMessage('Categories must be an array'),
  body('preferences.categories.*')
    .optional()
    .isIn(['men', 'women', 'kids', 'accessories', 'shoes', 'bags'])
    .withMessage('Invalid category'),
  body('preferences.sizes')
    .optional()
    .isArray()
    .withMessage('Sizes must be an array'),
  body('preferences.sizes.*')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'])
    .withMessage('Invalid size'),
  handleValidationErrors
];

// Item creation validation
const validateItemCreation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['men', 'women', 'kids', 'accessories', 'shoes', 'bags'])
    .withMessage('Invalid category'),
  body('type')
    .isIn(['shirts', 'pants', 'dresses', 'skirts', 'jackets', 'coats', 'sweaters', 'hoodies', 't-shirts', 'jeans', 'shorts', 'suits', 'formal', 'casual', 'sports', 'underwear', 'sleepwear', 'swimwear', 'outerwear', 'other'])
    .withMessage('Invalid type'),
  body('size')
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'ONE_SIZE', 'CUSTOM'])
    .withMessage('Invalid size'),
  body('condition')
    .isIn(['new', 'like_new', 'good', 'fair', 'poor'])
    .withMessage('Invalid condition'),
  body('color')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Color must be between 1 and 30 characters'),
  body('brand')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Brand cannot exceed 50 characters'),
  body('material')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Material cannot exceed 100 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('pointsValue')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Points value must be a non-negative integer'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be between 1 and 20 characters'),
  body('measurements.chest')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Chest measurement must be a non-negative number'),
  body('measurements.waist')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Waist measurement must be a non-negative number'),
  body('measurements.hips')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Hips measurement must be a non-negative number'),
  body('measurements.length')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Length measurement must be a non-negative number'),
  body('measurements.shoulders')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Shoulders measurement must be a non-negative number'),
  body('measurements.sleeve')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sleeve measurement must be a non-negative number'),
  body('measurements.inseam')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Inseam measurement must be a non-negative number'),
  handleValidationErrors
];

// Item update validation
const validateItemUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .optional()
    .isIn(['men', 'women', 'kids', 'accessories', 'shoes', 'bags'])
    .withMessage('Invalid category'),
  body('type')
    .optional()
    .isIn(['shirts', 'pants', 'dresses', 'skirts', 'jackets', 'coats', 'sweaters', 'hoodies', 't-shirts', 'jeans', 'shorts', 'suits', 'formal', 'casual', 'sports', 'underwear', 'sleepwear', 'swimwear', 'outerwear', 'other'])
    .withMessage('Invalid type'),
  body('size')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'ONE_SIZE', 'CUSTOM'])
    .withMessage('Invalid size'),
  body('condition')
    .optional()
    .isIn(['new', 'like_new', 'good', 'fair', 'poor'])
    .withMessage('Invalid condition'),
  body('color')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Color must be between 1 and 30 characters'),
  body('brand')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Brand cannot exceed 50 characters'),
  body('material')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Material cannot exceed 100 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('pointsValue')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Points value must be a non-negative integer'),
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean'),
  handleValidationErrors
];

// Swap request validation
const validateSwapRequest = [
  body('requestedItemId')
    .isMongoId()
    .withMessage('Invalid requested item ID'),
  body('offeredItemId')
    .isMongoId()
    .withMessage('Invalid offered item ID'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters'),
  body('isPointsRedemption')
    .optional()
    .isBoolean()
    .withMessage('isPointsRedemption must be a boolean'),
  body('pointsOffered')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Points offered must be a non-negative integer'),
  body('meetingLocation')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Meeting location cannot exceed 200 characters'),
  body('meetingDate')
    .optional()
    .isISO8601()
    .withMessage('Meeting date must be a valid date'),
  body('meetingTime')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Meeting time cannot exceed 50 characters'),
  body('contactInfo.phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Invalid phone number format'),
  body('contactInfo.email')
    .optional()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  handleValidationErrors
];

// Swap request response validation
const validateSwapResponse = [
  body('responseMessage')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Response message cannot exceed 500 characters'),
  handleValidationErrors
];

// Search and filter validation
const validateSearchFilters = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Search query cannot be empty'),
  query('category')
    .optional()
    .isIn(['men', 'women', 'kids', 'accessories', 'shoes', 'bags'])
    .withMessage('Invalid category filter'),
  query('type')
    .optional()
    .isIn(['shirts', 'pants', 'dresses', 'skirts', 'jackets', 'coats', 'sweaters', 'hoodies', 't-shirts', 'jeans', 'shorts', 'suits', 'formal', 'casual', 'sports', 'underwear', 'sleepwear', 'swimwear', 'outerwear', 'other'])
    .withMessage('Invalid type filter'),
  query('size')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'ONE_SIZE', 'CUSTOM'])
    .withMessage('Invalid size filter'),
  query('condition')
    .optional()
    .isIn(['new', 'like_new', 'good', 'fair', 'poor'])
    .withMessage('Invalid condition filter'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a non-negative number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a non-negative number'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

// ID parameter validation
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors
];

// Admin action validation
const validateAdminAction = [
  body('action')
    .isIn(['approve', 'reject', 'feature', 'unfeature', 'remove'])
    .withMessage('Invalid admin action'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Admin notes cannot exceed 500 characters'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateItemCreation,
  validateItemUpdate,
  validateSwapRequest,
  validateSwapResponse,
  validateSearchFilters,
  validatePagination,
  validateId,
  validateAdminAction
}; 
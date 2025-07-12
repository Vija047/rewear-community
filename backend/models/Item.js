const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['men', 'women', 'kids', 'accessories', 'shoes', 'bags'],
    lowercase: true
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['shirts', 'pants', 'dresses', 'skirts', 'jackets', 'coats', 'sweaters', 'hoodies', 't-shirts', 'jeans', 'shorts', 'suits', 'formal', 'casual', 'sports', 'underwear', 'sleepwear', 'swimwear', 'outerwear', 'other'],
    lowercase: true
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'ONE_SIZE', 'CUSTOM']
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['new', 'like_new', 'good', 'fair', 'poor'],
    lowercase: true
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [50, 'Brand name cannot exceed 50 characters'],
    default: ''
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true,
    maxlength: [30, 'Color cannot exceed 30 characters']
  },
  material: {
    type: String,
    trim: true,
    maxlength: [100, 'Material cannot exceed 100 characters'],
    default: ''
  },
  images: [{
    url: {
      type: String,
      required: [true, 'Image URL is required']
    },
    publicId: {
      type: String,
      required: [true, 'Public ID is required']
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }],
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  pointsValue: {
    type: Number,
    min: [0, 'Points value cannot be negative'],
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'sold', 'removed'],
    default: 'pending'
  },
  location: {
    type: String,
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters'],
    default: ''
  },
  measurements: {
    chest: { type: Number, min: 0 },
    waist: { type: Number, min: 0 },
    hips: { type: Number, min: 0 },
    length: { type: Number, min: 0 },
    shoulders: { type: Number, min: 0 },
    sleeve: { type: Number, min: 0 },
    inseam: { type: Number, min: 0 }
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  swapRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SwapRequest'
  }],
  adminNotes: {
    type: String,
    maxlength: [500, 'Admin notes cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for likes count
itemSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for swap requests count
itemSchema.virtual('swapRequestsCount').get(function() {
  return this.swapRequests.length;
});

// Virtual for primary image
itemSchema.virtual('primaryImage').get(function() {
  const primary = this.images.find(img => img.isPrimary);
  return primary ? primary.url : (this.images[0] ? this.images[0].url : null);
});

// Indexes for better query performance
itemSchema.index({ userId: 1 });
itemSchema.index({ category: 1 });
itemSchema.index({ type: 1 });
itemSchema.index({ size: 1 });
itemSchema.index({ condition: 1 });
itemSchema.index({ isAvailable: 1 });
itemSchema.index({ isApproved: 1 });
itemSchema.index({ status: 1 });
itemSchema.index({ isFeatured: 1 });
itemSchema.index({ createdAt: -1 });
itemSchema.index({ views: -1 });
itemSchema.index({ 'tags': 1 });
itemSchema.index({ title: 'text', description: 'text' });

// Text search index
itemSchema.index({ title: 'text', description: 'text', brand: 'text', color: 'text' });

// Pre-save middleware to set primary image
itemSchema.pre('save', function(next) {
  if (this.images.length > 0 && !this.images.some(img => img.isPrimary)) {
    this.images[0].isPrimary = true;
  }
  next();
});

// Method to increment views
itemSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

// Method to toggle like
itemSchema.methods.toggleLike = async function(userId) {
  const likeIndex = this.likes.indexOf(userId);
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }
  return await this.save();
};

// Method to check if user liked the item
itemSchema.methods.isLikedBy = function(userId) {
  return this.likes.includes(userId);
};

// Static method to get featured items
itemSchema.statics.getFeaturedItems = function(limit = 10) {
  return this.find({
    isFeatured: true,
    isAvailable: true,
    isApproved: true,
    status: 'approved'
  })
  .populate('userId', 'username firstName lastName avatar')
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to search items
itemSchema.statics.searchItems = function(query, filters = {}) {
  const searchQuery = {
    $and: [
      { isAvailable: true, isApproved: true, status: 'approved' }
    ]
  };

  if (query) {
    searchQuery.$and.push({
      $text: { $search: query }
    });
  }

  if (filters.category) {
    searchQuery.$and.push({ category: filters.category });
  }

  if (filters.type) {
    searchQuery.$and.push({ type: filters.type });
  }

  if (filters.size) {
    searchQuery.$and.push({ size: filters.size });
  }

  if (filters.condition) {
    searchQuery.$and.push({ condition: filters.condition });
  }

  if (filters.minPrice !== undefined) {
    searchQuery.$and.push({ price: { $gte: filters.minPrice } });
  }

  if (filters.maxPrice !== undefined) {
    searchQuery.$and.push({ price: { $lte: filters.maxPrice } });
  }

  return this.find(searchQuery)
    .populate('userId', 'username firstName lastName avatar')
    .sort({ createdAt: -1 });
};

module.exports = mongoose.model('Item', itemSchema); 
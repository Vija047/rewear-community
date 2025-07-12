const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Requester ID is required']
  },
  requestedItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'Requested item ID is required']
  },
  offeredItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [true, 'Offered item ID is required']
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
    default: ''
  },
  responseMessage: {
    type: String,
    trim: true,
    maxlength: [500, 'Response message cannot exceed 500 characters'],
    default: ''
  },
  isPointsRedemption: {
    type: Boolean,
    default: false
  },
  pointsOffered: {
    type: Number,
    min: [0, 'Points cannot be negative'],
    default: 0
  },
  meetingLocation: {
    type: String,
    trim: true,
    maxlength: [200, 'Meeting location cannot exceed 200 characters'],
    default: ''
  },
  meetingDate: {
    type: Date,
    default: null
  },
  meetingTime: {
    type: String,
    trim: true,
    maxlength: [50, 'Meeting time cannot exceed 50 characters'],
    default: ''
  },
  contactInfo: {
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number cannot exceed 20 characters'],
      default: ''
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    }
  },
  adminNotes: {
    type: String,
    maxlength: [500, 'Admin notes cannot exceed 500 characters'],
    default: ''
  },
  completedAt: {
    type: Date,
    default: null
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  cancellationReason: {
    type: String,
    trim: true,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters'],
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for participants
swapRequestSchema.virtual('participants', {
  ref: 'User',
  localField: 'requesterId',
  foreignField: '_id',
  justOne: false
});

// Virtual for items involved
swapRequestSchema.virtual('items', {
  ref: 'Item',
  localField: '$or',
  foreignField: '_id',
  justOne: false
});

// Indexes for better query performance
swapRequestSchema.index({ requesterId: 1 });
swapRequestSchema.index({ requestedItemId: 1 });
swapRequestSchema.index({ offeredItemId: 1 });
swapRequestSchema.index({ status: 1 });
swapRequestSchema.index({ createdAt: -1 });
swapRequestSchema.index({ isPointsRedemption: 1 });

// Compound indexes for common queries
swapRequestSchema.index({ requesterId: 1, status: 1 });
swapRequestSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to validate items
swapRequestSchema.pre('save', async function(next) {
  if (this.isNew) {
    // Check if items are available
    const Item = mongoose.model('Item');
    const [requestedItem, offeredItem] = await Promise.all([
      Item.findById(this.requestedItemId),
      Item.findById(this.offeredItemId)
    ]);

    if (!requestedItem || !offeredItem) {
      return next(new Error('One or both items not found'));
    }

    if (!requestedItem.isAvailable || !offeredItem.isAvailable) {
      return next(new Error('One or both items are not available'));
    }

    if (requestedItem.userId.toString() === offeredItem.userId.toString()) {
      return next(new Error('Cannot swap with your own item'));
    }

    if (this.requesterId.toString() === requestedItem.userId.toString()) {
      return next(new Error('Cannot request your own item'));
    }
  }
  next();
});

// Method to accept swap request
swapRequestSchema.methods.accept = async function(responseMessage = '') {
  this.status = 'accepted';
  this.responseMessage = responseMessage;
  return await this.save();
};

// Method to reject swap request
swapRequestSchema.methods.reject = async function(responseMessage = '') {
  this.status = 'rejected';
  this.responseMessage = responseMessage;
  return await this.save();
};

// Method to cancel swap request
swapRequestSchema.methods.cancel = async function(userId, reason = '') {
  this.status = 'cancelled';
  this.cancelledBy = userId;
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
  return await this.save();
};

// Method to complete swap
swapRequestSchema.methods.complete = async function() {
  this.status = 'completed';
  this.completedAt = new Date();
  return await this.save();
};

// Static method to get user's swap requests
swapRequestSchema.statics.getUserSwapRequests = function(userId, status = null) {
  const query = {
    $or: [
      { requesterId: userId },
      { 'requestedItem.userId': userId },
      { 'offeredItem.userId': userId }
    ]
  };

  if (status) {
    query.status = status;
  }

  return this.find(query)
    .populate('requesterId', 'username firstName lastName avatar')
    .populate('requestedItemId', 'title images userId')
    .populate('offeredItemId', 'title images userId')
    .populate('requestedItemId.userId', 'username firstName lastName')
    .populate('offeredItemId.userId', 'username firstName lastName')
    .sort({ createdAt: -1 });
};

// Static method to get pending requests for item owner
swapRequestSchema.statics.getPendingRequestsForItem = function(itemId) {
  return this.find({
    $or: [
      { requestedItemId: itemId },
      { offeredItemId: itemId }
    ],
    status: 'pending'
  })
  .populate('requesterId', 'username firstName lastName avatar')
  .populate('requestedItemId', 'title images')
  .populate('offeredItemId', 'title images')
  .sort({ createdAt: -1 });
};

module.exports = mongoose.model('SwapRequest', swapRequestSchema); 
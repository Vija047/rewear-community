const Item = require('../models/Item');
const User = require('../models/User');
const { uploadImage, uploadMultipleImages, deleteMultipleImages } = require('../utils/cloudinary');
const { sendItemApprovalEmail } = require('../utils/email');

// Create new item
const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      size,
      condition,
      brand,
      color,
      material,
      price,
      pointsValue,
      location,
      tags,
      measurements
    } = req.body;

    // Handle image uploads
    let images = [];
    if (req.files && req.files.length > 0) {
      try {
        const uploadedImages = await uploadMultipleImages(req.files);
        images = uploadedImages.map((img, index) => ({
          url: img.url,
          publicId: img.publicId,
          isPrimary: index === 0 // First image is primary
        }));
      } catch (uploadError) {
        return res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    // Create item
    const item = new Item({
      userId: req.user._id,
      title,
      description,
      category,
      type,
      size,
      condition,
      brand,
      color,
      material,
      price: price || 0,
      pointsValue: pointsValue || 0,
      location,
      tags: tags || [],
      measurements,
      images
    });

    try {
      await item.save();
    } catch (saveError) {
      console.error('Item save validation error:', saveError);
      return res.status(400).json({
        success: false,
        message: 'Failed to save item. Validation or database error.',
        error: saveError.message,
        errors: saveError.errors || undefined
      });
    }

    // Populate user info
    await item.populate('userId', 'username firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: {
        item
      }
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create item',
      error: error.message
    });
  }
};

// Get all items with pagination and filters
const getItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      q,
      category,
      type,
      size,
      condition,
      minPrice,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const skip = (page - 1) * limit;
    const filters = {};

    // Apply filters
    if (category) filters.category = category;
    if (type) filters.type = type;
    if (size) filters.size = size;
    if (condition) filters.condition = condition;
    if (minPrice !== undefined) filters.price = { $gte: parseFloat(minPrice) };
    if (maxPrice !== undefined) {
      if (filters.price) {
        filters.price.$lte = parseFloat(maxPrice);
      } else {
        filters.price = { $lte: parseFloat(maxPrice) };
      }
    }

    // Build query
    let query = Item.find({
      ...filters,
      isAvailable: true,
      isApproved: true,
      status: 'approved'
    }).populate('userId', 'username firstName lastName avatar');

    // Apply search
    if (q) {
      query = Item.searchItems(q, filters);
    }

    // Apply sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    query = query.sort(sortOptions);

    // Apply pagination
    const items = await query.skip(skip).limit(parseInt(limit));
    const total = await Item.countDocuments({
      ...filters,
      isAvailable: true,
      isApproved: true,
      status: 'approved'
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get items',
      error: error.message
    });
  }
};

// Get featured items
const getFeaturedItems = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const items = await Item.getFeaturedItems(parseInt(limit));

    res.json({
      success: true,
      data: {
        items
      }
    });
  } catch (error) {
    console.error('Get featured items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get featured items',
      error: error.message
    });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('userId', 'username firstName lastName avatar bio location');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Increment views
    await item.incrementViews();

    res.json({
      success: true,
      data: {
        item
      }
    });
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get item',
      error: error.message
    });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check ownership
    if (item.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own items.'
      });
    }

    const updateData = req.body;

    // Handle image uploads if new images are provided
    if (req.files && req.files.length > 0) {
      try {
        const uploadedImages = await uploadMultipleImages(req.files);
        const newImages = uploadedImages.map((img, index) => ({
          url: img.url,
          publicId: img.publicId,
          isPrimary: index === 0
        }));

        // Delete old images from Cloudinary
        if (item.images.length > 0) {
          const oldPublicIds = item.images.map(img => img.publicId);
          await deleteMultipleImages(oldPublicIds);
        }

        updateData.images = newImages;
      } catch (uploadError) {
        return res.status(400).json({
          success: false,
          message: 'Image upload failed',
          error: uploadError.message
        });
      }
    }

    // Update item
    Object.assign(item, updateData);
    await item.save();

    // Populate user info
    await item.populate('userId', 'username firstName lastName avatar');

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: {
        item
      }
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update item',
      error: error.message
    });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check ownership
    if (item.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only delete your own items.'
      });
    }

    // Delete images from Cloudinary
    if (item.images.length > 0) {
      const publicIds = item.images.map(img => img.publicId);
      await deleteMultipleImages(publicIds);
    }

    await Item.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item',
      error: error.message
    });
  }
};

// Like/unlike item
const toggleLike = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    await item.toggleLike(req.user._id);

    res.json({
      success: true,
      message: 'Item like toggled successfully',
      data: {
        isLiked: item.isLikedBy(req.user._id),
        likesCount: item.likesCount
      }
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle like',
      error: error.message
    });
  }
};

// Get user's items
const getUserItems = async (req, res) => {
  try {
    const { page = 1, limit = 12, status } = req.query;
    const skip = (page - 1) * limit;

    const query = {
      userId: req.params.userId || req.user._id
    };

    if (status) {
      query.status = status;
    }

    const items = await Item.find(query)
      .populate('userId', 'username firstName lastName avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get user items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user items',
      error: error.message
    });
  }
};

// Admin: Get pending items for approval
const getPendingItems = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const items = await Item.find({
      status: 'pending'
    })
      .populate('userId', 'username firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Item.countDocuments({ status: 'pending' });
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get pending items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending items',
      error: error.message
    });
  }
};

// Admin: Approve/reject item
const adminAction = async (req, res) => {
  try {
    const { action, notes } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    const user = await User.findById(item.userId);

    switch (action) {
      case 'approve':
        item.status = 'approved';
        item.isApproved = true;
        item.adminNotes = notes || '';
        await item.save();

        // Send approval email
        try {
          await sendItemApprovalEmail(item, user, true);
        } catch (emailError) {
          console.error('Approval email failed:', emailError);
        }
        break;

      case 'reject':
        item.status = 'rejected';
        item.isApproved = false;
        item.adminNotes = notes || '';
        await item.save();

        // Send rejection email
        try {
          await sendItemApprovalEmail(item, user, false);
        } catch (emailError) {
          console.error('Rejection email failed:', emailError);
        }
        break;

      case 'feature':
        item.isFeatured = true;
        await item.save();
        break;

      case 'unfeature':
        item.isFeatured = false;
        await item.save();
        break;

      case 'remove':
        // Delete images from Cloudinary
        if (item.images.length > 0) {
          const publicIds = item.images.map(img => img.publicId);
          await deleteMultipleImages(publicIds);
        }
        await Item.findByIdAndDelete(req.params.id);
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    res.json({
      success: true,
      message: `Item ${action}ed successfully`,
      data: {
        item: action === 'remove' ? null : item
      }
    });
  } catch (error) {
    console.error('Admin action error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform admin action',
      error: error.message
    });
  }
};

// Get item statistics
const getItemStats = async (req, res) => {
  try {
    const stats = await Item.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: 1 },
          approvedItems: {
            $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
          },
          pendingItems: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          featuredItems: {
            $sum: { $cond: ['$isFeatured', 1, 0] }
          },
          totalViews: { $sum: '$views' },
          totalLikes: { $sum: { $size: '$likes' } }
        }
      }
    ]);

    const categoryStats = await Item.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        stats: stats[0] || {},
        categoryStats
      }
    });
  } catch (error) {
    console.error('Get item stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get item statistics',
      error: error.message
    });
  }
};

module.exports = {
  createItem,
  getItems,
  getFeaturedItems,
  getItemById,
  updateItem,
  deleteItem,
  toggleLike,
  getUserItems,
  getPendingItems,
  adminAction,
  getItemStats
}; 
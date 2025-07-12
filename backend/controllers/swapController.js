const SwapRequest = require('../models/SwapRequest');
const Item = require('../models/Item');
const User = require('../models/User');
const { sendSwapRequestEmail, sendSwapResponseEmail, sendPointsEarnedEmail } = require('../utils/email');

// Create swap request
const createSwapRequest = async (req, res) => {
  try {
    const {
      requestedItemId,
      offeredItemId,
      message,
      isPointsRedemption,
      pointsOffered,
      meetingLocation,
      meetingDate,
      meetingTime,
      contactInfo
    } = req.body;

    // Validate items exist and are available
    const [requestedItem, offeredItem] = await Promise.all([
      Item.findById(requestedItemId),
      Item.findById(offeredItemId)
    ]);

    if (!requestedItem || !offeredItem) {
      return res.status(404).json({
        success: false,
        message: 'One or both items not found'
      });
    }

    if (!requestedItem.isAvailable || !offeredItem.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'One or both items are not available'
      });
    }

    // Check if user is requesting their own item
    if (requestedItem.userId.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot request your own item'
      });
    }

    // Check if user owns the offered item
    if (offeredItem.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only offer your own items'
      });
    }

    // Check if points redemption is valid
    if (isPointsRedemption) {
      if (!pointsOffered || pointsOffered <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Points offered must be greater than 0'
        });
      }

      if (req.user.points < pointsOffered) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient points'
        });
      }
    }

    // Check if swap request already exists
    const existingRequest = await SwapRequest.findOne({
      requesterId: req.user._id,
      requestedItemId,
      status: { $in: ['pending', 'accepted'] }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending or accepted request for this item'
      });
    }

    // Create swap request
    const swapRequest = new SwapRequest({
      requesterId: req.user._id,
      requestedItemId,
      offeredItemId,
      message,
      isPointsRedemption,
      pointsOffered: pointsOffered || 0,
      meetingLocation,
      meetingDate: meetingDate ? new Date(meetingDate) : null,
      meetingTime,
      contactInfo
    });

    await swapRequest.save();

    // Populate related data
    await swapRequest.populate([
      { path: 'requesterId', select: 'username firstName lastName avatar' },
      { path: 'requestedItemId', select: 'title images userId' },
      { path: 'offeredItemId', select: 'title images userId' },
      { path: 'requestedItemId.userId', select: 'username firstName lastName email' },
      { path: 'offeredItemId.userId', select: 'username firstName lastName email' }
    ]);

    // Send notification email to item owner
    try {
      const itemOwner = await User.findById(requestedItem.userId);
      await sendSwapRequestEmail(swapRequest, itemOwner);
    } catch (emailError) {
      console.error('Swap request email failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Swap request created successfully',
      data: {
        swapRequest
      }
    });
  } catch (error) {
    console.error('Create swap request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create swap request',
      error: error.message
    });
  }
};

// Get user's swap requests
const getUserSwapRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { requesterId: req.user._id },
        { 'requestedItem.userId': req.user._id },
        { 'offeredItem.userId': req.user._id }
      ]
    };

    if (status) {
      query.status = status;
    }

    const swapRequests = await SwapRequest.find(query)
      .populate('requesterId', 'username firstName lastName avatar')
      .populate('requestedItemId', 'title images userId')
      .populate('offeredItemId', 'title images userId')
      .populate('requestedItemId.userId', 'username firstName lastName')
      .populate('offeredItemId.userId', 'username firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SwapRequest.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        swapRequests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get user swap requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get swap requests',
      error: error.message
    });
  }
};

// Get swap request by ID
const getSwapRequestById = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate('requesterId', 'username firstName lastName avatar')
      .populate('requestedItemId', 'title images userId')
      .populate('offeredItemId', 'title images userId')
      .populate('requestedItemId.userId', 'username firstName lastName avatar bio')
      .populate('offeredItemId.userId', 'username firstName lastName avatar bio');

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Check if user has access to this swap request
    const isOwner = swapRequest.requesterId._id.toString() === req.user._id.toString();
    const isItemOwner = swapRequest.requestedItemId.userId._id.toString() === req.user._id.toString() ||
                       swapRequest.offeredItemId.userId._id.toString() === req.user._id.toString();

    if (!isOwner && !isItemOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: {
        swapRequest
      }
    });
  } catch (error) {
    console.error('Get swap request by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get swap request',
      error: error.message
    });
  }
};

// Respond to swap request (accept/reject)
const respondToSwapRequest = async (req, res) => {
  try {
    const { action, responseMessage } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Check if user can respond to this request
    const isItemOwner = swapRequest.requestedItemId.userId.toString() === req.user._id.toString() ||
                       swapRequest.offeredItemId.userId.toString() === req.user._id.toString();

    if (!isItemOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only respond to requests for your items.'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Swap request is not pending'
      });
    }

    // Perform action
    if (action === 'accept') {
      await swapRequest.accept(responseMessage);

      // Handle points redemption if applicable
      if (swapRequest.isPointsRedemption) {
        const requester = await User.findById(swapRequest.requesterId);
        const itemOwner = await User.findById(swapRequest.requestedItemId.userId);

        // Transfer points
        await requester.updatePoints(-swapRequest.pointsOffered);
        await itemOwner.updatePoints(swapRequest.pointsOffered);

        // Send points earned email
        try {
          await sendPointsEarnedEmail(itemOwner, swapRequest.pointsOffered, 'Item swap redemption');
        } catch (emailError) {
          console.error('Points earned email failed:', emailError);
        }
      }

      // Mark items as unavailable
      await Promise.all([
        Item.findByIdAndUpdate(swapRequest.requestedItemId, { isAvailable: false }),
        Item.findByIdAndUpdate(swapRequest.offeredItemId, { isAvailable: false })
      ]);

    } else if (action === 'reject') {
      await swapRequest.reject(responseMessage);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action'
      });
    }

    // Populate related data
    await swapRequest.populate([
      { path: 'requesterId', select: 'username firstName lastName avatar email' },
      { path: 'requestedItemId', select: 'title images userId' },
      { path: 'offeredItemId', select: 'title images userId' },
      { path: 'requestedItemId.userId', select: 'username firstName lastName email' },
      { path: 'offeredItemId.userId', select: 'username firstName lastName email' }
    ]);

    // Send notification email
    try {
      const requester = await User.findById(swapRequest.requesterId);
      await sendSwapResponseEmail(swapRequest, requester);
    } catch (emailError) {
      console.error('Swap response email failed:', emailError);
    }

    res.json({
      success: true,
      message: `Swap request ${action}ed successfully`,
      data: {
        swapRequest
      }
    });
  } catch (error) {
    console.error('Respond to swap request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to respond to swap request',
      error: error.message
    });
  }
};

// Cancel swap request
const cancelSwapRequest = async (req, res) => {
  try {
    const { reason } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    // Check if user can cancel this request
    const isRequester = swapRequest.requesterId.toString() === req.user._id.toString();
    const isItemOwner = swapRequest.requestedItemId.userId.toString() === req.user._id.toString() ||
                       swapRequest.offeredItemId.userId.toString() === req.user._id.toString();

    if (!isRequester && !isItemOwner && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (swapRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Swap request is not pending'
      });
    }

    await swapRequest.cancel(req.user._id, reason);

    res.json({
      success: true,
      message: 'Swap request cancelled successfully',
      data: {
        swapRequest
      }
    });
  } catch (error) {
    console.error('Cancel swap request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel swap request',
      error: error.message
    });
  }
};

// Complete swap
const completeSwap = async (req, res) => {
  try {
    const swapRequest = await SwapRequest.findById(req.params.id);

    if (!swapRequest) {
      return res.status(404).json({
        success: false,
        message: 'Swap request not found'
      });
    }

    if (swapRequest.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Swap request is not accepted'
      });
    }

    // Check if user is involved in this swap
    const isInvolved = swapRequest.requesterId.toString() === req.user._id.toString() ||
                       swapRequest.requestedItemId.userId.toString() === req.user._id.toString() ||
                       swapRequest.offeredItemId.userId.toString() === req.user._id.toString();

    if (!isInvolved && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await swapRequest.complete();

    // Award points to both users for successful swap
    const requester = await User.findById(swapRequest.requesterId);
    const requestedItemOwner = await User.findById(swapRequest.requestedItemId.userId);
    const offeredItemOwner = await User.findById(swapRequest.offeredItemId.userId);

    const pointsAwarded = 10; // Points for successful swap

    await Promise.all([
      requester.updatePoints(pointsAwarded),
      requestedItemOwner.updatePoints(pointsAwarded),
      offeredItemOwner.updatePoints(pointsAwarded)
    ]);

    // Send points earned emails
    try {
      await Promise.all([
        sendPointsEarnedEmail(requester, pointsAwarded, 'Successful swap'),
        sendPointsEarnedEmail(requestedItemOwner, pointsAwarded, 'Successful swap'),
        sendPointsEarnedEmail(offeredItemOwner, pointsAwarded, 'Successful swap')
      ]);
    } catch (emailError) {
      console.error('Points earned emails failed:', emailError);
    }

    res.json({
      success: true,
      message: 'Swap completed successfully',
      data: {
        swapRequest
      }
    });
  } catch (error) {
    console.error('Complete swap error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete swap',
      error: error.message
    });
  }
};

// Get pending requests for item
const getPendingRequestsForItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item
    if (item.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const swapRequests = await SwapRequest.find({
      $or: [
        { requestedItemId: itemId },
        { offeredItemId: itemId }
      ],
      status: 'pending'
    })
    .populate('requesterId', 'username firstName lastName avatar')
    .populate('requestedItemId', 'title images')
    .populate('offeredItemId', 'title images')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await SwapRequest.countDocuments({
      $or: [
        { requestedItemId: itemId },
        { offeredItemId: itemId }
      ],
      status: 'pending'
    });

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        swapRequests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    console.error('Get pending requests for item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending requests',
      error: error.message
    });
  }
};

// Get swap statistics
const getSwapStats = async (req, res) => {
  try {
    const stats = await SwapRequest.aggregate([
      {
        $group: {
          _id: null,
          totalRequests: { $sum: 1 },
          pendingRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          acceptedRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] }
          },
          completedSwaps: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          rejectedRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'rejected'] }, 1, 0] }
          },
          cancelledRequests: {
            $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        stats: stats[0] || {}
      }
    });
  } catch (error) {
    console.error('Get swap stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get swap statistics',
      error: error.message
    });
  }
};

module.exports = {
  createSwapRequest,
  getUserSwapRequests,
  getSwapRequestById,
  respondToSwapRequest,
  cancelSwapRequest,
  completeSwap,
  getPendingRequestsForItem,
  getSwapStats
}; 
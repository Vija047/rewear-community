const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image to Cloudinary
const uploadImage = async (file, options = {}) => {
  try {
    const uploadOptions = {
      folder: 'rewear',
      resource_type: 'image',
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      ...options
    };

    const result = await cloudinary.uploader.upload(file.path, uploadOptions);
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes
    };
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

// Upload multiple images
const uploadMultipleImages = async (files, options = {}) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, options));
    const results = await Promise.all(uploadPromises);
    
    return results;
  } catch (error) {
    throw new Error(`Multiple image upload failed: ${error.message}`);
  }
};

// Delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Image deletion failed: ${error.message}`);
  }
};

// Delete multiple images
const deleteMultipleImages = async (publicIds) => {
  try {
    const deletePromises = publicIds.map(publicId => deleteImage(publicId));
    const results = await Promise.all(deletePromises);
    return results;
  } catch (error) {
    throw new Error(`Multiple image deletion failed: ${error.message}`);
  }
};

// Generate optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultOptions = {
    quality: 'auto:good',
    fetch_format: 'auto',
    ...options
  };

  return cloudinary.url(publicId, defaultOptions);
};

// Generate thumbnail URL
const getThumbnailUrl = (publicId, width = 300, height = 300) => {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto:good',
    fetch_format: 'auto'
  });
};

// Generate responsive image URLs
const getResponsiveImageUrls = (publicId) => {
  const sizes = [300, 600, 900, 1200];
  
  return sizes.map(size => ({
    size,
    url: cloudinary.url(publicId, {
      width: size,
      crop: 'scale',
      quality: 'auto:good',
      fetch_format: 'auto'
    })
  }));
};

// Validate image file
const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024; // 5MB default

  if (!file) {
    throw new Error('No file provided');
  }

  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed');
  }

  if (file.size > maxSize) {
    throw new Error(`File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
  }

  return true;
};

// Process image for upload
const processImageForUpload = async (file) => {
  try {
    validateImageFile(file);
    
    // Additional processing can be added here
    // For example, image compression, resizing, etc.
    
    return file;
  } catch (error) {
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

module.exports = {
  uploadImage,
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
  getOptimizedImageUrl,
  getThumbnailUrl,
  getResponsiveImageUrls,
  validateImageFile,
  processImageForUpload
}; 
// routes/gallery.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Image = require('../models/Image');
const Gallery = require('../models/gallery');
const category = require('../models/Category');
const product = require('../models/Product');

// Route to display gallery
router.get('/', async (req, res) => {
  try {
    const products1 =await product.find({category : 'air-condition'}).populate('thumbnail').exec();
    const products2 =await product.find({category : 'home-items'}).populate('thumbnail').exec();
    const products3 =await product.find({category : 'media'}).populate('thumbnail').exec();
    const categories = await category.find().populate('thumbnail').exec();
    res.render('gallery', { categories, products1, products2, products3});
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to a specific category
router.get('/:id', async (req, res) => {
  try {
    var state = "none";
    var state1 = "block";
    if(req.params.id === "670544dc84c10c723b41d770"){
      state= "block";
      state1= "none";
    }
    const products1 =await product.find({category : 'air-condition'}).populate('thumbnail').exec();
    const products2 =await product.find({category : 'home-items'}).populate('thumbnail').exec();
    const products3 =await product.find({category : 'media'}).populate('thumbnail').exec();
    const categoryId = req.params.id;

        // Use aggregate to find galleries matching the category ID
        const galleryItems = await Gallery.aggregate([
            // Match galleries with the specified category ID
            { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
            
            // Lookup and join the 'Image' collection for the 'thumbnail' field
            {
                $lookup: {
                    from: 'images', // The name of the Image collection in your database
                    localField: 'thumbnail',
                    foreignField: '_id',
                    as: 'thumbnail'
                }
            },
            // Unwind the thumbnail array (since $lookup returns an array)
            { $unwind: { path: '$thumbnail', preserveNullAndEmptyArrays: true } },

            // Lookup and join the 'Category' collection for the 'category' field
            {
                $lookup: {
                    from: 'categories', // The name of the Category collection in your database
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            // Unwind the category array
            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },

            // Optionally project the fields you want to include in the result
            {
                $project: {
                    title: 1,
                    subCategory: 1,
                    'thumbnail.url': 1,
                    'thumbnail.altText': 1,
                    'category.category': 1
                }
            }
        ]);
    
    if (!galleryItems || galleryItems.length === 0) {
      return res.status(404).send('No items found for this category');
    }
    res.render('gallery-img', { galleryItems, state, state1 , products1, products2, products3});
  } catch (err) {
    res.status(500).send(err.message);
  }
});


module.exports = router;

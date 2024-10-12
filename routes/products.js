const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const QandA = require('../models/QandA');
const subProduct = require('../models/subProduct');

router.get('/:id', async (req, res) => {
  try {
    // Validate the product ID
    const productId = req.params.id;

    // Query for products by category (for other purposes)
    const products1 = await Product.find({ category: 'air-condition' }).populate('thumbnail').exec();
    const products2 = await Product.find({ category: 'home-items' }).populate('thumbnail').exec();
    const products3 = await Product.find({ category: 'media' }).populate('thumbnail').exec();

    // Aggregation query to get the product by ID and populate 'thumbnail' and 'catalog'
    const products = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(productId) }  // Match the specific product by its ID
      },
      {
        $lookup: {
          from: 'images',  // The collection to join (assuming 'Image' collection is stored as 'images')
          localField: 'thumbnail',
          foreignField: '_id',
          as: 'thumbnail'
        }
      },
      {
        $lookup: {
          from: 'images',
          localField: 'catalog',
          foreignField: '_id',
          as: 'catalog'
        }
      },
      {
        $unwind: {
          path: '$thumbnail',
          preserveNullAndEmptyArrays: true  // Ensure it works even if no thumbnail exists
        }
      },
      {
        $unwind: {
          path: '$catalog',
          preserveNullAndEmptyArrays: true  // Ensure it works even if no catalog exists
        }
      }
    ]);

    const sub = await subProduct.aggregate([
      {
        $match: { Product: new mongoose.Types.ObjectId(productId) }  // Match the specific product by its ID
      }
    ]);

    // Check if no product was found
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const pro = products[0];
    // Return the populated product
    res.render('products', { pro, products1, products2, products3 , sub});

  } catch (err) {
    // Send an error message with the actual error description
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
});

module.exports = router;

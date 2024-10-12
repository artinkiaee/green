// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const product = require('../models/Product');

async function getNewestProjectsWithThumbnails() {
  try {
    const projects = await Project
      .find()
      .sort({ createdAt: -1 })
      .populate('thumbnail')  // This will populate the actual image document
      .exec();
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

function organizeProjectsIntoColumns(projects, numColumns) {
  const columns = Array(numColumns).fill().map(() => []);
  projects.forEach((project, index) => {
    columns[index % numColumns].push(project);
  });
  return columns;
}

router.get('/', async (req, res) => {
  try {
    const products1 =await product.find({category : 'air-condition'}).populate('thumbnail').exec();
    const products2 =await product.find({category : 'home-items'}).populate('thumbnail').exec();
    const products3 =await product.find({category : 'media'}).populate('thumbnail').exec();
    const projects = await getNewestProjectsWithThumbnails();
    const columnCount = 4;
    const organizedProjects = organizeProjectsIntoColumns(projects, columnCount);
    res.render('projects', { projects , columns: organizedProjects, products1, products2, products3});
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

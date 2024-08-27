const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories including its associated Products
router.get('/', async (req, res) => {  
  try {
    // const categories = await Category.findAll({ include: Product });
    const categories = await Category.findAll({ include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        }
      ]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a category by its `id` including its associated Products
router.get('/:id', async (req, res) => {  
  const category_id = req.params.id;
  try {
    const categories = await Category.findByPk(category_id, { include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
        }
      ]
    });
    if (!category_id) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new category
router.post('/', async (req, res) => {  
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update category by its `id`
router.put('/:id', async (req, res) => {  
  const category_id = req.params.id;
  const category_name = req.body.category_name;
  try {
    const category = await Category.update(
      { category_name },
      {
        where: {
          id: category_id,
        },
      },
    );
    if (!category_id) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// delete category by its `id`
router.delete('/:id', async (req, res) => {
  const category_id = req.params.id;
  try {
    const category = await Category.destroy(
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (!category_id) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

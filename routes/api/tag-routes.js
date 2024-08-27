const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags including its associated Products
router.get('/', async (req, res) => {  
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: {
            attributes: ['id'],
          },
        }
      ]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a tag by its `id` including its associated Products
router.get('/:id', async (req, res) => {  
  const tag_id = req.params.id;
  try {
    const tags = await Tag.findByPk(tag_id, {
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
          through: {
            attributes: ['id'],
          },
        }
      ]
     });
    if (!tag_id) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new tag
router.post('/', async (req, res) => {  
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update tag by its `id`
router.put('/:id', async (req, res) => {  
  const tag_id = req.params.id;
  const tag_name = req.body.tag_name;
  try {
    const tag = await Tag.update(
      { tag_name },
      {
        where: {
          id: tag_id,
        },
      },
    );
    if (!tag_id) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }  
});

// delete tag by its `id`
router.delete('/:id', async (req, res) => {
  const tag_id = req.params.id;
  try {
    const tag = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        },
      },
    );
    if (!tag_id) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

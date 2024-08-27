// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// One-To-Many relationship  
  // Categories have many Products
  Category.hasMany(Product);
  // Products belongsTo Category
  Product.belongsTo(Category);

// Many-To-Many relationship
  // Products belongToMany Tags (through ProductTag)
  Product.belongsToMany(Tag, { through: ProductTag });
  // Tags belongToMany Products (through ProductTag)
  Tag.belongsToMany(Product, {through: ProductTag});


  
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

const { deleteById } = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    })
}

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    const title = req.body.title; 
    const imageUrl = req.body.imageUrl; 
    const price = req.body.price; 
    const description = req.body.description; 
    Product.create({
      title,
      imageUrl,
      price,
      description,
    })
      .then((result) => {
        console.log(result);
         res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
    
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit ? true : false;
  if (!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId;
    Product.findByPk(prodId)
      .then((product) => {
            if (!product) {
              return res.redirect("/");
            }
          res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/products",
            editing: editMode,
            product: product,
          });
      })
      .catch((err) => {
        console.log(err);
      });
};
exports.postEditProduct = (req, res, next) => {
      const prodId = req.body.productId;
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description = req.body.description;
          Product.findByPk(prodId)
            .then((product) => {
              product.title = title;
              product.price = price;
              product.description = description;
              product.imageUrl = imageUrl;
              return product.save();
            })
            .then(result => {
              console.log('product updated');
               res.redirect("/admin/products");
            })
            .catch((err) => {
              console.log(err);
            });
      
}
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
exports.getProducts = (req, res, next) => {
      Product.findAll()
        .then((products) => {
          res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
          });
        })
        .catch((err) => {
          console.log(err);
        });
};

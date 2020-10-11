const { request } = require("express");
const Product = require('../models/product');
//const Cart = require('../models/cart');
//const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
      .then((products) => {
        res.render("shop/product-list", {
          prods: products,
          pageTitle: "All Products",
          path: "/products",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
    })
    .catch((err) => {
      console.log(err);
    });

};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products)=> {
              res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
              });
    })
    .catch(err => {
        console.log(err)
    });

}
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      console.log(products);
        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "/cart",
          products: products,
        });
    })
    .catch((err) => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromcart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));

};

exports.postOrder = (req, res, next) => { 
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then((order) => {
          order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product;
          }));
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      fetchedCart.setProducts(null);
    })
    .then(() => {
     res.redirect("/orders");
    })
    .catch((err) => console.log(err));
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrders({include: ['products']})
  .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
      });
  })
  .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
        res.render("shop/checkout", {
          pageTitle: "Checkout",
          path: "/checkout",
        });
};

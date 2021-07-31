var Product = require('../models/productModel');

module.exports.getAllProducts = (req, res, next) => {
    Product.find((err, products) => {
        if (err) throw err;
        res.render('../views/products/index', { productList: products })
    })
};

module.exports.getProductById = function (req, res, next) {
    console.log("[request=Admin]getProductById" + JSON.stringify(req.params.id));
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        res.send(product);
    });
};

module.exports.addnewProduct = (req, res) => {
    res.send('product');
};

module.exports.saveProduct = (req, res) => {
    console.error("-----n here-------" + JSON.stringify(req.body));
    var product = new Product(req.body);
    Product.create(product, (err) => {
        if (err) throw err;
        res.redirect("/products")
        // res.send('Product Added Successfully.');
    })
}

module.exports.deleteProduct = (req, res) => {
    console.log("[productDelete]deleteProduct = " + JSON.stringify(req.body));
    Product.findById(req.body["id"], (err, product) => {
        if (err) throw err;
        if (!product) return res.status(404).send('Product doesnt exist with this Id.');
        Product.findByIdAndRemove(req.body["id"], (err) => {
            if (err) throw err;
            res.redirect("/products");
        })
    })
}

module.exports.updateProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        if (!product) return res.status(404).send('Product doesnt exist with this Id.');
        res.render('../views/products/product-update', { product: product })
    })
}

module.exports.editProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        if (!product) return res.status(404).send('Product doesnt exist with this Id.');
        var updatedProduct = {
            name: req.body.name,
            department: req.body.department,
            price: req.body.price,
            discountPrice: req.body.discountPrice,
            image: req.body.image,
            description: req.body.description
        };
        Product.findByIdAndUpdate(req.params.id, updatedProduct, (err) => {
            if (err) throw err;
            res.redirect("/products");
        });
    });
};
var Product = require('../models/productModel');

module.exports.getAllProducts = (req, res, next) => {
    Product.find((err, products) => {
        if (err) throw err;
        console.log("GetAllProducts = " + JSON.stringify({ productList: products }));
        res.send({ productList: products });
    })
};

module.exports.getProductById = function (req, res, next) {
    console.log("request[getProductById] = " + JSON.stringify(req.params));
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        console.log("response[getProductById] = " + JSON.stringify(product));
        res.send(product);
    });
};

module.exports.createProduct = (req, res) => {
    res.render('../views/products/create');
};

module.exports.saveProduct = (req, res) => {
    var product = new Product(req.body);
    Product.create(product, (err) => {
        if (err) throw err;
        res.redirect("/products")
        // res.send('Product Added Successfully.');
    })
}

module.exports.deleteProduct = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        if (!product) return res.status(404).send('Product doesnt exist with this Id.');
        Product.findByIdAndRemove(req.params.id, (err) => {
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
            price: req.body.price,
            quantity: req.body.quantity
        };
        Product.findByIdAndUpdate(req.params.id, updatedProduct, (err) => {
            if (err) throw err;
            res.redirect("/products");
        });
    });
};
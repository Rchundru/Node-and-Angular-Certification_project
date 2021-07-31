var express = require('express');
var router = express.Router();
var User = require('../models/userModel')
var Order = require('../models/orderModel')
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/v1/orders/add', (req, res) => {
  var order = new Order({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    products: req.body.products
  });
  Order.create(order, (err) => {
    if (err) throw err;
    res.status(200).end();
    // res.send('Product Added Successfully.');
})
})

router.get('/api/v1/orders/', (req, res) => {
  Order.find((err, orders) =>{
    if(err) throw err;
    //console.log(users);
    res.send(orders);
  })
})

router.post('/api/v1/orders/status', (req, res) => {
  console.log("in status")
  console.log(req.body)
  Order.findById(req.body._id, (err, order) => {
    if (err) throw err;
    if (!order) return res.status(404).send('Order doesnt exist with this Id.');
    var updatedOrder = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      products: req.body.products,
      status: "Delivered"
    };
    Order.findByIdAndUpdate(req.body._id, updatedOrder, (err) => {
      if (err) throw err;
      res.status(200).end();
    });
})
})

router.get('/api/v1/orders/delete/:id', (req, res) =>{
  Order.findById(req.params.id, (err, order) => {
    if (err) throw err;
    if (!order) return res.status(404).send('Order doesnt exist with this Id.');
    Order.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;
        res.status(200).end();
        //res.redirect("/products");
    })
})
})

router.post('/api/v1/users/register', (req, res) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username.toLowerCase()
  });
  User.register(user, req.body.password, function (err, user) {
    console.log('Entered in Post Method');
    if (err) {
      console.log(err);
      //res.render('../views/users/register')
      res.send('error')
    }
    passport.authenticate("local")(req, res, function () {
      //res.render('../views/users/login')
      res.status(200).end();
    })
  })
})

router.post('/api/v1/users/admin-add', (req, res) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    userAccess: req.body.userAccess,
    username: req.body.username.toLowerCase()
  });
  User.register(user, req.body.password, function (err, user) {
    console.log('Entered in Post Method');
    if (err) {
      console.log(err);
      //res.render('../views/users/register')
      res.send('error')
    }
    passport.authenticate("local")(req, res, function () {
      //res.render('../views/users/login')
      res.status(200).end();
    })
  })
})

router.post('/api/v1/users/login', passport.authenticate('local', {successMessage: "http://localhost:4200/register", failureMessage: "/api/v1/users/login"}),(req, res) => {
  var user_id = req.user._id;
  //console.log(user_id);
  //res.send(user_id);
  res.status(200).send(user_id).end();
})

router.get('/api/v1/users/find/:id', function (req, res, next) {
  console.log(req.params.id);
  User.findById(req.params.id, (err, user) => {
      if (err) throw err;
      res.send(user);
  });
});

router.get("/api/v1/users/logout", (req, res) => {
  req.logOut();
  res.status(200);
});

router.get("/api/v1/users/getall", (req, res) => {
  User.find((err, users) =>{
    if(err) throw err;
    //console.log(users);
    res.send(users);
  })
});
router.get('/api/v1/users/delete/:id', (req, res) =>{
  User.findById(req.params.id, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(404).send('User doesnt exist with this Id.');
    User.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;
        //res.redirect("/products");
    })
})
})

router.post('/api/v1/users/edit', (req, res) => {
  User.findById(req.body._id, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(404).send('User doesnt exist with this Id.');
    var updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        streetAddress: req.body.streetAddress,
        userAccess:req.body.userAccess,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    };
    User.findByIdAndUpdate(req.body._id, updatedUser, (err) => {
      if (err) throw err;
      res.status(200);
    });
})
res.status(200);

});


module.exports = router;
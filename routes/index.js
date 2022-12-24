var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

var { listProducts, getDeleteProduct, deleteProduct, getAddProduct, addProduct, getUpdateProduct, updateProduct, searchProduct, increaseQuantity, decreaseQuantity } = require('../controllers/product')


router.get('/', listProducts)

router.get('/delete-product/:id', getDeleteProduct)
router.post('/delete/:id', deleteProduct)

router.get('/add-product', getAddProduct)
router.post('/add', upload.single('myImage'), addProduct)

router.get('/update-product/:id', getUpdateProduct)
router.post('/update/:id', upload.single('myImage'), updateProduct)

router.post('/increase/:name', increaseQuantity)
router.post('/decrease/:name', decreaseQuantity)

//SEARCH product
router.post('/search-product', searchProduct)

// router.post('/search-product', (req, res, next) => {
//     Product.find({ name: req.body.name }, (err, data) => {
//         if (!err) {
//             res.render('index', { products: data })
//         } else {
//             console.log('Can not find product', err)
//         }
//     })
// })

mongoose.connect("mongodb+srv://admin:admin@cluster0.8mgr7qd.mongodb.net/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database")
}).catch(() => {
    console.log("Unable to connect Database")
})

module.exports = router;
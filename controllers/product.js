const { clearCache } = require('ejs')
var express = require('express')
var Product = require('../models/product')


//List products
const listProducts = async(req, res, next) => {
    Product.find({}, (err, data) => {
        if (!err) {
            res.render('index', { products: data })
        } else {
            res.status(400).json({ message: 'Failed to load products' })
        }
    })
}

//Delete product
const getDeleteProduct = async(req, res, next) => {
    Product.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render('delete-product', { product: data })
        } else {
            res.status(400).json({ message: 'Failed to load products' })
        }
    })
}

const deleteProduct = async(req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/')
    })
}

//Check product's name
const checkProductName = async(req, res, next) => {
    var name = req.body.name
    if (name.length <= 10) {
        return true
    } else {
        return false
    }
}

//Add product
const getAddProduct = async(req, res, next) => {
    res.render('add-product', {})
}

const addProduct = async(req, res, next) => {
    var checkedName = await checkProductName(req)
    if (checkedName) {
        return res.status(400).json({ message: 'Product Existed' })
    } else {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            city: req.body.city,
            quantity: req.body.quantity,
            image: {
                data: req.file.filename,
                contentType: "image/png"
            }
        })
        newProduct.save()
        res.redirect('/')
    }
}

//Update product
const getUpdateProduct = async(req, res, next) => {
    Product.findById(req.params.id, (err, data) => {
        if (!err) {
            res.render('update-product', { product: data })
        } else {
            res.status(400).json({ message: 'Failed to load products' })
        }
    })
}

const updateProduct = async(req, res, next) => {
    var file = req.file
    if (!file) {
        Product.findByIdAndUpdate(req.params.id, req.body, () => {
            res.redirect('/')
        })
    } else {
        Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price,
            city: req.body.city,
            quantity: req.body.quantity,
            image: {
                data: req.file.filename,
                contentType: "image/png"
            },
        }, () => {
            res.redirect('/')
        })
    }
}

//Search product
const searchProduct = async(req, res, next) => {
    let keyword = req.body.keyword
    let matchproducts = []
    Product.find({}, (err, data) => {
        data.forEach(item => {
            if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
                matchproducts.push(item)
            }
        })
        res.render('index', { products: matchproducts })
    })
}

//Increase Quantity
const increaseQuantity = async(req, res, next) => {
    var name = req.params.name
    var increaseProduct = await Product.findOne({ name })
    var temp = increaseProduct.quantity
    temp++
    Product.findByIdAndUpdate(increaseProduct.id, {
        quantity: temp
    }, (err, data) => {})
    Product.find({}, (err, data) => {
        res.render('index', { products: data })
    })
}

//Decrease Quantity
const decreaseQuantity = async(req, res, next) => {
    var name = req.params.name
    var decreaseProduct = await Product.findOne({ name })
    var temp = decreaseProduct.quantity
    temp--
    Product.findByIdAndUpdate(decreaseProduct.id, {
        quantity: temp
    }, (err, data) => {})
    Product.find({}, (err, data) => {
        res.render('index', { products: data })
    })
}

module.exports = { listProducts, getDeleteProduct, deleteProduct, getAddProduct, addProduct, getUpdateProduct, updateProduct, searchProduct, increaseQuantity, decreaseQuantity }
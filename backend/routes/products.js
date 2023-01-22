const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


router.get('/', async (req, res) => {
    // get all products
    const all_products = await Product.find({});

    try {
        res.status(200).send(all_products);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/:id', async (req, res) => {
    // get by ID
    const the_product = await Product.findById(req.params.id)

    try {
        the_product != null ? res.send(the_product) : res.status(404).send("Item not found.")
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/name/:name', async (req, res) => {
    // get by name
    const the_product = await Product.find({
        name: req.params.name
    })

    try {
        the_product != null ? res.send(the_product) : res.status(404).send("Item not found.")
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/price/:price', async (req, res) => {
    // get by price
    const the_product = await Product.find({
        price: req.params.price
    })

    try {
        the_product != null ? res.send(the_product) : res.status(404).send("Item not found.")
    } catch (error) {
        res.status(500).send("Error: " + error);

    }
});

router.get('/quantity/:quantity', async (req, res) => {
    // get by quantity
    const the_product = await Product.find({
        quantity: req.params.quantity
    })

    try {
        the_product != null ? res.send(the_product) : res.status(404).send("Item not found.")
    } catch (error) {
        res.status(500).send("Error: " + error);

    }
});

router.get('/unit/:unit', async (req, res) => {
    // get by unit of measure
    const the_product = await Product.find({
        unit: req.params.unit
    })

    try {
        the_product != null ? res.send(the_product) : res.status(404).send("Item not found.")
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});

router.get('/info', async (req, res) => {
    // get info
    const products = await Product.find({});
    const info = products.map((product) => {
        return {
            "name": product.name,
            "quantity": product.quantity,
            "value": product.quantity * product.price
        }
    })

    try {
        res.status(200).send(info);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


router.post('/', async (req, res) => {
    // post new product
    const new_product = new Product(req.body);

    try {
        await new_product.save();
        res.status(201).send(new_product);
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


router.put('/:id', async (req, res) => {
    // put complete product
    try {
        const new_product = req.body;
        const product = await Product.findById(req.params.id);

        if (product != null) {
            await Product.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).send(new_product);
        } else {
            res.status(404).send("Item not found.")
        }
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


router.delete('/:id', async (req, res) => {
    // delete by ID
    try {
        const product = await Product.findById(req.params.id);

        if (product != null) {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).send("Completed");
        } else {
            res.status(404).send("Item not found.")
        }
    } catch (error) {
        res.status(500).send("Error: " + error);
    }
});


module.exports = router;
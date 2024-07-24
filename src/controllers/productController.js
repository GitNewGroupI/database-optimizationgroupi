const productsModel = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await productsModel.getAllProducts();
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (err) {
        console.error('Error in getAllProducts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productsModel.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error in getProductById:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const { product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued } = req.body;
        
        if (!product_name || discontinued === undefined) {
            return res.status(400).json({ error: 'Missing required fields: product_name, discontinued' });
        }
        
        const newProduct = await productsModel.createProduct({
            product_name,
            supplier_id,
            category_id,
            quantity_per_unit,
            unit_price,
            units_in_stock,
            units_on_order,
            reorder_level,
            discontinued
        });
        
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error in createProduct:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued } = req.body;
        
        if (!product_name || discontinued === undefined) {
            return res.status(400).json({ error: 'Missing required fields: product_name, discontinued' });
        }
        
        const updatedProduct = await productsModel.updateProduct(req.params.id, {
            product_name,
            supplier_id,
            category_id,
            quantity_per_unit,
            unit_price,
            units_in_stock,
            units_on_order,
            reorder_level,
            discontinued
        });
        
        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error in updateProduct:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productsModel.deleteProduct(req.params.id);
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error in deleteProduct:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
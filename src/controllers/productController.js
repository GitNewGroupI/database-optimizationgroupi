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
        const { 
            product_name, 
            supplier_id, 
            category_id, 
            quantity_per_unit, 
            unit_price, 
            units_in_stock, 
            units_on_order, 
            reorder_level, 
            discontinued 
        } = req.body;

        if (!product_name || discontinued === undefined) {
            return res.status(400).json({ error: 'Missing required fields: product_name, discontinued' });
        }

        // Validate numeric fields
        const numericFields = { unit_price, units_in_stock, units_on_order, reorder_level };
        for (const [key, value] of Object.entries(numericFields)) {
            if (value !== undefined && !Number.isFinite(Number(value))) {
                return res.status(400).json({ error: `Invalid numeric value for ${key}` });
            }
        }

        const newProduct = await productsModel.createProduct({
            product_name,
            supplier_id: supplier_id || null,
            category_id: category_id || null,
            quantity_per_unit: quantity_per_unit || null,
            unit_price: unit_price !== undefined ? Number(unit_price) : null,
            units_in_stock: units_in_stock !== undefined ? Number(units_in_stock) : null,
            units_on_order: units_on_order !== undefined ? Number(units_on_order) : null,
            reorder_level: reorder_level !== undefined ? Number(reorder_level) : null,
            discontinued: Number(discontinued)
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Full error object:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { 
            product_name, 
            supplier_id, 
            category_id, 
            quantity_per_unit, 
            unit_price, 
            units_in_stock, 
            units_on_order, 
            reorder_level, 
            discontinued 
        } = req.body;

        if (!product_name || discontinued === undefined) {
            return res.status(400).json({ error: 'Missing required fields: product_name, discontinued' });
        }

        // Validate numeric fields
        const numericFields = { unit_price, units_in_stock, units_on_order, reorder_level };
        for (const [key, value] of Object.entries(numericFields)) {
            if (value !== undefined && !Number.isFinite(Number(value))) {
                return res.status(400).json({ error: `Invalid numeric value for ${key}` });
            }
        }

        const updatedProduct = await productsModel.updateProduct(req.params.id, {
            product_name,
            supplier_id: supplier_id || null,
            category_id: category_id || null,
            quantity_per_unit: quantity_per_unit || null,
            unit_price: unit_price !== undefined ? Number(unit_price) : null,
            units_in_stock: units_in_stock !== undefined ? Number(units_in_stock) : null,
            units_on_order: units_on_order !== undefined ? Number(units_on_order) : null,
            reorder_level: reorder_level !== undefined ? Number(reorder_level) : null,
            discontinued: Number(discontinued)
        });

        if (updatedProduct) {
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error in updateProduct:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
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
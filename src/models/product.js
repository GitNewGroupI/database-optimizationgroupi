// models/product.js
const db = require('../db/connection');

const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
};

const createProduct = async (productData) => {
    const { product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued } = productData;
    const result = await db.query(
        `INSERT INTO products 
        (product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued]
    );
    return result.rows[0];
};

const updateProduct = async (id, productData) => {
    const { product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued } = productData;
    const result = await db.query(
        `UPDATE products 
        SET product_name = $1, supplier_id = $2, category_id = $3, quantity_per_unit = $4, unit_price = $5, 
        units_in_stock = $6, units_on_order = $7, reorder_level = $8, discontinued = $9 
        WHERE product_id = $10 RETURNING *`,
        [product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued, id]
    );
    return result.rows[0];
};

const deleteProduct = async (id) => {
    const result = await db.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

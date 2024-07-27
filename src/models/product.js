// models/product.js
const db = require('../db/connection');
const { pool } = require('../config/database');
// At the top of models/product.js, after the import
console.log('Pool object:', pool);


const getAllProducts = async () => {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
};

const getProductById = async (id) => {
    const result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
    return result.rows[0];
};

const createProduct = async (productData) => {
    const client = await pool.connect();
    try {
        const query = `
            INSERT INTO products (product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;
        const values = [
            productData.product_name,
            productData.supplier_id,
            productData.category_id,
            productData.quantity_per_unit,
            productData.unit_price,
            productData.units_in_stock,
            productData.units_on_order,
            productData.reorder_level,
            productData.discontinued
        ];
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const updateProduct = async (id, productData) => {
    const client = await pool.connect();
    try {
        const { product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued } = productData;
        const query = `
            UPDATE products 
            SET product_name = $1, supplier_id = $2, category_id = $3, quantity_per_unit = $4, unit_price = $5,
            units_in_stock = $6, units_on_order = $7, reorder_level = $8, discontinued = $9
            WHERE product_id = $10 RETURNING *
        `;
        const values = [product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued, id];
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const deleteProduct = async (id) => {
    const client = await pool.connect();
    try {
        const result = await client.query('DELETE FROM products WHERE product_id = $1 RETURNING *', [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
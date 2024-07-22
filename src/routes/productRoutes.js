const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product_id:
 *                     type: integer
 *                     example: 1
 *                   product_name:
 *                     type: string
 *                     example: Widget
 *                   supplier_id:
 *                     type: integer
 *                     example: 2
 *                   category_id:
 *                     type: integer
 *                     example: 3
 *                   quantity_per_unit:
 *                     type: string
 *                     example: 10 boxes
 *                   unit_price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *                   units_in_stock:
 *                     type: integer
 *                     example: 100
 *                   units_on_order:
 *                     type: integer
 *                     example: 50
 *                   reorder_level:
 *                     type: integer
 *                     example: 10
 *                   discontinued:
 *                     type: integer
 *                     example: 0
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 product_name:
 *                   type: string
 *                   example: Widget
 *                 supplier_id:
 *                   type: integer
 *                   example: 2
 *                 category_id:
 *                   type: integer
 *                   example: 3
 *                 quantity_per_unit:
 *                   type: string
 *                   example: 10 boxes
 *                 unit_price:
 *                   type: number
 *                   format: float
 *                   example: 19.99
 *                 units_in_stock:
 *                   type: integer
 *                   example: 100
 *                 units_on_order:
 *                   type: integer
 *                   example: 50
 *                 reorder_level:
 *                   type: integer
 *                   example: 10
 *                 discontinued:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 * product_id:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               supplier_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               quantity_per_unit:
 *                 type: string
 *               unit_price:
 *                 type: number
 *                 format: float
 *               units_in_stock:
 *                 type: integer
 *               units_on_order:
 *                 type: integer
 *               reorder_level:
 *                 type: integer
 *               discontinued:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 product_name:
 *                   type: string
 *                   example: Widget
 *                 supplier_id:
 *                   type: integer
 *                   example: 2
 *                 category_id:
 *                   type: integer
 *                   example: 3
 *                 quantity_per_unit:
 *                   type: string
 *                   example: 10 boxes
 *                 unit_price:
 *                   type: number
 *                   format: float
 *                   example: 19.99
 *                 units_in_stock:
 *                   type: integer
 *                   example: 100
 *                 units_on_order:
 *                   type: integer
 *                   example: 50
 *                 reorder_level:
 *                   type: integer
 *                   example: 10
 *                 discontinued:
 *                   type: integer
 *                   example: 0
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_name:
 *                 type: string
 *               supplier_id:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               quantity_per_unit:
 *                 type: string
 *               unit_price:
 *                 type: number
 *                 format: float
 *               units_in_stock:
 *                 type: integer
 *               units_on_order:
 *                 type: integer
 *               reorder_level:
 *                 type: integer
 *               discontinued:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 product_name:
 *                   type: string
 *                   example: Widget
 *                 supplier_id:
 *                   type: integer
 *                   example: 2
 *                 category_id:
 *                   type: integer
 *                   example: 3
 *                 quantity_per_unit:
 *                   type: string
 *                   example: 10 boxes
 *                 unit_price:
 *                   type: number
 *                   format: float
 *                   example: 19.99
 *                 units_in_stock:
 *                   type: integer
 *                   example: 100
 *                 units_on_order:
 *                   type: integer
 *                   example: 50
 *                 reorder_level:
 *                   type: integer
 *                   example: 10
 *                 discontinued:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Product not found
 */
router.put('/:id', productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 product_name:
 *                   type: string
 *                   example: Widget
 *                 supplier_id:
 *                   type: integer
 *                   example: 2
 *                 category_id:
 *                   type: integer
 *                   example: 3
 *                 quantity_per_unit:
 *                   type: string
 *                   example: 10 boxes
 *                 unit_price:
 *                   type: number
 *                   format: float
 *                   example: 19.99
 *                 units_in_stock:
 *                   type: integer
 *                   example: 100
 *                 units_on_order:
 *                   type: integer
 *                   example: 50
 *                 reorder_level:
 *                   type: integer
 *                   example: 10
 *                 discontinued:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: Product not found
 */
router.delete('/:id', productController.deleteProduct);

module.exports = router;

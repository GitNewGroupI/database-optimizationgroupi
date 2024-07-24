const express = require('express');
const app = express();
const productsRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger'); // Import your Swagger configuration
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/products', productsRoutes);

// Use Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Online Retail API!');
});

// Use product routes
app.use('/products', productsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Port configuration
const PORT = process.env.PORT || 3008;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
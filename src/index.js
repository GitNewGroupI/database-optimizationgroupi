const express = require('express');
const app = express();
const port = 3008;
const productsRoutes = require('./routes/productRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger'); // Import your Swagger configuration
const cors = require('cors');

// Use Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Online Retail API!');
});

// Use product routes
app.use(cors());

app.use(express.json());
app.use('/products', productsRoutes); // Change '/productRoutes' to '/products'
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
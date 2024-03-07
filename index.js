const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();

const productRoutes = require("./route/product");
const authRoutes = require("./route/auth");
const handleServerError = require("./middleware/handleServerError");

require('./config/database'); //simply linking not importing

app.use(express.json()); //sets up req.body
app.use(fileUpload());
app.use('/uploads',express.static('uploads'))

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);



app.use(handleServerError);

app.listen(8000, () => {
  console.log("Server has started on PORT 8000");
});

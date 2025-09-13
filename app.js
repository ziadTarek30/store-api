const express = require("express");
const mongoose = require("mongoose");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const productsRouter = require("./routes/products")
require("express-async-errors");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => { 
    res.send("<h1>Store API</h1><h1><a href='/api/v1/products'>products</a>");
})
app.use("/api/v1/products", productsRouter)

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, console.log("listening on port 3000...")))
    .catch(err => console.log(err));
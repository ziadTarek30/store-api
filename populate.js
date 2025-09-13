require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const jsonProducts = require("./products.json");


mongoose.connect(process.env.MONGO_URI)
.then(() => Product.deleteMany({}))
.then(() => Product.create(jsonProducts))
.then(() => console.log("success"))
.then(() => process.exit(0))
.catch((err) => {
    console.log(err);
    process.exit(1);
})

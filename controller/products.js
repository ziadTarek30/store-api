const Product = require("../models/Product");

const getProductsStatic = async (req, res) => {
    const products = await Product.find({price: 31});
    res.status(200).json({products, nbOfHits: products.length});
}
const getProducts = async (req, res) => {
    let {featured, company, name, sort, fields, limit, page, numericFilter} = req.query;
    const reqObj = {}
    if (featured) {
        reqObj.featured = featured;
    }
    if (company) {
        reqObj.company = company;
    }
    if (name) {
        reqObj.name = {$regex: name, $options: "i"};
    }
    let result = Product.find(reqObj);
    if (sort) {
        const sortList = sort.replace(",", " ");
        result = result.sort(sortList);
    }
    else 
        result.sort("createdAt");
    if (fields) {
        const fieldsList = fields.replace(",", " ")
        result = result.select(fieldsList)
    }
    
    limit = limit || 10;
    page = page || 1;
    const skip = limit * (page - 1);
    result = result.skip(skip).limit(limit);

    const operators = new Map([["<", "$lt"], [">", "$gt"], [">=", "$gte"], ["<=", "$lte"], ["=", "$eq"]]);
    const filterExp = /^(?<field>\w+)(?<operator><|>|<=|>=|=)(?<number>\d+)$/;
    const options = ["price", "rating"];
    if (numericFilter) {
        const filters = numericFilter.split(",");
        for (let filter of filters) {
            filterGroup = filter.match(filterExp)?.groups;
            if (filterGroup && options.includes(filterGroup.field)) {
                const opSymbol = operators.get(filterGroup.operator);
                result = result.find({[filterGroup.field]: {[opSymbol]: Number(filterGroup.number)}});
            }
        }
    }   

    const products = await result;
    res.status(200).json({products, nbOfHits: products.length});
}

module.exports = {getProducts, getProductsStatic};
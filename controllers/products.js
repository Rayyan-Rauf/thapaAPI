const Product = require('../models/product');

const getAllProducts = async(req, res) => {

    const { company, name, featured, sort, select } = req.query;
    const queryObjects = {};

    if (company) {
        queryObjects.company = company;
    }

    if (featured) {
        queryObjects.featured = featured;
    }
    
    if (name) {
        queryObjects.name = { $regex: name, $options: "i"};
    }

    let apiData = Product.find(queryObjects);

    if (sort) {
        let sortFix = sort.split(',').join(' ')
        //can write replace(',', ' '); instead of split(',').join(' ') but split is more efficient
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        let selectFix = select.split(',').join(' ');
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit; //formula for pagination

    apiData = apiData.skip(skip).limit(limit);
    
    console.log(queryObjects);
    
    const myData = await apiData;
    res.status(200).json({ myData, nbHits: myData.lenght });
};

const getAllProductsTesting = async(req, res) => {
    // res.status(200).json({ msg: "i am master of minds 2.0" })
    // const myData = await Product.find(req.query).sort('name -price');
    const myData = await Product.find(req.query).select('name company');
    // console.log(
    //     "🚀 ~ file products.js ~ line 10 ~ getAllProductsTesting ~ req.query",
    //     req.query
    // );

    res.status(200).json({ myData })
};

module.exports = { getAllProducts, getAllProductsTesting };
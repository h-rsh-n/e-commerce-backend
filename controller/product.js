const product = require('../models/product');
const Product = require('../models/product');

const createProduct = async (req,res)=>{
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
  
}

const updateProduct = async (req,res)=>{
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteProduct = async (req,res)=>{
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json('Successfully deleted...')
  } catch (error) {
    res.status(500).json(error);
  }
}

const getProduct = async (req,res)=>{
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAllProducts = async (req,res)=>{
  const qNew = req.query.new;
  const qCategories = req.query.category;
  console.log(qNew,qCategories)
  try {
    let product;
    if(qNew){
      product = await Product.find().sort({createdAt:-1}).limit(5);
    }else if(qCategories){
      product = await Product.find({
        categories:{
          $in : [qCategories]
        }
      })
    }else{
      product = await Product.find()
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct
}
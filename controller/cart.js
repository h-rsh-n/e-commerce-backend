const Cart = require('../models/cart');

const createCart = async (req,res)=>{
  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

const updateCart = async (req,res)=>{
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteCart = async (req,res)=>{
  try {
    const id = req.params.id;
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json('deleted successfully...')
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCart = async (req,res)=>{
  try {
    const id = req.params.userId;
    const product = await Cart.find({userId:id});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getCarts = async (req,res)=>{
  try {
    const product = await Cart.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getCarts
}
const express = require('express');
const app = express();
const connectDB = require('./db/conectDB');
const PORT = 3000;
const authRouter = require('./router/auth');
const userRouter = require('./router/user');
const productRouter = require('./router/product');
const cartRouter = require('./router/cart');
const orderRouter = require('./router/order');
require('dotenv').config();
const cors = require('cors');


app.use(express.json());
app.use(cors());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/order',orderRouter);

const start = async ()=>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,()=>{
      console.log(`server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start();

const express=require("express")
const {ProductModel}=require("../model/Product.model")
const {authenticate}=require("../middleware/authenticate.middleware")

const productRouter=express.Router()

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get product by ID
productRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
productRouter.post('/', async (req, res) => {
  try{
    const newproduct=req.body
    const product=new ProductModel(newproduct)
    await product.save()
    res.send({"msg":"product added"})
}catch(err){
    console.log(err)
    res.send({"msg":err.message})
}
});

// Update product by ID
productRouter.patch('/:id', async (req, res) => {
  const updatedProductDetails=req.body
  const noteID=req.params.id 
  const note = await ProductModel.findOne({"_id":noteID})
    const userID_in_note=note.userId
    const UserID_making_req=req.body.userId //`new ObjectId("${req.body.userId}")`
    try{
        if(UserID_making_req!==userID_in_note){
            console.log(UserID_making_req)
            console.log(userID_in_note)
            res.send({"msg":"You are not authorized"})
        }else{
            await ProductModel.findByIdAndUpdate({_id:noteID},updatedProductDetails)
            res.send({"msg":`Note with id: ${noteID} has been Updated`})
        }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
});

//Delete Product
productRouter.delete('/:id', async (req, res) => {
  const noteID=req.params.id 
    try {
        await ProductModel.findByIdAndDelete(noteID);
        res.json("Deleted");
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
});

module.exports={
    productRouter
}
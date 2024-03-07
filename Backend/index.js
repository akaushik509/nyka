const express = require("express")
const {connection} = require("./configs/db")
const {userRouter}=require("./routes/User.routes")
const { productRouter } = require("./routes/Product.routes")
const cors=require("cors")
const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users", userRouter)
app.use("/products",productRouter)

app.listen(8080,async()=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("Server is running at 8080")
})

/* */